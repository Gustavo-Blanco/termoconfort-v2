import { v2 } from 'cloudinary'
import { env } from '../../env'
import DatauriParser from 'datauri/parser';
import { extname } from 'path'
import { Image } from '@prisma/client';
import { IImageRes } from '../../components/image/imageStructure';

v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
});

const parser = new DatauriParser();

const formatBufferTo64 = (file: Express.Multer.File) => {
    return parser.format(extname(file.originalname).toString(), file.buffer);
}

export const upload = async (file: string, folder: string) => {
    return await v2.uploader.upload(file, { folder });
}

export const uploadManyFiles = async (files: Express.Multer.File[], folder: string): Promise<IImageRes[]> => {

    const images: IImageRes[] = [];

    for (const file of files) {
        const file64 = formatBufferTo64(file);
        const { public_id, url } = await upload(file64.content!, folder);
        images.push({
            key: public_id,
            url: url
        });
    }

    return images;
}

export const deleteFile = async (key: string) => {
    return await v2.uploader.destroy(key);
}