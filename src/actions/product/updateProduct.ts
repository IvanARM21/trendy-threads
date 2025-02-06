// "use server";

// import { prisma } from "@/lib/prisma";
// import { ProductInput } from "@/interfaces/product.interface";

// export const updateProduct = async (id: string, productData: ProductInput) => { 
//     try {
//         const product = await prisma.product.findFirst({ where: { id } });
//         if(!product) {
//             throw new Error('Product not found');
//         }
//         const productSlug = await prisma.product.findFirst({ where: { slug: productData.slug } });
//         if(productSlug && productSlug.slug === productData.slug && productSlug.id !== id) {
//             throw new Error('Product with this slug already exists');
//         }
//         const updatedProduct = await prisma.product.update({ where: { id }, data: productData });
//         return updatedProduct;
//     } catch (error) {
//         if(error instanceof Error) {
//             throw error;
//         }
//         throw new Error("An unexpected error ocurred");
//     }

// }
