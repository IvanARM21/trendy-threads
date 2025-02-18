"use server";

import { PRODUCT_STATES } from "@/constants";
import { ProductState } from "@/interfaces/product.interface";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeStateProduct = async (id: string, newState : ProductState) => {
    try {
        if(!PRODUCT_STATES.includes(newState)) {
            throw new Error(`Invalid state ${newState}`);
        }
        const product = await prisma.product.findUnique({ where: { id }});
        if(!product) {
            throw new Error("Product not found");
        }
        await prisma.product.update({ where: { id }, data: {
            state: newState
        }});

        revalidatePath("/dashboard/products");
        return {
            ...product,
            message: "Product state updated successfully"
        };
    } catch (error) {
        if(error instanceof Error) {
            throw error
        }
        throw new Error("An unexpected error ocurred");
    }
}

export const changeHighlighted = async (id: string, state: boolean) => {
    try {
        const product = await prisma.product.findFirst({ where: { id }});
        if(!product) {
            throw new Error("Product not found");
        }
        await prisma.product.update({ where: { id }, data: { isHighlighted: state }});

        return { ok: true };
    } catch (error) {
        if(error instanceof Error) {
            throw error
        }
        throw new Error("An unexpected error ocurred");
    }
}