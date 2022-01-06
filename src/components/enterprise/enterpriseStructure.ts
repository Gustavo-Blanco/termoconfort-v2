import { Enterprise } from '@prisma/client';

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