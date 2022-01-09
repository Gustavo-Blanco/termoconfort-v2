import { Comment, PrismaClient } from "@prisma/client"
import { parseToCommentUserReq } from '../../response/CommentUserReq';

const prisma = new PrismaClient();

export const allComments = async () => {
    const comments = await prisma.comment.findMany();
    return comments;
}

export const saveComment = async (data: Comment) => {
    const comment = await prisma.comment.create({ data: data });
    return comment;
}

export const updateComment = async (data: Comment, id: number) => {
    data.updatedAt = new Date();
    const comment = await prisma.comment.update({ where: { id }, data: data });
    return comment;
}

export const getCommentByPostUser = async (comment: Comment) => {
    const comments = await prisma.comment.findMany({ 
        where: { ...comment },
        include: {
            user: {
                select: {
                    name: true,
                    profileImage: true
                }
            }
        }
    });
    return parseToCommentUserReq(comments);
}