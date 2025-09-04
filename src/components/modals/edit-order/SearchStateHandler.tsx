import { useDashboardStore } from "@/store/dashboard";
import { ProductsList } from "./ProductsList";
import { useMemo } from "react";
import { getLocalStorage } from "@/utils/search-modal";
import { ProductDetail } from "./ProductDetail";

export const SearchStateHandler = () => {
  const { searchProductModal } = useDashboardStore();
  const { query, products } = searchProductModal;

  const isSearched = useMemo(
    () => (query && products.length ? true : false),
    [query, products]
  );

  return (
    <>
      {products.length || getLocalStorage().length ? (
        <div className="grid grid-cols-2">
          {isSearched ? (
            <div className=" py-6 px-4">
              <ProductsList />
            </div>
          ) : (
            <div className=" py-6 px-4">
              <p className="text-zinc-600 text-sm font-semibold px-2 pb-2">
                Recent Searches
              </p>
              <ProductsList />
            </div>
          )}
          <ProductDetail />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-1 h-40">
          <p className="text-xl text-zinc-800 font-semibold">
            {query ? "No products found" : "There are no recent searches"}
          </p>
          <p className="font-medium text-zinc-500">
            {query
              ? "We couldn't find anything with that term. Please try again"
              : "You can search for products by typing in the search bar"}
          </p>
        </div>
      )}
    </>
  );
};
