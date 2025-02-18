"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const checkIfUserHasDiscount = async () => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        if(!userId) {
            throw new Error("You need provide us your user id");
        }
        const orders = await prisma.order.findFirst({
            where: { userId }
        });
        return orders === null;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }    
}