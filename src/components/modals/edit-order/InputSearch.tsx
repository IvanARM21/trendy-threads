import React, { useCallback, useEffect } from "react";
import { getProductByQuery } from "@/actions/product/searchProduct";
import { useDashboardStore } from "@/store/dashboard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const InputSearch = () => {
  const { searchProductModal, updateSearchProductModal } = useDashboardStore();

  const { query } = searchProductModal;

  const fetchNewProducts = useCallback(async () => {
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
  }, [query, searchProductModal, updateSearchProductModal]);

  useEffect(() => {
    const delayDebounce = setTimeout(fetchNewProducts, 500);

    // Clear timeout
    return () => clearTimeout(delayDebounce);
  }, [query, fetchNewProducts]);

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
