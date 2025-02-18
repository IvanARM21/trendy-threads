"use server";

import { prisma } from "@/lib/prisma";


export const getOrdersByUserId = async (userId : string) => {
    try {
        if(!userId) throw new Error("The user id is required");

        const orders = await prisma.order.findMany({ 
            where: { userId },
            include: {
                address: true,
                orderProducts: {
                    select: {
                        id: true,
                        product: {
                            select: {
                                images: { 
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                },
                                id: true,
                                name: true,
                            }
                        },
                        size: {
                            select: {
                                label: true
                            }
                        },
                        price: true,
                        quantity: true
                    },
                }
            }
        });

        return orders;
    } catch (error) {
        throw error;
    }
}