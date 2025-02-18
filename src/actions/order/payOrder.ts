"use server";

import { createPayment } from "@/lib/mercadopago";
import { prisma } from "@/lib/prisma";
import { ProductItem } from "./createOrder";
import { Size } from "@/interfaces/product.interface";

export const payOrder = async (orderId : string) => {
    try {
        const order = await prisma.order.findUnique({ 
            where: { id: orderId },
            include: {
                orderProducts: {
                    select: {
                        product: {
                            select: { name: true, images: { take: 1, select: { url: true }} }
                        },
                        size: true,
                        productId: true,
                        price: true,
                        quantity: true,
                    }
                }
            }
        });
        if(!order) {
            throw new Error("Order not found");
        }

        const productsList : ProductItem[]  = order.orderProducts.map(item => {
           
            return {
                id: item.productId,
                name: item.product.name,
                price: item.price,
                quantity: item.quantity,
                image: item.product.images[0].url,
                size: item.size ? {
                    sizeId: item?.size.id ?? "",
                    size: item.size as Size,
                    stock: 0,
                    order: item?.size.order ?? ""
                } : null
            }
        });

        const url = await createPayment(productsList, order.id, order.tax, order.shipping, order.discount);

        return { url, error: false }

    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}