import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user;
    if(!user){
        return res.sendStatus(403);
    }
    next();
}

export default requireUser;