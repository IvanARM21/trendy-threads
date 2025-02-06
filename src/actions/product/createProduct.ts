// "use server";

// import { prisma } from "@/lib/prisma"
// import { ProductInput } from "@/interfaces/product.interface"

// export const createProduct = async (productData : ProductInput) => {
//     try {

//         const product = await prisma.product.findFirst({ where: { slug: productData.slug } });
//         if(product) {
//             throw new Error('Product with this slug already exists');
//         }
//         const productSaved = await prisma.product.create({
//             data: productData
//         });
//         if(!productSaved) {
//             throw new Error('Product could not be created');
//         }
//         return productSaved;
//     } catch (error) {
//         if(error instanceof Error) {
//             throw error
//         }
//         throw new Error("An unexpected error ocurred");
//     }
// }