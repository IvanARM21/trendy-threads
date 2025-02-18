"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma"
import { uploadImages } from "../images/createImage";
import { checkIfIsAdmin } from "../checkIfIsAdmin";

const productSchema = z.object({
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

export const createProduct = async (formData : FormData) => {
    try {
        await checkIfIsAdmin();

        const files = formData.getAll("files[]").filter((value): value is File => value instanceof File);
        const data = formData.get("data");
        if(!data) throw new Error("The data not received");
        const dataParsed = JSON.parse(data as string);
        const product = productSchema.parse(dataParsed);

        const slugIsAvailable = await prisma.product.findFirst({ where: { slug: product.slug }});

        if(slugIsAvailable) {
            throw new Error("The product with that slug is already exists")
        }

        // Call Create Image and Get ImageURL
        const imagesURLs = await uploadImages(files);

        if(!imagesURLs && files.length) {
            throw new Error("Error trying create images");
        }

        // Create Product
        const { sizes, ...productData } = product;
        const productCreated = await prisma.product.create({ data: productData });

        console.log("Images URLs", imagesURLs)

        const productSize = sizes.map(({id, stock}) => ({ productId: productCreated.id, sizeId: id, stock: stock }));
        const productImages = imagesURLs?.map(imageURL => ({ productId: productCreated.id, url: imageURL }));

        // Create Product Image and Sizes
        await Promise.all([
            prisma.productSize.createMany({ data: productSize }),
            prisma.productImage.createMany({ data: productImages ?? [] })
        ]);

        revalidatePath("/dashboard/products");
        return { error: false, message: "Product is created successfully"};
    } catch (error) {
        if(error instanceof Error) {
            console.log(error);
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}