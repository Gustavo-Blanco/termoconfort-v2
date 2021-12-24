import { Request } from "express";

export const getIdAndData = (req: Request, idName: string = 'id') => {
    const id = Number(req.params[idName]);

    const reqBody = req.body as any;
    console.log(reqBody);

    return { reqBody, id }
}

export const getId = (req: Request, idName: string): number => Number(req.params[idName]);

export const getPaginateParams = (req: Request) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 0;
    return { limit, page }
}