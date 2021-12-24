import { PrismaClient, Product } from "@prisma/client";
import { IResult, result } from "../../response/default";
import { Request, Response } from 'express'
import { saveProduct, searchProducts, updateProduct } from "./productMethods";
import { formatRequest } from "../../helpers/requestForm";

const prisma = new PrismaClient();

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {

        const products = await prisma.product.findMany({include: {images: true}});
        return result(res, products);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const productReq = formatRequest(req.body) as Product;
        const files = req.files as Express.Multer.File[];
        const product = await saveProduct(productReq, files);
        
        return result(res, product);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const productReq = formatRequest(req.body) as Product;
        
        const files = req.files as Express.Multer.File[];
        const id = Number(req.params.id);
        const product = await prisma.product.findFirst({where: {id}, include: {images: true}});
        const updated = await updateProduct(product!,productReq, files );

        return result(res, updated);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const search = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const productReq = formatRequest(req.body) as Product;
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 0;
        const products = await searchProducts(productReq, limit, page);
        return result(res, products);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}


export const images = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        
        
        return result(res, await prisma.image.findMany());
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}


export const deactive = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = Number(req.params.id);
        const enterprise = await prisma.product.update({
            where: { id },
            data: { isActive: false }
        });
        return result(res, enterprise);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}