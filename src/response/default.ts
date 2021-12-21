import { Response } from "express";

export interface IResult {
  ok: boolean;
  data: any;
}

export const result = (res: Response,data: any, ok: boolean = true): Response<IResult> => {
  return res.json({
    ok,
    data,
  });
};

export const errorDefault = (message: string) => message;