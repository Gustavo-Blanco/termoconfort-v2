import { Comment } from "@prisma/client";
import { Response, Request } from "express";
import { getId } from "../../helpers/reqRes";
import { IResult, result } from "../../response/default";
import { allComments, saveComment, updateComment } from "./commentDao";

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const comments = await allComments();
        return result(res, comments);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const comment = await saveComment(req.body as Comment);
        return result(res, comment);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const comment = await updateComment(req.body as Comment, id);
        return result(res, comment);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}