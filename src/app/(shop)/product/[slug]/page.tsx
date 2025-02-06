import { notFound } from "next/navigation";
import { ProductImagesSlide } from "@/components/product/ProductImagesSlide";
import { formattCurrency } from "@/utils";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ModalProduct } from "@/components/modals/ModalProduct";
import { getProductBySlug } from "@/actions/product/getProductBySlug";
import { GENDER_FORMATTED } from "@/constants";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductBySlugPage({ params }: Props) {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <section className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-8 container gap-8 lg:gap-20">
          <div className="lg:col-span-5">
            <ProductImagesSlide images={product.images} name={product.name} />
          </div>
          <div className="lg:col-span-3 sticky lg:h-[500px] top-24">
            <h1 className="text-zinc-800 font-bold text-2xl sm:text-4xl mb-4">
              {product?.name}
            </h1>
            <p className="text-xl font-medium text-zinc-700 mb-4">
              Gender: {GENDER_FORMATTED[product.gender].label}
            </p>
            <p className="text-xl sm:text-2xl font-medium text-zinc-700">
              {formattCurrency(product.price)}
            </p>

            <AddToCartForm product={product} />

            <div className="mt-6 flex flex-col gap-2">
              <p className="text-lg sm:text-xl font-medium text-zinc-700">
                Description
              </p>
              <p className="text-zinc-500 sm:text-lg">
                {product.description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi officiis minus aut voluptatibus mollitia? Omnis repellat accusantium quis perspiciatis eligendi excepturi repudiandae optio, asperiores id voluptas aperiam, earum maiores."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ModalProduct />
    </>
  );
}
