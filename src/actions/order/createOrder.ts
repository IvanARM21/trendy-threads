"use server";

import { prisma } from "@/lib/prisma";
import { OrderProduct } from "@/interfaces/order.interface";
import { UserAddress } from "@/interfaces/user.interface";
import { getShippingPrice, getTaxPrice, calculateDiscount } from "@/utils";
import { createPayment } from "@/lib/mercadopago";
import { ProductSize } from "@/interfaces/product.interface";

export interface ProductItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: ProductSize;
}

export const createOrder = async (userId: string | undefined, orderItems : OrderProduct[], addressId : UserAddress["id"]) => {

    try {
        // 1. Check if user exists
        if(!userId) {
            throw new Error("You should authenticated");
        }
        const user = await prisma.user.findFirst({ where: { id: userId }});
        if(!user) {
            throw new Error("User not found");
        }

        // Start transaction
        const paymentUrl = await prisma.$transaction(async (prisma) => {

            // 2. Check if products exists
            const products = await checkProductsExists(orderItems);

            // 2. Check and reduce stock
            await reduceStock(products);

            // 3. Calculate total amout
            const { tax, subtotal, shipping, total, discount } = await getAmounts(orderItems, userId);
            // 4. Create order
            const orderCreated = await prisma.order.create({
                data: { tax, subtotal, shipping, total, discount, addressId, status: "PENDING", userId: user.id }
            });

            // 5. Create order products
            const orderItemsFormatted = products.map(({ id, size, quantity, price }) => ({ 
                orderId: orderCreated.id,
                productId: id,
                sizeId: size.size?.id ?? "",
                quantity: quantity, price 
            }));
            await prisma.orderProduct.createMany({ data: orderItemsFormatted });

            // 6. Payment order
            const url = await createPayment(products, orderCreated.id);
            return url;
        });
        
        return { url: paymentUrl, error: false, message: "Order are created successfully" }
    } catch (error) {
        if(error instanceof Error) {
            throw error.message
        }
        throw new Error("An unexpected error ocurred");
    }
}

const checkProductsExists = async (orderItems: OrderProduct[]) => {
    const productsList : ProductItem[] = [];
    for(const item of orderItems) {
        // 1. Get product
        const product = await prisma.product.findFirst({
            where: { id: item.productId },
            include: {
                images: { take: 1 }
            }
        });
        if(!product) {
            throw new Error(`Product not found ${item.name}`);
        }
        const productItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: item.quantity,
            image: product.images[0].url,
            size: item.size
        }
        productsList.push(productItem);
    }
    return productsList;
}

const getAmounts = async (orderItems : OrderProduct[], userId : string) => {
    let subtotal = 0;
    const orderedItems : OrderProduct[] = [];
    for(const item of orderItems) {
        // 1. Get product
        const product = await prisma.product.findFirst({
            where: { id: item.productId }
        });
        if(!product) {
            throw new Error(`Product not found ${item.name}`);
        }
        subtotal+=calculateDiscount(product?.price, 0);
        orderedItems.push({name: product.name, productId: product.id, quantity: item.quantity, size: item.size, price: product?.price })
    }

    let discountPercentage = 0;

    // Check if the first buy
    const orders = await prisma.order.findFirst({ where: { userId }});
    if(!orders) {
        discountPercentage = .1;
    }

    const tax = getTaxPrice(subtotal);
    const shipping = getShippingPrice();
    const discount = calculateDiscount(subtotal, discountPercentage);

    const total = discount + shipping + tax;
    return { tax, subtotal, shipping, total, discount, orderedItems };
}

const reduceStock = async (orderItems : ProductItem[]) => {
    for(const item of orderItems) {
        // 1. Check if we have enough stock
        const productSize = await prisma.productSize.findFirst({
            where: { id: item.size.id }
        });
        
        if(!productSize) {
            throw new Error(`Size not found of product ${item.name} - ${item.size.size?.label}`);
        }
        if(productSize.stock < item.quantity) {
            throw new Error(`Not enough stock for ${item.name} - ${item.size.size?.label}`);
        }
        
        // 2. Reduce stock
        await prisma.productSize.update({
            where: { id: item.size.id },
            data: { stock: { decrement: item.quantity } },
        });

    }
}

// const createOrderProducts = async (orderItems : ProductItem[], orderId : string) => {
    
// }