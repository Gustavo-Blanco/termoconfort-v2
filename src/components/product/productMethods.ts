import { Image, PrismaClient, Product } from "@prisma/client"
import { paginate } from "../../helpers/pagination";
import { deleteFiles, uploadManyFiles } from "../../services/images/Cloudinary";
import { ProductWithImages } from "./productStructure";

const prisma = new PrismaClient();

export const saveProduct = async (product: Product, files?: Express.Multer.File[]) => {
    const images = await saveImages(product, files);
    const saved = await prisma.product.create({
        data: {
            ...product,
            images: {
                createMany: {
                    data: images
                }
            }
        },
        include: { images: true }
    });
    return saved;
}

export const updateProduct = async (product: ProductWithImages, prod: Product, files?: Express.Multer.File[]) => {
    const { id } = product;
    let imagesToDelete: number[] = [];
    let imagesToInsert: Image[] = [];
    if (files) {
        imagesToDelete = (await deleteImages(product)).map(image => image.id);
        imagesToInsert = (await saveImages(product, files));
    }
    
    if (imagesToDelete.length > 0) {
        await prisma.image.deleteMany({ where: { id: { in: imagesToDelete } } });
    }
    const updated = await prisma.product.update({
        where: { id },
        data: {
            ...prod,
            images: {
                createMany: {
                    data: imagesToInsert
                }
            }
        },
        include:{
            images: true
        },
    });

    return updated;
    
}

export const saveImages = async (product: Product, files?: Express.Multer.File[]) => {

    let images: Image[] = [];

    if (files) {
        const imagesRes = await uploadManyFiles(files, `ENTERPRISE_${product.enterpriseId}`);
        images = imagesRes.map(({ key, url }) => ({ key, url })) as Image[];
    }

    return images;
}

export const deleteImages = async (product: ProductWithImages) => {
    const { images } = product;
    
    if (images.length > 0) {
        const publicIds = images.map(image => image.key!);
        await deleteFiles(publicIds);
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