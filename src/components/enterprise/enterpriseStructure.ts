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
});


const productsWithInteresteds = Prisma.validator<Prisma.ProductArgs>()({
    select: {
        id: true,
        name: true,
        description: true,
        stock: true,
        price: true,
        orders: {
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phoneNumber: true
                    }
                }
            }
        }
    }
});

export type OrdersUserProduct = Prisma.OrderGetPayload<typeof ordersUserProduct>
export type ProductsWithInteresteds = Prisma.ProductGetPayload<typeof productsWithInteresteds>


export interface IInterested {
    productId: number;
    name: string;
    stock: number;
    price: Decimal;
    userId: number;
    email: string;
    user: string;
}

export interface IProductInterested {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: Decimal;
    users: IInterestedV2[]
}

export interface IInterestedV2 {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}