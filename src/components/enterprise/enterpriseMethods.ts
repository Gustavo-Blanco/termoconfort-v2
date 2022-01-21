import { Enterprise } from "@prisma/client";
import { toStringIfNumber } from "../../helpers/requestForm";
import { deleteFile, uploadManyFiles } from "../../services/images/Cloudinary";
import { getPagination } from './enterpriseDao';
import { IEntepriseSearchPage, IInterested, OrdersUserProduct } from './enterpriseStructure';

export const imageEnterprise = async (enterprise: Enterprise, file?: Express.Multer.File): Promise<Enterprise> => {
    const { imageKey } = enterprise;

    if (file) {
        if (imageKey) console.log(await deleteFile(imageKey));
        const images = await uploadManyFiles([file], 'ENTERPRISE');
        const { key, url } = images[0];

        enterprise.imageUrl = url;
        enterprise.imageKey = key;
    }

    return enterprise;

}

export const formatEnterprise = (body: Enterprise) => {
    const {
        ruc,
        userId,
        name,
        description,
        email,
        linkedin,
        facebook,
        twitter,
        youtube,
        instagram,
        webPage,
        workers,
        imageKey,
        imageUrl
    } = body;
    const enterprise = {
        ruc,
        userId: toStringIfNumber(userId),
        name,
        description,
        email,
        linkedin,
        facebook,
        twitter,
        youtube,
        instagram,
        webPage,
        imageUrl,
        workers: toStringIfNumber(workers)
    } as Enterprise;

    if (imageKey && imageKey !== '') enterprise.imageKey = imageKey;

    return enterprise;
}


export const formatPagination = async (enterprises: Enterprise[], limit: number) => {
    const pages = await getPagination(limit);
    return {
        enterprises,
        pages
    } as IEntepriseSearchPage
}

export const formatResInteresteds = (interesteds: OrdersUserProduct[]) => {
    const data = interesteds.map(interested => {
        const { id: productId, name, stock, price } = interested.product!;
        const { id: userId, email, name: user } = interested.user!;

        return {
            id: interested.id,
            productId,
            name,
            stock,
            price,
            userId,
            email,
            user,
        }

    }) as IInterested[];

    return data;
}