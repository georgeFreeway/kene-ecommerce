import express, { Request } from 'express';
import config from 'config';
import cors from 'cors';
import connectDb from './utils/connect';
import logger from './utils/logger';
import router from './routes';
import deserializeUser from './middlewares/deserializeUser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//view engine
app.set("view engine", 'ejs');

//deserialize (decode&verify JWT) user on every request
app.use(deserializeUser);

connectDb()
.then(() => {
    const port = config.get<number>('port');
    app.listen(port, () => {
        logger.info(`server sope otilo, e don go on port: ${port} 🚀`);
    });
})

app.use('/api/sole-luxury', router);


