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
    const defaultPage = Math.floor(countEnteprises/limit);
    const pagination = defaultPage + (countEnteprises % limit != 0 ? 1 : 0);
    return pagination;
}