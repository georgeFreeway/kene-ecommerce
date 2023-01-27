//export a typescript interface and a user model
import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType, index } from '@typegoose/typegoose';
import * as argon from 'argon2';
import log from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

export const privateFields = ["password", "__v", "verificationCode", "verified"];

@pre<User>('save', async function(){
    if(!this.isModified('password')){
        return;
    }
    const hash = await argon.hash(this.password);
    this.password = hash;

    return;
})
@index({ email: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email: string

    @prop({ required: true })
    username: string

    @prop({ required: true })
    password: string

    @prop({ required: true })
    gender: string

    @prop({ required: true })
    checked: boolean

    @prop({ required: true, default: () => uuidv4() })
    verificationCode: string

    @prop({ default: false })
    verified: boolean

    @prop({ default: false })
    isAdmin: boolean

    async validatePassword(this: DocumentType<User>, suppliedPassword: string): Promise<boolean | undefined>{
        try{
            return await argon.verify(this.password, suppliedPassword);
        }catch(e){
            log.error(e, 'could not rectify password');
        }
    };
}

const UserModel = getModelForClass(User);
export default UserModel;