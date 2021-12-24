import { Post, PrismaClient } from "@prisma/client";
import { paginate } from "../../helpers/pagination";

const prisma = new PrismaClient();

export const getAll = async (): Promise<Post[]> => {
    const posts = await prisma.post.findMany();

    return posts;
}

export const savePost = async (data: Post): Promise<Post> => {
    const post = await prisma.post.create({ data });

    return post;
}

export const updatePost = async (id: number, data: Post): Promise<Post> => {
    data.updatedAt = new Date();
    const post = await prisma.post.update({ where: { id }, data });

    return post;
}

export const deactivePost = async (id: number) => {
    const post = await prisma.post.update({
        where: { id },
        data: { isActive: false }
    });

    return post;
}

export const searchPost = async (postReq: Post, limit: number = 10, page: number = 0) => {
    const { skip, take } = paginate(limit, page);
    const posts = await prisma.post.findMany({
        where: {
            ...postReq,
            title: { contains: postReq.title || '' },
            isActive: true
        },
        include:{
            _count: {
                select: {comments: true}
            }
        },
        skip,
        take
    });
    return posts;
}
