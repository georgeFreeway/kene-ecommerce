import express from 'express';
import { loginUserController, refreshTokenHandler } from '../controllers/user.controller';
import validateResource from '../middlewares/validateResource';
import { createSessionSchema } from '../schema/auth.schema';

const authRouter = express.Router();

authRouter.post('/users/login-user', validateResource(createSessionSchema), loginUserController);
authRouter.post('/users/refresh', refreshTokenHandler);

export default authRouter;