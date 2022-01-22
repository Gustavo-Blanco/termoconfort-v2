import { Request, Response } from "express";
import { IResult, result } from "../../response/default";
import { auth } from "../../services/auth/login";
import { registerV2 } from "../../services/auth/register";
import { formatOrdersByUser, formatUserUpdate } from "./userMethods";
import { allUsers, userById, userHasEnterprise, updateUser, userGetEnterprise, getOrders } from './userDao';
import { getId } from "../../helpers/reqRes";

export const all = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const users = await allUsers();
    return result(res, users);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const signUp = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const user = await registerV2(req.body);
    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const signIn = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const user = await auth(req.body);
    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const byId = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const id = getId(req, 'id');
    const user = await userById(id);

    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const hasEnterprise = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const id = getId(req, 'id');
    const check = await userHasEnterprise(id);

    return result(res, check);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const update = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {

    const userReq = formatUserUpdate(req.body);
    const id = getId(req, 'id');
    const user = await updateUser(userReq, id, req.file);

    return result(res, user);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
};

export const getEnterprise = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const id = getId(req, 'id');
    const enterprise = await userGetEnterprise(id);

    return result(res, enterprise);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
}

export const orders = async (req: Request, res: Response): Promise<Response<IResult>> => {
  try {
    const id = getId(req, 'id');
    const orders = await getOrders(id);
    const formatOrders = formatOrdersByUser(orders);
    return result(res, formatOrders);
  } catch (error: any) {
    return result(res, error.toString(), false);
  }
}
