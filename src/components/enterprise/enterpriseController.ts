import { Enterprise, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { formartReqUpdate, formatRequest } from "../../helpers/requestForm";
import { errorDefault, IResult, result } from "../../response/default";
import { imageEnterprise, searchEnterprises } from "./enterpriseMethods";
import { IEnterpriseReq } from "./enterpriseStructure";

const prisma = new PrismaClient();

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterprises = await prisma.enterprise.findMany();
        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterpriseReq = formatRequest(req.body) as Enterprise;

        const data = await imageEnterprise(enterpriseReq, req.file);
        const enterprise = await prisma.enterprise.create({ data });

        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const get = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = Number(req.params.id);
        const enterprise = await prisma.enterprise.findFirst({ where: { id } });

        if (!enterprise) throw errorDefault("There is not enterprise with id " + id);

        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterpriseReq = formartReqUpdate(formatRequest(req.body)) as Enterprise;
        const id = Number(req.params.id);
        const data = await imageEnterprise(enterpriseReq, req.file);
        const enterprises = await prisma.enterprise.update({ where: { id }, data });

        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const search = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterpriseReq = req.body as Enterprise;
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 0;

        const enterprises = await searchEnterprises(enterpriseReq, limit, page);
        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const deactivate = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = Number(req.params.id);
        const enterprise = await prisma.enterprise.update({
            where: { id },
            data: { isActive: false }
        });
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}