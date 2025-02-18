import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const deleteImages = async (imageURLs: string[]) => {
    try {
        const deletePromises = imageURLs.map(async (imageURL) => {
            try {
                const publicId = getPublicId(imageURL);
                await cloudinary.uploader.destroy(publicId);
                await prisma.productImage.delete({ where: { url: imageURL }});
            } catch (error) {
                if(error instanceof Error) {
                    throw error;
                }
                throw new Error("Error to try delete image");
            }
        });

        const deletedImages = await Promise.all(deletePromises);
        return deletedImages;
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
};

const getPublicId = (imageURL: string) => {
    const urlParts = imageURL.split("/");
    const fileName = urlParts[urlParts.length - 1]; // Nombre del archivo con extensión
    return fileName.split(".")[0]; // Remover la extensión
};