import { Gender } from "./product.interface";

export interface Category {
    id: string;
    name: string;
    slug: string;
    gender: Gender;
    image: string | null;
    createdAt?: Date;
    updatedAt?: Date;   
}

export interface CategoryInput {
    name: string;
    slug: string;
    gender: Gender;
    image: string;
    description: string;
}