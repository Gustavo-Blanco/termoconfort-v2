import { Prisma } from "@prisma/client";

const commentWithUser = Prisma.validator<Prisma.CommentArgs>()({
    include: {
        user: {
            select: {
                name: true,
                profileImage: true
            }
        }
    },
});

type CommentWithUser = Prisma.CommentGetPayload<typeof commentWithUser>

export type CommentUserReq = {
    id: number;
    name: string;
    image: string;
    comment: string;
    createdAt: Date;
}

export const parseToCommentUserReq = (comments: CommentWithUser[]) => {
    return comments.map(comment => {
        return {
            id: comment.id,
            name: comment.user?.name,
            image: comment.user?.profileImage,
            comment: comment.content,
            createdAt: comment.createdAt
        }
    }) as CommentUserReq[];
}