import { Prisma } from "@prisma/client"

const postWiCounts = Prisma.validator<Prisma.PostArgs>()({
    include: {
        _count: {
            select:
            {
                comments: true
            }
        },
        user: {
            select: {
                name: true,
                profileImage: true
            }
        }
    },
})

export type PostWithComments = Prisma.PostGetPayload<typeof postWiCounts>

export type PostCardReq = {
    id: number;
    userId: number;
    userImage: string;
    userName: string;
    createdAt: Date;
    title: string;
    content: string;
    comments: number;
}

export const toPostCardReq = (posts: PostWithComments[]) => {
    return posts.map(post => {
        return {
            id: post.id,
            userId: post.userId,
            userImage: post.user?.profileImage,
            userName: post.user?.name,
            createdAt: post.createdAt,
            title: post.title,
            content: post.content,
            comments: post._count.comments
        }
    }) as PostCardReq[]
}