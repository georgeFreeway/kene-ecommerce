import { Request, Response} from "express";
import { RegisterUserInput, VerifyUserInput, ForgotPasswordInput, ResetPasswordInput } from "../schema/user.schema";
import { registerUser, findUserById, findUserByEmail } from "../service/user.service";
import log from "../utils/logger";
import { v4 as uuidv4 } from 'uuid';
import sendgrid from '@sendgrid/mail';
import { createSessionInput } from "../schema/auth.schema";
import { signAccessToken, signRefreshToken, findSessionById } from "../service/auth.service";
import { get } from "lodash";
import { signJwt, verifyJwt } from "../utils/jwt";


/**
 * register a user
 * @param req RegisterInput
 * @param res 
 * @returns void
 */
export async function registerUserController(req: Request<{}, {}, RegisterUserInput>, res: Response){
    const body = req.body;
     
    try{
        const user = await registerUser(body);
        //send mail
        sendgrid.setApiKey('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');
        const msg = {
            to: user.email,
            from: 'freewayvelli@gmail.com',
            subject: 'WELCOME TO SOLE LUXURY',
            text: 'Adding luxury to your feet',
            html: `<strong>Your Verification Code is ${user.verificationCode} </strong>`,
        };

        sendgrid.send(msg).then((response) => {
            log.info(response);
        }).catch((error) => {
            log.error(error);
        });
        return res.status(200).json(user);
    }catch(error: any){
        if(error.code === 11000){
            return res.status(409).json({ error: "Account already exists" });
        }
        return res.status(500).send(error);
    }
}

/**
 * verifies a user
 * @param req id and verificationCode
 * @param res 
 * @returns void
 */
export async function verifyUserController(req: Request<VerifyUserInput, {}, {}>, res: Response){
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    const user = await findUserById(id);

    if(!user){
        return res.send({ message: "could not verify user 😭" });
    }

    if(user.verified){
        return res.send({ message: "user already verified 😀" });
    }

    if(user.verificationCode === verificationCode){
        user.verified = true;
        await user.save();
        return res.send({ message: "verification successful🤝" });
    }

    return res.status(400).send({ message: "could not verify user 😭" });

}

/**
 * sends a password reset code 
 * @param req email
 * @param res 
 * @returns void
 */
export async function forgotPasswordController(req: Request<{}, {}, ForgotPasswordInput>, res: Response){
    const { email } = req.body;

    const user = await findUserByEmail(email);
    if(!user){
        log.debug('User not found');
        return res.status(404).json({ message: 'No such user exists in our system' });
    }

    //sendmail
    
    return res.status(200).json({ message: 'A password reset link has been sent to your Email Address' });
}

/**
 * resets a user password
 * @param req id and password reset code body contains a password
 * @param res 
 * @returns 
 */
export async function resetPasswordController(req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response){
    const { id, passwordResetCode } = req.params;

    const { password } = req.body;

    const user = await findUserById(id);
    if(!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode){
        return res.status(400).send("could not reset password");
    };

    user.passwordResetCode = null;
    user.password = password;
    await user.save();

    return res.status(200).send('password reset successful');
}

/**
 * logs in and assigns access and refresh token to a valid user
 * @param req body contains email and password
 * @param res 
 * @returns 
 */
export async function loginUserController(req: Request<{}, {}, createSessionInput>, res: Response){
   const { email, password } = req.body;

    try{
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(401).json({ error: 'Email does not exist' });
        }
        const validatePassword = await user.validatePassword(password);
        if(!validatePassword){
            return res.status(401).json({ error: 'Incorrect password' });
        }

        //sign access token
        const accessToken = signAccessToken(user);

        //sign refresh token
        const refreshToken = await signRefreshToken({ userId: user._id });
        
        //send back tokens
        return res.json({ accessToken, refreshToken, user });
    }catch(error){
        return res.status(400).send(error);
    }
}

/**
 * current user handler
 * @param req 
 * @param res 
 * @returns current user
 */
export async function getCurrentUserController(req: Request, res: Response){
    const currentUser = res.locals.user;
    return res.send(currentUser);
}

/**
 * refresh token handler
 * @param req 
 * @param res 
 */
export async function refreshTokenHandler(req: Request, res: Response){
    const refreshToken = get(req, 'headers.x-refresh') as string;

    const decoded = verifyJwt<{ session: string }>(refreshToken, 'refreshTokenPublicKey')!;
    if(!decoded){
        res.status(401).send('could not refresh access token');
    }

    const session = await findSessionById(decoded.session);
    if(!session || !session.valid){
        res.status(401).send('could not refresh access token');
    }

    const user = await findUserById(String(session?.user));
    if(!user){
        res.status(401).send('could not refresh access token');
    }

    const accessToken = signAccessToken(user!);
    res.status(200).send({ accessToken });
}
