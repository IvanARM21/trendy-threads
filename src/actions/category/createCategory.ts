import { CategoryInput } from "@/interfaces/category.interface";
import { prisma } from "@/lib/prisma";

export const createCategory = async (categoryData : CategoryInput) => {
    try {
        const category = await prisma.category.findFirst({ where: { slug: categoryData.slug } });
        if(category) {
            throw new Error('Category with this slug already exists');
        }
        await prisma.category.create({
            data: categoryData
        });
        return category;
    } catch (error) {
        if(error instanceof Error) {
            throw error
        }
        throw new Error("An unexpected error ocurred");
    }
}