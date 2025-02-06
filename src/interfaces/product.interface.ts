import { Category } from "./category.interface";

export type ProductState = "DRAFT" | "ACTIVE" | "OUT_OF_STOCK" | "DISCONTINUED" | "DELETED" | "ARCHIVED"
export type Gender = "MEN" | "WOMEN";

export interface Product {
    id?: string;
    name: string;
    price: number;
    slug: string;

    categoryId?: string;
    category: Category;

    description: string;
    isHighlighted?: boolean;
    gender: Gender;

    createdAt?: Date;
    updatedAt?: Date;

    state: ProductState;
    sizes: ProductSize[];
    images: ProductImage[];
}

export interface ProductInput {
    id?: string;
    name: string;
    slug: string;
    price: number;
    gender: Gender;
    categoryId: string;
    description: string;
    isHighlighted: boolean;
    state: ProductState;
    sizes: ProductSize[];
    images: ProductImage[];
}

export interface ProductImage {
    id?: string;
    productId: string;
    url: string;
}

export interface ProductSize {
    id?: string;
    productId?: string;
    sizeId: string;
    size?: Size;
    stock: number;
}

export interface Size {
    id: string;
    label: string;
}

export interface CartProduct {
    id: string;
    name: string;
    slug: string;
    price: number;
    gender: Gender;
    image: ProductImage;
    size: ProductSize;
    quantity: number;
}