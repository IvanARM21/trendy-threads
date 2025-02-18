"use server";

import { prisma } from "@/lib/prisma";

export const getProductByQuery = async (query : string) => {
    try {
        const products = await prisma.product.findMany({ where: { 
            name: {
                contains: query.trim(),
                mode: "insensitive"
            },
            state: "ACTIVE"
        },
        include: {
            images: {
                take:1,
                select: {
                    url: true
                }
            },
            sizes: {
                select: {
                    size: true
                }
            }
        },
        });

        return products;
    } catch (error) {
        console.log(error); 
        throw new Error("An unexpected error has ocurred")
    }
}

export const getProductDetails = async (id: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                sizes: {
                    include: {
                        size: true
                    }
                },
                category: true
            }
        });
        return product;
    } catch (error) {
        console.log(error); 
        throw new Error("An unexpected error has ocurred");
    }
}