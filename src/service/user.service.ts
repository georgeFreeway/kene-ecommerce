import UserModel, { User } from "../models/user.model";

export function registerUser(userData: Partial<User>){
    return UserModel.create(userData);
}

export function findUserById(id: string){
    return UserModel.findById(id);
}

export function findUserByEmail(email: string){
    return UserModel.findOne({ email });
}