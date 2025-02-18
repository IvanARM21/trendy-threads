"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCartStore } from "@/store/cart";
import { formattCurrency } from "@/utils";
import { QuantityInputCart } from "./QuantityInputCart";

export const CartSidebar = () => {
  const [loaded, setLoaded] = useState(false);
  const {
    cartProduct,
    getSubtotalPrice,
    isActive,
    closeCart,
    removeProductCart,
  } = useCartStore();

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <>
      {isActive && (
        <div
          className="bg-black fixed bg-opacity-70 backdrop-blur-sm inset-0 z-40 cursor-pointer animate-fade-in"
          onClick={closeCart}
        ></div>
      )}
      <aside
        className={twMerge(
          "fixed top-0 right-0 z-50 h-screen w-[calc(100%-20px)] sm:w-[500px] rounded-l-xl bg-white shadow-lg flex justify-between flex-col transition-transform duration-300",
          isActive ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex justify-between items-center px-4 py-6 sm:px-6 border-b ">
          <h2 className="text-2xl text-zinc-800 font-semibold">Cart</h2>
          <button type="button" aria-label="Cerrar carrito" onClick={closeCart}>
            <XMarkIcon className="size-8 text-zinc-600" />
          </button>
        </header>
        {cartProduct.length > 0 ? (
          <>
            <div className="flex flex-col px-4 py-6 sm:px-6 flex-1">
              {cartProduct.map((product) => (
                <div
                  key={`${product.id}-${product.size.id}`}
                  className="grid grid-cols-3 gap-4 border-b pb-8 mb-8 last-of-type:border-b-0 last-of-type:pb-0 last-of-type:mb-0"
                >
                  <Image
                    src={product.image.url}
                    alt={`Imagen de ${product.name}`}
                    width={100}
                    height={100}
                    className="rounded-xl w-full aspect-[5/6] object-cover"
                  />
                  <div className="col-span-2 flex flex-col justify-between">
                    <div className="flex justify-between gap-1">
                      <h3 className="text-xl font-medium text-zinc-800">
                        {product.name} - {product.size?.size?.label}
                      </h3>

                      <button
                        type="button"
                        aria-label="Eliminar producto"
                        onClick={() => removeProductCart(product)}
                      >
                        <TrashIcon className="size-5 text-zinc-400 hover:text-red-600" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-medium text-zinc-500">
                        {formattCurrency(product.price)}
                      </p>

                      <QuantityInputCart product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="px-4 py-6 sm:px-6 border-t">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-zinc-800 font-semibold">
                  Subtotal
                </h2>
                <p className="text-xl font-medium text-zinc-500">
                  {formattCurrency(getSubtotalPrice())}
                </p>
              </div>

              <p className="text-zinc-500 mt-0.5 mb-6 text-lg">
                Taxes and Shipping are calculated to checkout taxes and shipping
              </p>

              <div className="flex justify-between items-center gap-6">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="py-2 px-4 text-indigo-700  bg-indigo-200/40 hover:bg-indigo-200/80 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
                >
                  Checkout
                </Link>
              </div>
            </footer>
          </>
        ) : (
          <div className="absolute top-1/2 -translate-y-1/2 text-center w-full">
            <p className="text-xl text-zinc-800 font-medium">
              Your cart is{" "}
              <span className="underline underline-offset-2 text-indigo-600 text-2xl">
                empty
              </span>
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
