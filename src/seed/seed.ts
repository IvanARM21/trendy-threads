import * as bcryptjs from 'bcryptjs';
import { prisma } from "../lib/prisma";
import { userAddresses, users } from "./users";
import { sizes } from "./sizes";
import { products } from "./products";
import { accessories } from "./accesories";
import { categories } from "./categories";

async function main() {
    // Delete orders
    await prisma.orderProduct.deleteMany({});
    await prisma.order.deleteMany({});
    
    // User and users address delete
    await prisma.userAddress.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.productSize.deleteMany({});
    await prisma.productImage.deleteMany({});
    await prisma.size.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    // Hash users password
    const usersHashedPass = users.map(user => {
        const hashedPass = bcryptjs.hashSync(user.password ?? "123456", 10);
        user.password = hashedPass;
        return user;
    });
    
    // User and users address create
    await prisma.user.createMany({ data: usersHashedPass });
    await prisma.userAddress.createMany({ data: userAddresses });

    // Sizes
    await prisma.size.createMany({ data: sizes });

    // Categories
    await prisma.category.createMany({ data: categories });

    // Products
    const productsWithoutImageAndSize = products.map(({ id, name, price, slug, categoryId, description, gender, isHighlighted, state }) => ({ id, name, price, slug, categoryId, description, gender, isHighlighted, state }))
    await prisma.product.createMany({ data: productsWithoutImageAndSize });

    // Products Images
    const productImages = products.flatMap(p => p.images);
    await prisma.productImage.createMany({ data: productImages });

    // Product Sizes
    const productSizes = products.flatMap(p => p.sizes);
    await prisma.productSize.createMany({ data: productSizes });

    await Promise.all(
        accessories.map(async ({ images, ...productData }) => {
          const newProduct = await prisma.product.create({
            data: productData,
          });
      
          // Asociar imágenes con el ID generado
          const productImages = images.map(({ url }) => ({
            productId: newProduct.id,
            url,
          }));
      
          await prisma.productImage.createMany({ data: productImages });
      
          return newProduct;
        })
      );
      
    

    console.log("Executed seed successfully");
}

(async () => {
    main();
})();