"use client";

import { useDashboardStore } from "@/store/dashboard";
import { twMerge } from "tailwind-merge";
import { InputSearch } from "./edit-order/InputSearch";
import { SearchStateHandler } from "./edit-order/SearchStateHandler";
import { useEffect, useState } from "react";

export const ModalSearchProduct = () => {
  const { searchProductModal, closeSearchProduct } = useDashboardStore();

  const { state, query, products } = searchProductModal;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <>
      <div
        className={twMerge(
          "inset-0 z-30 cursor-pointer fixed opacity-0 -translate-y-full bg-black/30 transition-all duration-300",
          state && "opacity-100 -translate-y-0"
        )}
        onClick={closeSearchProduct}
      ></div>

      <div
        className={twMerge(
          "h-fit invisible max-w-3xl w-full bg-white rounded-xl fixed top-1/2 left-1/2 -translate-y-[calc(50%-40px)] opacity-0 -translate-x-1/2 z-40 transition-all duration-300",
          state && "opacity-100 -translate-y-1/2 visible"
        )}
      >
        <InputSearch />

        <SearchStateHandler />
      </div>
    </>
  );
};
