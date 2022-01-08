import { Request, Response } from "express";
import { getId, getPaginateParams } from "../../helpers/reqRes";
import { IResult, result } from "../../response/default";
import { allEnterprises, deactivateEnterprise, enterpriseByUser, getEnterpriseById, saveEnterprise, updateEnterprise, updateStateEnterprise, searchEnterprises, getPagination } from "./enterpriseDao";
import { formatPagination } from './enterpriseMethods';

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterprises = await allEnterprises();
        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterprise = await saveEnterprise(req.body, req.file);
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const get = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const enterprise = await getEnterpriseById(id);
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const enterprise = await updateEnterprise(req.body, id, req.file)

        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const search = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const { limit, page } = getPaginateParams(req);
        
        const enterprises = await searchEnterprises(req.body, limit, page);
        const data = await formatPagination(enterprises, limit);
        return result(res, data);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const deactivate = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const enterprise = await deactivateEnterprise(id);
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}


export const byUser = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const userId = getId(req, 'userId');
        const enterprise = await enterpriseByUser(userId);
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const updateState = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const state = Number(req.body.state);
        const enterprise = await updateStateEnterprise(id, state);
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}