"use client";

import { SizeSelect } from "./SizeSelect";
import { QuantityInput } from "@/components/product/QuantityInput";
import { Product } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart";
import { twMerge } from "tailwind-merge";

interface Props {
  product: Product;
}

export const AddToCartForm = ({ product }: Props) => {
  const { quantity, sizeSelect, addProductCart } = useCartStore();

  const condition = +quantity < 0 || isNaN(+quantity) || !sizeSelect;

  const sizesOrdered = product.sizes.sort(
    (a, b) => (a.size?.order ?? 0) - (b.size?.order ?? 0)
  );

  return (
    <form>
      <div className="flex flex-col gap-2 mt-6">
        <label
          htmlFor="size"
          className="text-lg sm:text-xl font-medium text-zinc-700"
        >
          Size
        </label>
        <div className="flex flex-wrap gap-2">
          {sizesOrdered.map((size) => (
            <SizeSelect size={size} key={size.sizeId} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <label
          htmlFor="quantity"
          className="text-lg sm:text-xl font-medium text-zinc-700"
        >
          Quantity
        </label>
        <QuantityInput />
      </div>

      <button
        className={twMerge(
          "mt-6 py-3 px-6 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 w-full justify-center",
          condition && "bg-zinc-200 text-zinc-800 hover:bg-zinc-200"
        )}
        disabled={condition}
        type="button"
        onClick={() => {
          if (sizeSelect) {
            addProductCart({
              id: product.id ?? "",
              image: product.images[0] ?? "",
              name: product.name,
              slug: product.slug,
              gender: product.gender,
              price: product.price,
              quantity: +quantity,
              size: sizeSelect,
            });
          }
        }}
      >
        {condition ? "Fill out the data" : "Add to cart"}
      </button>
    </form>
  );
};
