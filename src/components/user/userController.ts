import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import { formatRequest } from "../../helpers/requestForm";
import { errorDefault, IResult, result } from "../../response/default";
import { authByPassword } from "../../services/auth/login";
import { register } from "../../services/auth/register";
import { updateUser } from "./userMethods";

const prisma = new PrismaClient();

export const all = async (
  req: Request,
  res: Response
): Promise<Response<IResult>> => {
  try {
    const users = await prisma.user.findMany();
    return result(res, users);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response<IResult>> => {
  try {
    const data = req.body as User;
    const user = await register(data);
    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response<IResult>> => {
  try {
    const data = req.body as User;
    const user = await authByPassword(data.email, data.password!);
    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const byId = async (
  req: Request,
  res: Response
): Promise<Response<IResult>> => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) throw errorDefault(`There is not result with id ${id}`);

    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const hasEnterprise = async (
  req: Request,
  res: Response
): Promise<Response<IResult>> => {
  try {
    const id = Number(req.params.id);

    const enterprises = await prisma.enterprise.count({
      where: { userId: id, isActive: true },
    });
    const check = enterprises != 0;

    return result(res, check);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response<IResult>> => {
  try {
    const data = formatRequest(req.body) as User;
    const id = Number(req.params.id);
    // console.log(data);
    
    const user = await updateUser(data, id, req.file);
    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString());
  }
};

export const getEnterprise = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
      const id = Number(req.params.id);
      const enterprise = await prisma.enterprise.findFirst({ where: { userId: id, isActive: true } });

      if (!enterprise) throw errorDefault("You don't have an enterprise");

      return result(res, enterprise);
  } catch (error: any) {
      return result(res, error.toString());
  }
}
