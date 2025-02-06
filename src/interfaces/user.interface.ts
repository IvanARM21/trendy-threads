import { Order } from "./order.interface";

export interface Authenticate {
    email: string;
    password: string;
}

export interface Register {
    name: string;
    email: string;
    password: string;
    password2: string;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: "USER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;

    addresses?: UserAddress[];
    orders?: Order[];
}

export interface UserAddress {
    id: string;
    userId: string;
    apartment: string;
    address: string;
    zip: string;
    city: string;
    department: string;
    country: string;
    instructions: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAddressInput {
    userId: string;
    apartment: string;
    address: string;
    zip: string;
    city: string;
    department: string;
    country: string;
    instructions: string;
    phone: string;
}