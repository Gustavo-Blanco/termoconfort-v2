import { Image, PrismaClient, Product } from "@prisma/client"
import { paginate } from "../../helpers/pagination";
import { toStringIfBoolean, toStringIfNumber } from "../../helpers/requestForm";
import { deleteFiles, uploadManyFiles } from "../../services/images/Cloudinary";
import { imagesByProduct } from "../image/imageDao";
import { getPagination } from './productDao';
import { IProductSearchPage } from './productStructure';

const prisma = new PrismaClient();

export const saveImages = async (product: Product, files?: Express.Multer.File[]) => {

    let images: Image[] = [];

    if (files) {
        const imagesRes = await uploadManyFiles(files, `ENTERPRISE_${product.enterpriseId}`);
        images = imagesRes.map(({ key, url }) => ({ key, url })) as Image[];
    }

    return images;
}

export const searchProducts = async (product: Product, limit: number = 10, page: number = 0) => {
    const {skip, take} = paginate(limit, page);
    
    const products = await prisma.product.findMany({
        where:{
            ...product,
            name: {
                contains: product.name || ''
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

export const formatProduct = (body: Product) => {
    const {
        enterpriseId,
        name,
        description,
        brand,
        capacity,
        model,
        type,
        energyConsume,
        install,
        warranty,
        stock,
        price
    } = body;

    const product = {
        enterpriseId: toStringIfNumber(enterpriseId),
        name,
        description,
        brand,
        capacity: toStringIfNumber(capacity),
        model,
        type,
        energyConsume: toStringIfNumber(energyConsume),
        install: toStringIfBoolean(install),
        warranty: toStringIfBoolean(warranty),
        stock: toStringIfNumber(stock),
        price: toStringIfNumber(price)
    } as Product;

    return product; 
}


export const deleteImagesV2 = async (imagesModel: Image[]) => {
    if (imagesModel.length > 0) {
        const imageKeys = imagesModel.map(image => image.key!);
        const imageIds = imagesModel.map(image => image.id!);

        await deleteFiles(imageKeys);
        await prisma.image.deleteMany({ where: { id: { in: imageIds } } });
    }
}

export const saveImagesCloud = async (productReq:Product, files?: Express.Multer.File[]) => {
    if (files) {
        const imagesModel = await imagesByProduct(productReq.id);
        await deleteImagesV2(imagesModel);

        const imagesToInsert = await saveImages(productReq, files);
        return imagesToInsert;
    }
    return [] as Image[];
}


export const formatPagination = async (products: Product[], limit: number) => {
    const pages = await getPagination(limit);
    return {
        products,
        pages
    } as IProductSearchPage
}
