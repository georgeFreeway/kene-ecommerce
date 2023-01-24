import mongoose from 'mongoose';
import config from 'config';
import logger from '../utils/logger';

async function connectDb(){
    const dbURI = config.get<string>('dbURI');

    try{
        await mongoose.connect(dbURI);
        logger.info('connected to data base')
    }catch(error){
        logger.error('failed to connect to database');
        process.exit(1);
    }
}

export default connectDb;

