import { Enterprise, PrismaClient } from "@prisma/client";
import { paginate } from "../../helpers/pagination";
import { toStringIfNumber } from "../../helpers/requestForm";
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary";
const prisma = new PrismaClient();

export const imageEnterprise = async (enterprise: Enterprise, file?: Express.Multer.File): Promise<Enterprise> => {
    const { imageKey } = enterprise;

    if (file) {
        if (imageKey) console.log(await deleteFile(imageKey));
        const images = await uploadManyFiles([file], 'ENTERPRISE');
        const { key, url } = images[0];

        enterprise.imageUrl = url;
        enterprise.imageKey = key;
    }

    return enterprise;

}

export const searchEnterprises = async (enterprise: Enterprise, limit: number = 10, page: number = 0): Promise<Enterprise[]> => {
    const { skip, take } = paginate(limit, page);
    const enterprises = await prisma.enterprise.findMany({
        where: {
            ...enterprise,
            name: {
                contains: enterprise.name || ''
            },
            isActive: true
        },
        skip,
        take

    });

    return enterprises;
}

export const formatEnterprise = (body: Enterprise) => {
    const {
        ruc,
        userId,
        name,
        description,
        email,
        linkedin,
        facebook,
        twitter,
        youtube,
        instagram,
        webPage,
        workers,
        imageKey,
        imageUrl
    } = body;
    const enterprise = {
        ruc,
        userId: toStringIfNumber(userId),
        name,
        description,
        email,
        linkedin,
        facebook,
        twitter,
        youtube,
        instagram,
        webPage,
        imageUrl,
        workers: toStringIfNumber(workers)
    } as Enterprise;

    if(imageKey && imageKey !== '') enterprise.imageKey = imageKey;

    return enterprise;
}