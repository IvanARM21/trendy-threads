import { CategoryInput } from "@/interfaces/category.interface";
import { prisma } from "@/lib/prisma";

export const updateCategory = async (id: string, categoryData: CategoryInput) => {
    try {
        const category = await prisma.category.findFirst({ where: { id } });
        if(!category) {
            throw new Error('Category not found');
        }
        const categorySlug = await prisma.category.findFirst({ where: { slug: categoryData.slug } });
        if(categorySlug && categorySlug.slug === categoryData.slug && categorySlug.id !== id) {
            throw new Error('Category with this slug already exists');
        }
        const updatedCategory = await prisma.category.update({ where: { id }, data: categoryData });
        return updatedCategory;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }
}