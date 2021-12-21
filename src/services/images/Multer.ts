import multer, { FileFilterCallback } from 'multer';
import { Express, Request } from 'express'

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error('There are not images to save'));
    }
}

export const uploadMulter = multer({
    storage: multer.memoryStorage(),
    fileFilter: multerFilter
});