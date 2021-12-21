import { NextFunction, Request, Response } from "express";
import { errorDefault, result } from "../response/default";

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) throw errorDefault("There is not a token in header");

        const token = authorization.replace("Bearer ", "");
        if (token.length == 0) throw errorDefault("There is not a token in header");


    } catch (error: any) { 
        return result(res, error.toString());
    }

    next();
};
