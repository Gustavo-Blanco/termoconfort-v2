import { PrismaClient, User } from "@prisma/client"
import { Request } from "express";
import { hashPass } from "../../services/auth/password";
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary"

const prisma = new PrismaClient();

export const updateUser = async (user: User, id: number, file?: Express.Multer.File) => {

    const data = await updateImage(user, file);
    if(data.password) data.password = await hashPass(data.password);
    const saved = await prisma.user.update({
        where: { id },
        data,
    });

    return saved;
}

export const updateImage = async (user: User, file?: Express.Multer.File) => {
    const { profileKey } = user;

    if (profileKey) {
        await deleteFile(profileKey);
        user.profileKey = null;
        user.profileImage = null;
    }
    
    if (file) {
        const images = await uploadManyFiles([file], 'PROFILE');
        const { key, url } = images[0];

        user.profileImage = url;
        user.profileKey = key;
    }

    return user;

}

export const formatUserUpdateReq = (body: any): User => {
    const user = body as User;
    return {
        ...user,
        phoneNumber: String(user.phoneNumber)
    }
}