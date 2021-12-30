import { userByEmail } from "../../components/user/userDao"

export const validateAuth = async (email: string) => {
    const user = await userByEmail(email);
    
    if (!user) return ;

}