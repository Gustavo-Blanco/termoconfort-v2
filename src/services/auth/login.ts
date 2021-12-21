import { PrismaClient, User } from "@prisma/client";
import { errorDefault } from "../../response/default";

const prisma = new PrismaClient();

export const authByPassword = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findFirst({ where: { email, password } });
  
  if (!user) throw errorDefault(`User not found, check your email or password`);
  
  return user;
};
