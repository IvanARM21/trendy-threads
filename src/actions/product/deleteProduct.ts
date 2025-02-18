"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import * as bcryptjs from 'bcryptjs';
import { revalidatePath } from "next/cache";
import { deleteImages } from "../images/deleteImages";


export const deleteProductById = async (productId : string, password : string) => {
    try {
        const session = await auth();
        console.log(session)
        // Check if is authenticated
        if(!session) {
            throw new Error("You must be authenticated to do this action");
        }
        const user = await prisma.user.findFirst({ where: { id: session.user.id }});
        // Check if user exists
        if(!user) {
            throw new Error("User session not found");
        }
        // Check if user is admin
        if(user.role !== "ADMIN") {
            throw new Error("You're not allowed to make this action");
        }
        if(!user.password) {
            throw new Error("You need have a password to make this action");
        }
        // Check password
        const matchPass = await bcryptjs.compare(password, user.password);
        if(!matchPass) {
            throw new Error("Invalid password");
        }

        // Get and delete images from cloudinary
        const productImages = await prisma.productImage.findMany({ where: { productId }});
        const imagesURLs = productImages.map(image => image.url);
        await deleteImages(imagesURLs);

        // Delete product images and sizes
        await Promise.all([
            await prisma.productImage.deleteMany({ where: { productId }}),
            await prisma.productSize.deleteMany({ where: { productId }}),
        ]);

        // Delete product
        await prisma.product.delete({ where: { id: productId }});

        revalidatePath("/dashboard/products");

        return { message: "Product is deleted correctly", error: false };
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}