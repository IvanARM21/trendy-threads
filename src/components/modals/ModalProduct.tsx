"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import { formattCurrency } from "@/utils";
import { Alert } from "../ui/Alert";
import Image from "next/image";

export const ModalProduct = () => {
  const { modalProductAdded, closeModalProductAdded, currentProductAdded } =
    useCartStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (modalProductAdded) {
      setShowModal(true);
    }
  }, [modalProductAdded]);

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      closeModalProductAdded();
    }, 300);
  };

  if (!currentProductAdded) return null;

  return (
    <>
      {modalProductAdded && (
        <div
          className="flex justify-center items-center fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm cursor-pointer animate-fade-in"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
              "bg-white max-w-xl z-30 w-full rounded-xl transform cursor-default transition-all duration-300",
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-14 opacity-0"
            )}
          >
            <header className="px-4 py-8 border-b">
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-lg flex text-zinc-700 gap-2 font-medium items-center mb-6"
              >
                <ChevronLeftIcon className="size-6 text-zinc-500" />
                Continue shopping
              </button>
              <div className="bg-emerald-50 w-full py-2 px-4 rounded-xl">
                <Alert
                  error={false}
                  message="Product added to cart successfully"
                />
              </div>
            </header>
            <div className="grid grid-cols-3 gap-4 items-center px-4 py-6">
              <Image
                src={currentProductAdded.image.url}
                alt={`Imagen de ${currentProductAdded.name}`}
                width={200}
                height={200}
                quality={80}
                className="rounded-xl w-full aspect-square object-cover"
              />
              <div className="col-span-2">
                <h3 className="text-xl font-medium text-zinc-800">
                  {currentProductAdded.name}{" "}
                  {currentProductAdded.size?.id
                    ? `- ${currentProductAdded.size.size.label}`
                    : ""}
                </h3>
                <p className="text-lg text-zinc-600">
                  Cantidad: {currentProductAdded.quantity}
                </p>
                <p className="text-lg text-zinc-600 font-medium">
                  {formattCurrency(currentProductAdded.price)}
                </p>
              </div>
            </div>

            <footer className="px-4 py-6 border-t">
              <div className="flex justify-between items-center gap-10">
                <Link
                  href="/cart"
                  className="py-2 px-4 text-indigo-700  bg-indigo-200/40 hover:bg-indigo-200/80 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
                >
                  View cart
                </Link>
                <Link
                  href="/checkout"
                  className="py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
                >
                  Checkout
                </Link>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
