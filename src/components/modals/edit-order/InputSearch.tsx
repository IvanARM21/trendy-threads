import { getProductByQuery } from "@/actions/product/searchProduct";
import { ProductByQuery } from "@/interfaces/product.interface";
import { useDashboardStore } from "@/store/dashboard";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { u } from "motion/react-client";
import React, { useEffect, useState } from "react";

export const InputSearch = () => {
  const { searchProductModal, updateSearchProductModal } = useDashboardStore();

  const { query } = searchProductModal;

  useEffect(() => {
    const delayDebounce = setTimeout(fetchNewProducts, 500);

    // Clear timeout
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchNewProducts = async () => {
    if (!query.length) return;

    updateSearchProductModal({
      ...searchProductModal,
      loading: true,
    });

    try {
      const products = await getProductByQuery(query);
      updateSearchProductModal({
        ...searchProductModal,
        products: products ?? [],
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="border border-transparent border-b-gray-100 p-4">
      <div className="flex items-center gap-3">
        <label htmlFor="product" className="text-lg font-medium text-zinc-700">
          <MagnifyingGlassIcon className="size-5 text-zinc-400" />
        </label>
        <input
          type="text"
          id="product"
          value={query}
          onInput={(e) => {
            console.log(e.currentTarget.value);
            updateSearchProductModal({
              ...searchProductModal,
              query: e.currentTarget.value,
            });
          }}
          placeholder="Search..."
          className="outline-none placeholder:font-medium w-full"
        />
      </div>
    </form>
  );
};
