
"use server";

import { prisma } from "@/lib/prisma"

export const getProductsByLimit = async (page : number, pageSize : number | undefined = 24) => {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const totalProducts = await prisma.product.count({ where: { state: "ACTIVE" } });
        const totalPages = Math.ceil(totalProducts / pageSize);

        const products = await prisma.product.findMany({
            skip,
            take,
            where: { state: "ACTIVE" },
        })

        return { products, totalPages, totalProducts, currentPage: page }
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}