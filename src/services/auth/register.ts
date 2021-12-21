import { PrismaClient, User } from "@prisma/client";
import { IUserJwt } from "../../components/user/userStructure";
import { createToken } from "../jwt/jwt";
import { hashPass } from "./password";

const prisma = new PrismaClient();

export const register = async (data: User) => {

    data.token = await assignToken(data as IUserJwt);
    data.password = await hashPass(data.password!);
    const user = await prisma.user.create({data});
    return user;
};

export const assignToken = async (user: IUserJwt) => {
    return await createToken(user);
}


