"use server";

import { prisma } from "@/lib/prisma";

export const getOrdersDashboard = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          });
          return orders;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}