"use server";

import { PRODUCT_STATES } from "@/constants";
import { ProductState } from "@/interfaces/product.interface";
import { prisma } from "@/lib/prisma";

export const changeStateProduct = async (id: string, newState : ProductState) => {
    try {
        if(!PRODUCT_STATES.includes(newState)) {
            throw new Error(`Invalid state ${newState}`);
        }
        const product = await prisma.product.update({ where: { id }, data: {
            state: newState
        }})
        if(!product) {
            throw new Error('Product could not be deleted');
        }
        return product;
    } catch (error) {
        if(error instanceof Error) {
            throw error
        }
        throw new Error("An unexpected error ocurred");
    }
}