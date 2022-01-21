import { Enterprise, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export interface IEnterpriseReq {
    id: number;
    userId: number;
    name: string;
    description: string;
    install: boolean
}

export interface IEntepriseSearchPage {
    enterprises: Enterprise[]
    pages: number;
}

const ordersUserProduct = Prisma.validator<Prisma.OrderArgs>()({
    select: {
        id: true,
        product: {
            select: {
                id: true,
                name: true,
                stock: true,
                price: true
            }
        },
        user: {
            select: {
                id: true,
                email: true,
                name: true
            }
        }
    },
})

export type OrdersUserProduct = Prisma.OrderGetPayload<typeof ordersUserProduct>

export interface IInterested {
    productId: number;
    name: string;
    stock: number;
    price: Decimal;
    userId: number;
    email: string;
    user: string;
}