import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const uploadImages = async (files: File[]) => {
    try {
      const buffers = await optimizeImages(files); // Ahora devuelve un array de Buffers
  
      if (!buffers) return null;
  
      // Upload each image to cloudinary
      const uploadPromises: Promise<string>[] = buffers.map((buffer) =>
        new Promise<string>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", format: "webp" },
            (err, res) => {
              if (err) return reject(err);
              resolve(res?.secure_url ?? "");
            }
          ).end(buffer);
        })
      );
  
      // Wait for all images to upload
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      if(error instanceof Error) {
        throw error;
      }
      console.error("Error en uploadImages:", error);
      throw new Error("Error trying to upload images");
    }
  };

const optimizeImages = async (files: File[]) => {
  if (files.length) {
      const buffers = await Promise.all(
        files.map(async file => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = await sharp(arrayBuffer).resize(1000, null).toFormat("webp", { quality: 90 }).toBuffer();
        return buffer;
        })
      );
      return buffers;
  }
  return null;
};
