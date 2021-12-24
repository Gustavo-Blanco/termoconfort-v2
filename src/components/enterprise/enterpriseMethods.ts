import { Enterprise, Prisma, PrismaClient } from "@prisma/client";
import { paginate } from "../../helpers/pagination";
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary";

const prisma = new PrismaClient();

export const imageEnterprise = async (enterprise: Enterprise, file?: Express.Multer.File): Promise<Enterprise> => {
    const { imageKey } = enterprise;
    
    if (imageKey) {
        const delteF = await deleteFile(imageKey);
        console.log(delteF,'delte file');
        
        enterprise.imageKey = null;
    }
    
    // console.log(enterprise, 'despues de borrar');
    // if (!file) delete enterprise.image?;

    if (file) {
        const images = await uploadManyFiles([file], 'ENTERPRISE');
        const { key, url } = images[0];

        enterprise.imageUrl = url;
        enterprise.imageKey = key;
    }

    return enterprise;

}

export const searchEnterprises = async (enterprise: Enterprise, limit: number = 10, page: number = 0): Promise<Enterprise[]> => {
    const {skip, take} = paginate(limit, page);
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