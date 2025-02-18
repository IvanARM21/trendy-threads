"use server";

import { prisma } from "@/lib/prisma";

export const getProductOrdersById = async (productId : string) => {
    try {
        const product = await prisma.product.findUnique({ where: { id: productId }});

        // Check if exists
        if(!product) {
            throw new Error("Product not found")
        }

        // Check if has orders
        const orders = await prisma.orderProduct.findMany({ where: { productId } });
        return orders;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}