import { ProductSize } from "./product.interface";

type OrderStatus = "ERROR" | "PENDING" | "PAYED";

export interface Order {
    id: string;
    userId: string;
    addressId: string;
    status: OrderStatus;
    tax: number;
    subtotal: number;
    shipping: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderInput {
    userId: string;
    tax: number;
    subtotal: number;
    shipping: number;
    total: number;
}

export interface OrderProduct {
    name: string;
    productId: string;
    quantity: number;
    size: ProductSize;
    price: number;
}