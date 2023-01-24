import { NextFunction, Request, Response } from "express"
import { verifyJwt } from "../utils/jwt";


const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    if(!token){
        return next();
    }

    const decodedToken = verifyJwt(token, "accessTokenPublicKey");

    if(decodedToken){
        res.locals.user = decodedToken;
    }

    next();
}

export default deserializeUser;