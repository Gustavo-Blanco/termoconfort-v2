import { sign } from "jsonwebtoken";
import { env } from "../../env";

export const createToken = async (payload: any): Promise<string> => {
    return sign(payload, env.JWT_TOKEN);
}