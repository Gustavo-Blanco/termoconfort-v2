import { hash, compareSync } from "bcrypt";

export const hashPass = async (password: string) => await hash(password, 2);

export const isEqual = async (password: string, hashed: string) => {
    return await compareSync(password,hashed);
}