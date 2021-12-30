import { PrismaClient, User } from "@prisma/client";
import { userByEmail } from "../../components/user/userDao";
import { errorDefault } from "../../response/default";
import { isEqual } from "./password";

const prisma = new PrismaClient();

export const authByPassword = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) throw errorDefault(`User not found, check your email or password`);
  const compare = await isEqual(password, user.password!);
  if (!compare) throw errorDefault(`Password incorrect`);

  return user;
};


export const auth = async (userReq: User) => {
  const user = await userByEmail(userReq.email);

  if (!user) throw errorDefault(`User with email ${userReq.email} not found, please register`);
  
  const checkLogin = await checkByLogin(userReq, user);
  
  if(!checkLogin) throw errorDefault("Your password or google authentication was incorrect");

  return user;
}

export const checkByLogin = async (userReq: User, user: User) => {
  
  if (userReq.googleId) return userReq.googleId == user.googleId;
  if (userReq.password) return await isEqual(userReq.password, user.hashedPassword || '');
}