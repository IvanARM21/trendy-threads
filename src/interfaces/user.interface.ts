import { Order } from "./order.interface";

type UserRole = "USER" | "ADMIN";

export interface Authenticate {
    email: string;
    password: string;
}

export interface CreateUser {
    name: string;
    email: string;
    phone: string | null;
    password: string;
    role: UserRole;
}
export interface UpdateUser {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    password: string | null;
    role: UserRole;
}

export interface Register {
    name: string;
    email: string;
    password: string;
    password2: string;
}

export interface ChangePassword {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

export interface CreatePassword {
    userId: string;
    newPassword: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image?: string | null;
    password?: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;

    addresses?: UserAddress[];
    orders?: Order[];
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
    role: UserRole;
    hasPassword: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserAddress {
    id: string;
    phone: string;
    userId: string;
    apartment: string;
    address: string;
    zip: string;
    city: string;
    department: string;
    country: string;
    instructions: string;
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