import { prisma } from "@/lib/prisma"

export const deleteCategory = async (id: string) => {
    try {
        const category = await prisma.category.findFirst({ where: { id }});
        if(!category) {
            throw new Error('Category not found');
        }

        // Delete products
        await prisma.product.deleteMany({ where: { categoryId: id } });

        // Delete category
        await prisma.category.delete({ where: { id }});

        return { ok: true, message: "The category was succcessfully deleted"}
    } catch (error) {
        throw error;
    }
}