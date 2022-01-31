import { PrismaClient } from "@prisma/client";
import { IResult, result } from "../../response/default";
import { Request, Response } from 'express'
import { storeProduct, updateProduct, searchProducts, deactiveProduct, addOrder, deleteOrder, getOrder } from "./productDao";
import { getId, getPaginateParams } from "../../helpers/reqRes";
import { allImages } from "../image/imageDao";
import { formatPagination } from './productMethods';

const prisma = new PrismaClient();

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {

        const products = await prisma.product.findMany({ include: { images: true } });
        return result(res, products);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const store = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const files = req.files as Express.Multer.File[];
        const product = await storeProduct(req.body, files);

        return result(res, product);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const files = req.files as Express.Multer.File[];
        console.log(files);
        
        const product = await updateProduct(req.body, id, files);

        return result(res, product);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const search = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const { page, limit } = getPaginateParams(req);
        const products = await searchProducts(req.body, limit, page);
        const data = await formatPagination(products, limit);
        return result(res, data);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const images = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const images = await allImages();
        return result(res, images);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const deactive = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req, 'id');
        const product = await deactiveProduct(id);
        return result(res, product);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const addInterested = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const order = await addOrder(req.body);
        return result(res, order);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const getIntProduct = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const order = await getOrder(req.body);
        return result(res, order);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}

export const deleteInterested = async (req: Request, res: Response): Promise<Response<IResult>> => {
    try {
        const id = getId(req,'id');
        const order = await deleteOrder(id);
        return result(res, order);
    } catch (error: any) {
        return result(res, error.toString(), false);
    }
}