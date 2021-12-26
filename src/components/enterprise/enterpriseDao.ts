import { Enterprise, PrismaClient, Product } from "@prisma/client"
import { formatRequest } from "../../helpers/requestForm";
import { imageEnterprise } from "./enterpriseMethods";

const prisma = new PrismaClient();

export const allEnterprises = async () => {
    const enterprises = await prisma.enterprise.findMany();
    return enterprises;
}

export const saveEnterprise = async (body: any, file?: Express.Multer.File) => {
    const reqBody = formatRequest(body);
    const data = await imageEnterprise(reqBody, file);
    const enterprise = await prisma.enterprise.create({
        data: data
    });
    return enterprise;
}