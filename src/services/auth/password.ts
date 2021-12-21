import { hash } from "bcrypt";

export const hashPass = async (password: string) => await hash(password, 2);
