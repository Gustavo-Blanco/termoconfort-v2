import { Image, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export interface IUserJwt {
    id: number;
    email: string;
    password: string;
}

const ordersByUser = Prisma.validator<Prisma.OrderArgs>()({
    select: {
        id: true,
        product: {
            select: {
                id: true,
                name: true,
                images: true,
                stock: true,
                price: true
            }
        }
    }
})

export type OrdersByUser = Prisma.OrderGetPayload<typeof ordersByUser>

export interface IOrdersByUser {
    id: number;
    productId: number;
    name: string;
    images: Image[];
    stock: number;
    price: Decimal;
}
