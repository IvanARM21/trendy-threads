"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "@/store/cart";
import { formattCurrency } from "@/utils";
import { QuantityInputCart } from "@/components/cart/QuantityInputCart";
import { GENDER_FORMATTED } from "@/constants";
import Link from "next/link";

export const CartList = () => {
  const [loaded, setLoaded] = useState(false);

  const { cartProduct, removeProductCart } = useCartStore();

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ul className="flex flex-col gap-8">
      {cartProduct.map((product) => (
        <li
          key={`${product.id}-${product.size.id}`}
          className="grid grid-cols-3 gap-8 border-b first-of-type:border-t first-of-type:pt-8 pb-8"
        >
          <Link href={`/products/${product.slug}`}>
            <Image
              src={`/products/${product.image.url}`}
              alt={product.name}
              width={200}
              height={200}
              priority
              className="w-full rounded-md hover:scale-105 transition-transform duration-300 aspect-[5/6] object-cover"
            />
          </Link>

          <div className="col-span-2 flex flex-col justify-between">
            <div className="flex justify-between gap-1 items-start">
              <div className="flex flex-col gap-1">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-2xl font-bold text-zinc-700 hover:text-indigo-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
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
  );
};
