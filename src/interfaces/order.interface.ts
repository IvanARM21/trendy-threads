import { ProductSize } from "./product.interface";
import { UserAddress } from "./user.interface";

type OrderPaymentStatus = "ERROR" | "AWAITING_PAYMENT" | "PENDING" | "PAYED" | "REJECTED" | "CANCELLED" | "IN_PROCESS" | "REFUNDED" | "CHARGED_BACK" | "UNKNOWN";
type FulfillmentStatus = "RECEIVED" | "CONFIRMED" | "PROCESSING" | "TO_SHIP" | "SHIPPED" | "DELIVERED" | "READY_FOR_PICKUP" | "PICKED_UP" | "FAILED_DELIVERY" | "RETURNED";

export type Order = {
    id: string;
    userId: string;
    addressId: string;
    paymentId: string;
    paymentStatus: OrderPaymentStatus;
    fulfillmentStatus: FulfillmentStatus;
    tax: number;
    discount: number
    subtotal: number;
    shipping: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    address?: UserAddress;
}



export interface GetOrderForEdit {
    id: string;
    tax: number;
    subtotal: number;
    shipping: number;
    total: number;
    discount: number;
    paymentStatus: OrderPaymentStatus;
    fulfillmentStatus: FulfillmentStatus;
    orderProducts: {
        price: number;
        quantity: number;
        product: {
            id: string;
            name: string;
            images: { url: string }[]
        }
        size?: {
            label: string;
        } | null
    }[]
    addressId: string;
    address: UserAddress;
  }

export type ProfileOrder = Order & {
    orderProducts: {
        id: string;
        product: {
            images: {
                url: string;
            }[];
            id: string;
            name: string;
        }
        size?: {
            label: string;
        } | null;
        price: number;
        quantity: number;
    }[]
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