"use server";

import bcryptjs from 'bcryptjs';
import { prisma } from "@/lib/prisma";
import { CreatePassword } from "@/interfaces/user.interface";

export const createPassword = async ({ userId, newPassword } : CreatePassword) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }});

        // Check if user exists
        if(!user) {
            throw new Error("User not found");
        }

        // Hash password
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        // Update user
        const userSaved = await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword }, omit: { emailVerified: true }});
        const { password, ...rest } = userSaved;
        const hasPassword = (password?.length ?? 0) > 0;
        const userData = { ...rest, hasPassword };

        console.log(userData);

        return { user: userData, error: false, message: "Your password are created successfully" };
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}