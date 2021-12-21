import { Enterprise, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IResult, result } from "../../response/default";
import { imageEnterprise } from "./enterpriseMethods";

const prisma = new PrismaClient();

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterprises = await prisma.enterprise.findMany();
        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString());
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterpriseReq = req.body as Enterprise;
        const data = await imageEnterprise(enterpriseReq, req.file);
        const enterprises = await prisma.enterprise.create({ data });
        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString());
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const enterpriseReq = req.body as Enterprise;
        const id = Number(req.params.id);

        const data = await imageEnterprise(enterpriseReq, req.file);
        const enterprises = await prisma.enterprise.update({ where: { id }, data });
        
        return result(res, enterprises);
    } catch (error: any) {
        return result(res, error.toString());
    }
}