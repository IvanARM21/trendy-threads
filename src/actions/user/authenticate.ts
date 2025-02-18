"use server";

import { prisma } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { Authenticate } from "@/interfaces/user.interface";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const authenticateUser = async(auth : Authenticate) => {
    try {
        const { email, password } = auth;

        const user = await prisma.user.findUnique({ where: { email } });
       
        if(!user) {
            throw new Error('User not found');
        }

        if(!user.password) {
            throw new Error('Try with Google Sign In');
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('Invalid password');
        }

        return user;
    } catch (error) {
        if(error instanceof Error) {
            throw error
        }
        throw new Error("An unexpected error ocurred");
    }
}

export const authenticate = async (formData: Authenticate) => {
    try {
        await signIn("credentials", { ...formData, redirect: false });

        return { message: "You're successfully authenticated", error: false };
    } catch (error) {
        if(error instanceof AuthError) {
            return { error: true, message: error.cause?.err?.message || "An unexpected error ocurred"};
        }
        return { error: true, message: "An unexpected error ocurred" }
    }
}