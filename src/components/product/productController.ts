import { PrismaClient, Product } from "@prisma/client";
import { IResult, result } from "../../response/default";
import { Request, Response } from 'express'
import { saveProduct } from "./productMethods";
import { formatRequest } from "../../helpers/requestForm";

const prisma = new PrismaClient();

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {

        const products = await prisma.product.findMany();
        return result(res, products);
    } catch (error: any) {
        return result(res, error.toString());
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const productReq = formatRequest(req.body) as Product;
        const files = req.files as Express.Multer.File[];
        const products = await saveProduct(productReq, files);
        return result(res, products);
    } catch (error: any) {
        return result(res, error.toString());
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const productReq = req.body as Product;
        const files = req.files as Express.Multer.File[];
        const products = await saveProduct(productReq, files);
        return result(res, products);
    } catch (error: any) {
        return result(res, error.toString());
    }
}