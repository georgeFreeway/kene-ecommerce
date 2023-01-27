import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    dbURI: process.env.MONGO_URI!,
    logLevel: process.env.LOG_LEVEL!,
    smtp: {
        user: 'gh7lkqysep7wqyiq@ethereal.email',
        pass: 'UZCV5UvjeKKxp9tX84',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
    },
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
};