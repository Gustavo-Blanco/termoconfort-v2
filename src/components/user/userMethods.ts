import { PrismaClient, User } from "@prisma/client"
import { Request } from "express";
import { hashPass } from "../../services/auth/password";
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary"
import { IOrdersByUser, IUserJwt, OrdersByUser } from "./userStructure";
const prisma = new PrismaClient();

export const updateUser = async (user: User, id: number, file?: Express.Multer.File) => {

    const data = await updateImage(user, file);
    if (data.password) data.password = await hashPass(data.password);
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

export const parseJWTUser = (body: any): IUserJwt => ({
    id: body.id,
    email: body.email,
    password: body.password
});

export const formatUserUpdate = (body: any) => {
    const keyValuesPair = Object.entries(body);
    const requestBody: any = {};
    
    const keyValues = keyValuesPair.map((pair) => {
        const [key, value] = pair;
        if (typeof value === 'string') {
            if (value === 'true' || value === 'false') return { key, value: value === 'true' }
            if (key === 'phoneNumber') return { key, value }
            if (key === 'profileKey' && value === '') return ;
            if (key !== 'image') return { key, value }
        } else {
            return { key, value }
        }
    }).filter(pair => { if (pair) return true });

    for (const iterator of keyValues) {
        requestBody[iterator!.key] = iterator!.value
    }
    return requestBody as User;
}

export const storeAndDeleteImage = async (userReq: User, file?: Express.Multer.File) => {
    const { profileKey } = userReq;

    if (profileKey) await deleteFile(profileKey);

    if (file) {
        const images = await uploadManyFiles([file], 'PROFILE');
        const { key, url } = images[0];

        userReq.profileImage = url;
        userReq.profileKey = key;
    }
    return userReq;
}


export const formatOrdersByUser = (ordersByUser: OrdersByUser[]) => {
    return ordersByUser.map(orderByUser => {
        const { id } = orderByUser;
        const { id: productId, name, stock, price, images } = orderByUser.product!;
        return {
            id,
            productId,
            name,
            stock,
            price,
            images
        }
    }) as IOrdersByUser[]
}