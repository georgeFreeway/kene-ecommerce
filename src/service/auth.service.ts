import { DocumentType } from "@typegoose/typegoose";
import SessionModel from "../models/session.model";
import { privateFields, User } from "../models/user.model";
import { signJwt } from "../utils/jwt";
import { omit } from "lodash";

type UserId = {
    userId: string
}

export const signAccessToken = (user: DocumentType<User>): string => {
    const payload = omit(user.toJSON(), privateFields);

    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: '15m'
    });
    return accessToken;
}

export const createSession = async ({ userId }: UserId) => {
    return SessionModel.create({ user: userId });
}

export const signRefreshToken = async ({ userId }: UserId): Promise<string> => {
    const session = await createSession({ userId });

    const refreshToken = signJwt({ session: session._id }, 'refreshTokenPrivateKey', {
        expiresIn: '1y'
    });
    return refreshToken;
}

export const findSessionById = (id: string) => {
    return SessionModel.findById(id);
}