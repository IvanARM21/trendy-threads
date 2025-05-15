"use client";

import { useCartStore } from "@/store/cart";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CartProduct } from "@/interfaces/product.interface";

interface Props {
  product: CartProduct;
}

export const QuantityInputCart = ({ product }: Props) => {
  const { editProductCart } = useCartStore();

  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            const value = --product.quantity;
            if (!value || value < 1) return;
            editProductCart({ ...product, quantity: value });
          }}
          className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-5 flex justify-center items-center"
        >
          <MinusIcon className="size-4 text-zinc-500" />
        </button>
        <input
          type="text"
          value={product.quantity}
          onInput={(e) => {
            const value = e.currentTarget.value;
            if (value !== "" && isNaN(+value)) return;
            editProductCart({ ...product, quantity: +value });
          }}
          className="bg-transparent text-zinc-500 text-xl w-6 text-center"
        />
        <button
          type="button"
          onClick={() => {
            const value = ++product.quantity;
            if (!value) return;
            editProductCart({ ...product, quantity: value });
          }}
          className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-5 flex justify-center items-center"
        >
          <PlusIcon className="size-4 text-zinc-500" />
        </button>
      </div>
    </>
  );
};
