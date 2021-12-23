import { Prisma } from "@prisma/client";

const productWithImages = Prisma.validator<Prisma.ProductArgs>()({
    include: { images: true },
})

export type ProductWithImages = Prisma.ProductGetPayload<typeof productWithImages>