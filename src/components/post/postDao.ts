import { Post, PrismaClient } from "@prisma/client";
import { paginate } from "../../helpers/pagination";
import { toPostCardReq } from "../../response/PostCardReq";

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
            user: {
                select: {
                    name: true,
                    profileImage: true
                }
            },
            _count: {
                select: {comments: true}
            }
        },
        skip,
        take
    });
    
    return toPostCardReq(posts);
}

export const getPagination = async (limit: number = 9) => {
    const countPosts = await prisma.post.count();
    if(countPosts <= limit) return 0;

    let defaultPage = Math.floor(countPosts/limit);

    if(countPosts % limit != 0) defaultPage + 1;
    
    return defaultPage;
}