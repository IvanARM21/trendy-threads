"use client";

import Image from "next/image";
import { QuantityInputCart } from "@/components/cart/QuantityInputCart";
import { useCartStore } from "@/store/cart";
import { formattCurrency } from "@/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { GENDER_FORMATTED } from "@/constants";

export const OrderList = () => {
  const {
    cartProduct,
    removeProductCart,
    getSubtotalPrice,
    getShippingPrice,
    getTaxPrice,
    getTotalPrice,
  } = useCartStore();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  if (!loaded) return null;

  return (
    <div className="order-1 lg:order-2">
      <h3 className="text-2xl font-bold text-zinc-700 mb-4">Order Summary</h3>
      <div className=" border bg-white rounded-xl">
        <ul className="flex flex-col gap-8">
          {cartProduct.map((product) => (
            <li
              key={`${product.id}-${product.size.id}`}
              className="grid grid-cols-3 gap-8 p-6 border-b"
            >
              <Image
                src={`/products/${product.image.url}`}
                alt={product.name}
                width={200}
                height={200}
                className="w-full rounded-md aspect-[5/6] object-cover"
              />

              <div className="col-span-2 flex flex-col justify-between">
                <div className="flex justify-between gap-1 items-start">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-semibold text-zinc-800">
                      {product.name}
                    </h3>
                    <p className="text-lg text-zinc-500 font-medium">
                      Gender: {GENDER_FORMATTED[product.gender].label}
                    </p>
                    <p className="text-lg text-zinc-500 font-medium">
                      Size: {product.size?.size?.label}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Eliminar producto"
                    onClick={() => removeProductCart(product)}
                  >
                    <TrashIcon className="size-6 text-zinc-400 hover:text-red-600" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-medium text-zinc-500">
                    {formattCurrency(product.price)}
                  </p>

                  <QuantityInputCart product={product} />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 px-6">
          <div className="flex justify-between border-b pb-4 mb-4">
            <p className="text-lg text-zinc-500 font-medium">Subtotal</p>
            <p className="text-lg text-zinc-500 font-medium">
              {formattCurrency(getSubtotalPrice())}
            </p>
          </div>
          <div className="flex justify-between border-b pb-4 mb-4">
            <p className="text-lg text-zinc-500 font-medium">Shipping</p>
            <p className="text-lg text-zinc-500 font-medium">
              {formattCurrency(getShippingPrice())}
            </p>
          </div>
          <div className="flex justify-between border-b pb-4 mb-4">
            <p className="text-lg text-zinc-500 font-medium">Taxes</p>
            <p className="text-lg text-zinc-500 font-medium">
              {formattCurrency(getTaxPrice())}
            </p>
          </div>
          <div className="flex justify-between pb-4">
            <p className="text-2xl font-semibold text-zinc-800">Total</p>
            <p className="text-2xl font-semibold text-zinc-800">
              {formattCurrency(getTotalPrice())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
