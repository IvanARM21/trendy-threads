"use server";

import { Register } from "@/interfaces/user.interface";
import { prisma } from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerUser = async (registerData : Register) => {
    try {
        const { email, name, password } = registerData;
        const userExists = await prisma.user.findFirst({ where: { email } });

        if(userExists) {
            throw new Error('User already exists');
        }
        
        // Hash pass
        const passHash = await bcryptjs.hash(password, 10);

        const user = await prisma.user.create({ data: { name, email, password: passHash,  }  });

        if(!user) {
            throw new Error('An error has ocurred while creating the user');
        }

        return { error: false, message: "You've successfully registered, now you can Sign In", user };
    } catch (error) {
        if(error instanceof Error) {
            throw error
        }
        throw new Error("An unexpected error ocurred");
    }
}