import { PrismaClient, User } from "@prisma/client";
import { errorDefault } from "../../response/default";
import { isEqual } from "./password";

const prisma = new PrismaClient();

export const authByPassword = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findFirst({ where: { email } });
  
  if (!user) throw errorDefault(`User not found, check your email or password`);
  const compare = await isEqual(password,user.password!);
  if (!compare) throw errorDefault(`Password incorrect`);
  
  return user;
};
