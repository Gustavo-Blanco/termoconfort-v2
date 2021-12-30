import { PrismaClient, User } from "@prisma/client";
import { userByEmail } from "../../components/user/userDao";
import { parseJWTUser } from "../../components/user/userMethods";
import { IUserJwt } from "../../components/user/userStructure";
import { errorDefault } from "../../response/default";
import { createToken } from "../jwt/jwt";
import { hashPass } from "./password";

const prisma = new PrismaClient();

export const register = async (data: User) => {

    data.token = await assignToken(data as IUserJwt);
    data.password = await hashPass(data.password!);
    const user = await prisma.user.create({ data });
    return user;
};

export const assignToken = async (user: IUserJwt) => {
    return await createToken(user);
}

export const registerV2 = async (userReq: User) => {

    const user = await userByEmail(userReq.email);
    
    if (user) {
        if (user.googleId) throw errorDefault("Usted ya se registró por su cuenta de google");
        if (user.password) throw errorDefault("Usted ya se registró por correo y contraseña")
    }

    if (userReq.password) {
        userReq.hashedPassword = await hashPass(userReq.password);
    }

    userReq.token = await assignToken(parseJWTUser(userReq));
    const userSaved = await prisma.user.create({ data: userReq });
    return userSaved;
};

