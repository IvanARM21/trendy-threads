"use server";

import bcryptjs from "bcryptjs"
import { prisma } from "@/lib/prisma";
import { ChangePassword } from "@/interfaces/user.interface";

export const changePassword = async ({ userId, currentPassword, newPassword} : ChangePassword) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }});

        // Check if user exists
        if(!user) {
            throw new Error("User not found");
        }

        // Check if the user has password (should have, but exceptions)
        if(!user.password?.length) {
            throw new Error("You not can change password, you must create one");
        }
        // Compare password
        const matchingPasswords = bcryptjs.compareSync(currentPassword, user.password);
        if(!matchingPasswords) {
            throw new Error("The current password is invalid");
        }

        // Hash new password
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        
        // Update password user
        const userSaved = await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword }, omit: { emailVerified: true }});
        
        const { password, ...rest } = userSaved;
        const hasPassword = (password?.length ?? 0) > 0;
        const userData = { ...rest, hasPassword };

        return { user: userData, error: false, message: "Your password are updated successfully" };
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
} 