import { Order } from "@/interfaces/order.interface";
import { FulfillmentStatus } from "@prisma/client";

export const emailPattern = () => /^\S+@\S+$/i;

export const getFormState = (type: "error" | "loading" | "success" | "initial", message : string | undefined = "") => {
    switch(type) {
        case "error": return { isError: true, isSuccess: false, message, isLoading: false }
        case "loading": return { isError: false, isSuccess: false, message, isLoading: true }
        case "success": return { isError: false, isSuccess: true, message, isLoading: false }
        default: return { isError: false, isSuccess: false, message: "", isLoading: false,}
    }
}

export const formattCurrency = (currency: number) => Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
}).format(currency)

export const getTaxPrice = (amount : number) => amount*.21;
export const getShippingPrice = () => 150;
export const 
calculateDiscount = (amount : number, discount : number) => amount-(amount*discount);

export const formattDate = (date : Date) => new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
})

type OrderStatusColor = "green" | "red" | "orange" | "blue" | "purple" | "pink" | "gray" | "yellow";

export const getOrderColorAndText = (status: Order["paymentStatus"]): {
    color: OrderStatusColor, text: string
} => {
    switch (status) {
    case "AWAITING_PAYMENT": 
        return { color: "yellow", text: "Awaiting payment"}
    case "PAYED":
        return { color: "green", text: "Payed" };
    case "CANCELLED":
        return { color: "red", text: "Cancelled" };
    case "PENDING":
        return { color: "orange", text: "Pending" };
    case "REJECTED":
        return { color: "red", text: "Rejected" };
    case "IN_PROCESS":
        return { color: "blue", text: "In process" };
    case "REFUNDED":
        return { color: "purple", text: "Refunded" };
    case "CHARGED_BACK":
        return { color: "pink", text: "Charged back" };
    case "ERROR":
        return { color: "red", text: "Error" };
    case "UNKNOWN":
        return { color: "gray", text: "Unknown" };
    default:
        return { color: "gray", text: "Not defined" };
    }
}

export const getFulfillmentColorAndText = (status: FulfillmentStatus): {
    color: OrderStatusColor, text: string
} => {
    switch (status) {
        case "RECEIVED":
            return { color: "gray", text: "Received" };
        case "CONFIRMED":
            return { color: "blue", text: "Confirmed" };
        case "PROCESSING":
            return { color: "yellow", text: "Processing" };
        case "TO_SHIP":
            return { color: "purple", text: "To Ship" };
        case "SHIPPED":
            return { color: "blue", text: "Shipped" };
        case "DELIVERED":
            return { color: "green", text: "Delivered" };
        case "READY_FOR_PICKUP":
            return { color: "purple", text: "Ready for Pickup" };
        case "PICKED_UP":
            return { color: "green", text: "Picked Up" };
        case "FAILED_DELIVERY":
            return { color: "red", text: "Failed Delivery" };
        case "RETURNED":
            return { color: "pink", text: "Returned" };
        default:
            return { color: "gray", text: "Not defined" };
    }
};

