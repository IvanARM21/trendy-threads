"use server";

import { prisma } from "@/lib/prisma";
import { checkIfIsAdmin } from "../checkIfIsAdmin";
import { z } from "zod";
import { uploadImages } from "../images/createImage";
import { deleteImages } from "../images/deleteImages";

const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    description: z.string(),
    isHighlighted: z.boolean(),
    gender: z.enum(["MEN", "WOMEN"]),
    categoryId: z.string(),
    state: z.enum(["DRAFT", "ACTIVE", "OUT_OF_STOCK", "DISCONTINUED", "DELETED", "ARCHIVED"]),
    sizes: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
            order: z.number(),
            stock: z.number()
        })
    )
});

export const updateProduct = async (formData: FormData) => { 
    try {
        await checkIfIsAdmin();
        const files = formData.getAll("files[]").filter((value): value is File => value instanceof File);
        const imagesDelete = formData.get("imagesDelete");
        console.log(imagesDelete)

        const imagesToDeleteParsed = JSON.parse(imagesDelete as string);
        const data = formData.get("data");
        if(!data) throw new Error("The data not received");

        const dataParsed = JSON.parse(data as string);
        const product = productSchema.parse(dataParsed);

        const { sizes, ...productData} = product;

        const productBySlug = await prisma.product.findFirst({ where: { slug: product.slug }});

        if(productBySlug && productBySlug.id !== productData.id) {
            throw new Error("A product with that slug already exists.");
        }

        const imagesURLs = await uploadImages(files);

        console.log("imagesURLs", imagesURLs)
        if(!imagesURLs && files.length) {
            throw new Error("Error trying create images");
        }

        // Update product
        await prisma.product.update({ where: { id: product.id}, data: productData });
        
        await deleteImages(imagesToDeleteParsed);

        const productSize = sizes.map(({id, stock}) => ({ productId: product.id, sizeId: id, stock: stock }));
        const productImages = imagesURLs?.map(imageURL => ({ productId: product.id, url: imageURL }));

        await Promise.all([
            prisma.productSize.deleteMany({ where: { productId: product.id }}),
            prisma.productSize.createMany({ data: productSize }),
            prisma.productImage.createMany({ data: productImages ?? [] })
        ])

        return { error: false, message: "Product is updated successfully"};
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error ocurred");
    }

}
