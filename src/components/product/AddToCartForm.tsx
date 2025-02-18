"use client";

import { QuantityInput } from "@/components/product/QuantityInput";
import { Product, ProductSize } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart";
import { twMerge } from "tailwind-merge";
import { SizeSelect } from "./SizeSelect";

interface Props {
  product: Product;
}

const getCondition = (
  isAccessory: boolean,
  sizeSelected: ProductSize | null,
  quantity: string
) => {
  if (isAccessory) return false;

  if (sizeSelected?.id) {
    const condition = +quantity < 0 || isNaN(+quantity) || !sizeSelected;
    return condition;
  }
  return true;
};

export const AddToCartForm = ({ product }: Props) => {
  const { quantity, addProductCart, sizeSelect } = useCartStore();

  const isAccessory = product.category.name === "Accessories";
  const condition = getCondition(isAccessory, sizeSelect, quantity);

  const sizesOrdered = product.sizes.sort(
    (a, b) => (a.size?.order ?? 0) - (b.size?.order ?? 0)
  );

  return (
    <form>
      {!isAccessory ? (
        <>
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
        </>
      ) : (
        <></>
      )}

      <div className="flex flex-col gap-2 mt-6">
        <label
          htmlFor="quantity"
          className="text-lg sm:text-xl font-medium text-zinc-700"
        >
          Quantity
        </label>
        <QuantityInput condition={condition} />
      </div>

      <button
        className={twMerge(
          "mt-6 py-3 px-6 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 w-full justify-center",
          condition && "bg-zinc-200 text-zinc-800 hover:bg-zinc-200"
        )}
        type="button"
        onClick={() => {
          addProductCart({
            id: product.id ?? "",
            image: product.images[0] ?? "",
            name: product.name,
            slug: product.slug,
            gender: product.gender,
            price: product.price,
            quantity: +quantity,
            size: sizeSelect?.id ? sizeSelect : null,
          });
        }}
      >
        {condition ? "Fill out the data" : "Add to cart"}
      </button>
    </form>
  );
};
