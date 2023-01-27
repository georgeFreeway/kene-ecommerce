//install and import jwt from the package manager(also install the types)
//install and import the config library
import jwt from 'jsonwebtoken';
import config from 'config';

//declare a function that takes in a payload, a secret string and an optional options parameter
//the signJwt function here takes a payload which of type object, a keyname which is of type string and has a literal value of either "accessTokenPrivateKey" or "refreshTokenPrivateKey" and lastly an optional options parameter which is of type jwt.SignOptions (coming from the jwt types installed)
export function signJwt(payload: object, keyname: "accessTokenPrivateKey" | "refreshTokenPrivateKey" | "secret", options?: jwt.SignOptions){

    //call the get method on the config variable
    const signPrivateKey = Buffer.from(config.get<string>(keyname), "base64").toString("ascii");

    return jwt.sign(payload, signPrivateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export function verifyJwt<T>(token: string, keyname: "accessTokenPublicKey" | "refreshTokenPublicKey"): T | null{
    const signPublicKey = Buffer.from(config.get<string>(keyname), "base64").toString("ascii");

   try{
        const decodedToken = jwt.verify(token, signPublicKey) as T;
        return decodedToken;
    }catch(error){
        return null;
    }
}
