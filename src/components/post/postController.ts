import { Post } from "@prisma/client";
import { Request, Response } from "express";
import { getId, getIdAndData, getPaginateParams } from "../../helpers/reqRes";
import { IResult, result } from "../../response/default";
import { deactivePost, getAll, savePost, searchPost, updatePost } from "./postDao";

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const posts = await getAll();
        return result(res, posts);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const post = await savePost(req.body as Post);
        return result(res, post);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const { reqBody, id } = getIdAndData(req, 'id');
        const post = await updatePost(id, reqBody);
        return result(res, post);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const deactive = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const post = await deactivePost(id);
        return result(res, post);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const search = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const { page, limit } = getPaginateParams(req);
        const posts = await searchPost(req.body, limit, page);
        return result(res, posts);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}
