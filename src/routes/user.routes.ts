import express from 'express';
import { registerUserController, verifyUserController, forgotPasswordController, resetPasswordController, getCurrentUserController, resetPassword } from '../controllers/user.controller';
import requireUser from '../middlewares/requireUser';
import validateResource from '../middlewares/validateResource';
import { registerUserSchema, verifyUserSchema,forgotPasswordSchema, resetPasswordSchema, resetPasswordProper } from '../schema/user.schema';

const userRouter = express.Router();

userRouter.post('/users/register-users', validateResource(registerUserSchema), registerUserController);
userRouter.post('/users/verify-users/:id', validateResource(verifyUserSchema), verifyUserController);
userRouter.post('/users/forgot-password', validateResource(forgotPasswordSchema), forgotPasswordController);
userRouter.get('/users/reset-password/:id/:token', validateResource(resetPasswordSchema), resetPasswordController);
userRouter.post('/users/reset-password/:id/:token', validateResource(resetPasswordProper), resetPassword);
userRouter.get('/users/me', requireUser, getCurrentUserController);

export default userRouter;