import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const imagesByProduct = async (productId: number) => {
    const images = await prisma.image.findMany({ where: { productId } });
    return images;
}

export const allImages = async () => {
    const images = await prisma.image.findMany();
    return images;
}

export const deleteImagesByProduct = async (productIds: number[]) => {
    const images = await prisma.image.deleteMany({ where: { productId: { in: productIds } } });
    return images;
}