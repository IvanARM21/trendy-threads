"use server"

import { prisma } from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            where: { state: "ACTIVE", slug },
            select: {
                id: true,
                name: true,
                price: true,
                slug: true,
                category: true,
                description: true,
                gender: true,
                state: true,
                sizes: {
                    select: {
                        id: true,
                        sizeId: true,
                        size: true,
                        stock: true,
                    }
                },
                images: true,
            }
        })
        return product;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}