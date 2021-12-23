import { Image, Prisma, PrismaClient, Product } from "@prisma/client"
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary";
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
        }
    });
    return saved;
}

export const updateProduct = async (product: Product, files?: Express.Multer.File[]) => {
    const images = await saveImages(product, files);
    const saved = await prisma.product.create({
        data: {
            ...product,
            images: {
                createMany: {
                    data: images
                }
            }
        }
    });
    return saved;
}

export const saveImages = async (product: Product, files?: Express.Multer.File[]) => {
    
    let images: Image[] = [];

    if (files) {
        const imagesRes = await uploadManyFiles(files, `ENTERPRISE_${product.enterpriseId}`);  
        images = imagesRes.map(({key, url}) => ({key, url})) as Image[];
    }

    return images;
}

export const deleteImages = async (product: ProductWithImages) => {
    const { images } = product;
    
    if (images.length > 0) {
        for (const image of images) {
            const {key} = image;
            await deleteFile(key!);
            image.key = null;
        }
    }
}