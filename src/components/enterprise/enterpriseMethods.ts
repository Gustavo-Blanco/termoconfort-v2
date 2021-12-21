import { Enterprise } from "@prisma/client";
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary";

export const imageEnterprise = async (enterprise: Enterprise, file?: Express.Multer.File) => {
    const { imageKey } = enterprise;
    
    if (imageKey) {
        await deleteFile(imageKey);
        enterprise.imageKey = null;
    }

    if (file) {
        const images = await uploadManyFiles([file], 'ENTERPRISE');
        const { key, url } = images[0];

        enterprise.imageUrl = url;
        enterprise.imageKey = key;
    }

    return enterprise;

}