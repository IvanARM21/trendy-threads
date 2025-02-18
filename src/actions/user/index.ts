"use server";

import { prisma } from "@/lib/prisma";
import { CreateUser, UpdateUser } from "@/interfaces/user.interface";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import * as bcryptjs from 'bcryptjs';

export const newUserCreate = async (user : CreateUser) => {
    try {
        const session = await auth();
        if(session && session?.user.role === "USER") {
            throw new Error("You are not allowed to perform that action");
        }
        const userExists = await prisma.user.findUnique({
            where: { email: user.email }
        });
        if(userExists) {
            throw new Error("That email already exits")
        }

        const hashedPass = bcryptjs.hashSync(user.password, 10);

        await prisma.user.create({ data: { ...user, password: hashedPass }});
        revalidatePath("/dashboard/users");
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}

export const getUserById = async (id: string) => {
    try {
        const session = await auth();
        if(session && session?.user.role === "USER") {
            throw new Error("You are not allowed to perform that action");
        }

        const user = await prisma.user.findUnique({ 
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true
            }
        });

        if(!user) {
            throw new Error("User not found");
        }
        const userData = { ...user, password: null };
        return userData;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}

export const updateUser = async (user : UpdateUser) => {
    try {
        const session = await auth();
        if(session && session?.user.role === "USER") {
            throw new Error("You are not allowed to perform that action");
        }
        const userExists = await prisma.user.findUnique({
            where: { email: user.email }
        });
        if(userExists && user.id !== userExists.id) {
            throw new Error("That email already exits")
        }

        if(user.password) {
            const hashedPass = bcryptjs.hashSync(user.password, 10);
            await prisma.user.update({ where: { id: user.id }, data: { ...user, password: hashedPass  }});
        }
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        await prisma.user.update({ where: { id: user.id }, data: { ...rest }});

        revalidatePath("/dashboard/users");
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}
