import express from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import productRouter from './products.route';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));
router.use(productRouter);
router.use(authRouter);
router.use(userRouter);

export default router;