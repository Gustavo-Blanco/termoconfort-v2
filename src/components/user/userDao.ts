import { PrismaClient, User } from "@prisma/client";
import { paginate } from '../../helpers/pagination';
import { errorDefault } from "../../response/default";
import { hashPass } from "../../services/auth/password";
import { registerV2 } from "../../services/auth/register";
import { storeAndDeleteImage } from "./userMethods";

const prisma = new PrismaClient();

export const allUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export const storeUser = async (userReq: User) => {
    const user = await registerV2(userReq);
    return user;
}

export const userByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
}

export const userById = async (id: number) => {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) throw errorDefault(`There is not result with id ${id}`);
    return user;
}

export const userHasEnterprise = async (id: number) => {
    const enterprises = await prisma.enterprise.count({
        where: { userId: id, isActive: true },
    });
    return enterprises !== 0;
}

export const updateUser = async (userReq: User, id: number, file?: Express.Multer.File) => {
    const data = await storeAndDeleteImage(userReq, file);
    if (data.password) data.hashedPassword = await hashPass(data.password);
    const saved = await prisma.user.update({
        where: { id },
        data,
    });
    return saved;
}

export const userGetEnterprise = async (id: number) => {
    const enterprise = await prisma.enterprise.findFirst({ where: { userId: id, isActive: true } });
    if (!enterprise) throw errorDefault("You don't have an enterprise");

    return enterprise;
}

export const getOrders = async (id: number) => {
    const orders = await prisma.order.findMany({ 
        where: { userId: id },
        select: {
            id: true,
            product: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                    stock: true,
                    price: true
                }
            }
        } 
    });

    return orders;
}

export const searchUsers = async (userReq: User, limit: number = 10, page: number = 0) => {
    const { skip, take } = paginate(limit, page);

    const users = await prisma.user.findMany({ 
        where: {
            ...userReq,
            name: {
                contains: userReq.name || ''
            }
        },
        skip,
        take
    });

    return users;
}

export const getPagination = async (userReq: User, limit: number = 9) => {
    const countUsers = await prisma.user.count({
        where: {
            ...userReq,
            name: {
                contains: userReq.name || ''
            }
        }
    });
    if (countUsers <= limit) return 0;

    let defaultPage = Math.floor(countUsers / limit);

    if (countUsers % limit != 0) defaultPage + 1;

    return defaultPage;
}