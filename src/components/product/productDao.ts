import { PrismaClient, Product } from "@prisma/client"
import { paginate } from "../../helpers/pagination";
import { formatProduct, saveImages, saveImagesCloud } from "./productMethods";

const prisma = new PrismaClient();

export const allProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

export const storeProduct = async (body: any, files?: Express.Multer.File[]) => {
    const productReq = formatProduct(body);
    const images = await saveImages(productReq, files);
    const product = await prisma.product.create({
        data: {
            ...productReq,
            images: {
                createMany: {
                    data: images
                }
            }
        },
        include: { images: true }
    });
    return product;
}

export const updateProduct = async (body: any, id: number, files?: Express.Multer.File[]) => {
    const productReq = formatProduct(body);
    let imagesToInsert = await saveImagesCloud(productReq, files);

    const product = await prisma.product.update({
        where: { id: id },
        data: {
            ...productReq,
            updatedAt: new Date(),
            images: {
                createMany: {
                    data: imagesToInsert
                }
            }
        },
        include: {
            images: true
        },
    });
    return product;
}

export const productById = async (id: number) => {
    const product = await prisma.product.findFirst({ where: { id }, include: { images: true } });
    return product;
}

export const searchProducts = async (productReq: Product, limit: number = 10, page: number = 0) => {
    const { skip, take } = paginate(limit, page);

    const products = await prisma.product.findMany({
        where: {
            ...productReq,
            name: {
                contains: productReq.name || ''
            },
            isActive: true,
            enterprise: {
                isActive: true
            }
        },
        skip,
        take,
        include: {
            images: true
        }
    });
    return products;
}

export const deactiveProduct = async (id: number) => {
    const product = await prisma.product.update({
        where: { id },
        data: { isActive: false }
    });
    return product;
}


export const getPagination = async (limit: number = 9) => {
    const countProducts = await prisma.product.count();
    if(countProducts <= limit) return 0;

    let defaultPage = Math.floor(countProducts/limit);

    if(countProducts % limit != 0) defaultPage + 1;
    
    
    return defaultPage;
}