"use server";

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";

export const addPhone = async (phone: string) => {
    try {
        const session = await auth()
        if(!session?.user.id) {
            throw new Error("You need to be authenticated");
        }
        const user = await prisma.user.update({ where: { id: session.user.id }, data: { phone }, omit: { emailVerified: true }});
        const { password, ...rest } = user;
        const hasPassword = (password?.length ?? 0) > 0;
        const userData = { ...rest, hasPassword };
        return { user: userData, error: false, message: "Phone saved successfully"};
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}