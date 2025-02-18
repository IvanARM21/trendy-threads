"use server";

import { prisma } from "@/lib/prisma";

export const checkIfUserHasPassword = async (userId : string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if(!user) {
            throw new Error("User not found");
        }
        const userHasPassword = (user.password?.length ?? 0) > 0;
        return userHasPassword;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}