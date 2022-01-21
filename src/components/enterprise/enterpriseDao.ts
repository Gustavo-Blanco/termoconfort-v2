import { Enterprise, PrismaClient } from "@prisma/client"
import { paginate } from "../../helpers/pagination";
import { errorDefault } from "../../response/default";
import { formatEnterprise, imageEnterprise } from "./enterpriseMethods";

const prisma = new PrismaClient();

export const allEnterprises = async () => {
    const enterprises = await prisma.enterprise.findMany();
    return enterprises;
}

export const saveEnterprise = async (body: any, file?: Express.Multer.File) => {
    const reqBody = formatEnterprise(body);

    const data = await imageEnterprise(reqBody, file);
    const enterprise = await prisma.enterprise.create({
        data: data
    });
    return enterprise;
}

export const getEnterpriseById = async (id: number) => {
    const enterprise = await prisma.enterprise.findFirst({ where: { id } });

    if (!enterprise) throw errorDefault("There is not enterprise with id " + id);

    return enterprise;
}


export const updateEnterprise = async (body: any, id: number, file?: Express.Multer.File) => {
    const reqBody = formatEnterprise(body);

    const data = await imageEnterprise(reqBody, file);
    const enterprise = await prisma.enterprise.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date()
        }
    });
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

export const deactivateEnterprise = async (id: number) => {
    const enterprise = await prisma.enterprise.update({
        where: { id },
        data: { isActive: false }
    });
    return enterprise
}

export const enterpriseByUser = async (userId: number) => {
    const enterprise = await prisma.enterprise.findFirst({
        where: { userId, isActive: true }
    });
    return enterprise
}

export const updateStateEnterprise = async (id: number, state: number) => {
    const enterprise = await prisma.enterprise.update({
        where: { id }, data: { state }
    });
    return enterprise
}

export const getPagination = async (limit: number = 9) => {
    const countEnteprises = await prisma.enterprise.count();
    if (countEnteprises <= limit) return 0;

    let defaultPage = Math.floor(countEnteprises / limit);

    if (countEnteprises % limit != 0) defaultPage + 1;

    return defaultPage;
}

export const getInteresteds = async (enterpriseId: number) => {
    const products = await prisma.product.findMany({
        where: { enterpriseId },
        select: { id: true }
    });

    const productIds = products.map(product => product.id);

    const orders = await prisma.order.findMany({
        where: { productId: { in: productIds } },
        select: {
            id: true,
            product: {
                select: {
                    id: true,
                    name: true,
                    stock: true,
                    price: true
                }
            },
            user: {
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            }
        },
        
    });

    return orders;
}