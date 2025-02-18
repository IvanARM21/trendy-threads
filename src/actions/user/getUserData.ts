"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getUserData = async () => {
    try {
        const session = await auth();
        if(!session?.user.id) {
            throw new Error("You need to be authenticated");
        }
        const user = await prisma.user.findUnique({ where: { id: session.user.id }, omit: { emailVerified: true }});
        if(!user) {
            throw new Error("User not found");
        }
        const { password, ...rest } = user;
        const hasPassword = (password?.length ?? 0) > 0;
        const userData = { ...rest, hasPassword };
        return { user: userData };
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}