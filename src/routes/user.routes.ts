import express from 'express';
import { registerUserController, verifyUserController, forgotPasswordController, resetPasswordController, getCurrentUserController } from '../controllers/user.controller';
import requireUser from '../middlewares/requireUser';
import validateResource from '../middlewares/validateResource';
import { registerUserSchema, verifyUserSchema,forgotPasswordSchema, resetPasswordSchema } from '../schema/user.schema';

const userRouter = express.Router();

userRouter.post('/users/register-users', validateResource(registerUserSchema), registerUserController);
userRouter.post('/users/verify-users/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserController);
userRouter.post('/users/forgot-password', validateResource(forgotPasswordSchema), forgotPasswordController);
userRouter.post('/users/reset-password/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordController);
userRouter.get('/users/me', requireUser, getCurrentUserController);

export default userRouter;