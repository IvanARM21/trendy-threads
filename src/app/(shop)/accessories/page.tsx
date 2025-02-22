import { ProductImageHover } from "@/components/products/ProductImageHover";
import { prisma } from "@/lib/prisma";
import { formattCurrency } from "@/utils";

export default async function ProductsByGenderPage() {
  const products = await prisma.product.findMany({
    where: {
      state: "ACTIVE",
      category: {
        slug: "accessories",
      },
    },
    include: {
      images: {
        take: 2,
      },
    },
  });

  return (
    <section className="pt-14 pb-24">
      <div className="container">
        <div className="flex flex-col justify-between items-center w-full bg-gray-50">
          <div className="w-full">
            <h1 className="text-3xl text-left mb-10 md:text-4xl font-bold  text-zinc-800">
              Accessories
            </h1>
          </div>

          <ul className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <li key={product.id}>
                <a href={`/product/${product.slug}`}>
                  <ProductImageHover images={product.images} />
                  <div className="flex flex-col sm:gap-2 px-2 py-3">
                    <h2 className="text-lg sm:text-2xl font-semibold text-zinc-800">
                      {product.name}
                    </h2>
                    <p className="sm:text-xl font-medium text-zinc-600">
                      {formattCurrency(product.price)}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
