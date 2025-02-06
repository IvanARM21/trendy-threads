"use client";

import { ProductSize } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart";
import { twMerge } from "tailwind-merge";

interface Props {
  size: ProductSize;
}

export const SizeSelect = ({ size }: Props) => {
  const { onSizeClick, sizeSelect } = useCartStore();

  console.log(sizeSelect?.sizeId);
  console.log(size.sizeId);
  return (
    <>
      <input type="radio" name="size" id={size.id} className="hidden" />
      <label
        onClick={() => {
          onSizeClick(size);
          console.log("Size", size);
        }}
        htmlFor={size.id}
        className={twMerge(
          "transition-colors relative overflow-hidden w-14 sm:w-16 h-10 sm:h-12 text-zinc-600 font-medium rounded-full border flex justify-center items-center hover:border-gray-400 hover:text-zinc-800 cursor-pointer",
          size.stock === 2 && "opacity-50",
          sizeSelect?.sizeId === size.sizeId && "border-gray-600 text-zinc-800"
        )}
      >
        {size?.size?.label}
        <span
          className={`${
            size.stock === 2
              ? "bg-zinc-400 h-0.5 w-20 absolute -rotate-45"
              : "hidden"
          }`}
        ></span>
      </label>
    </>
  );
};
