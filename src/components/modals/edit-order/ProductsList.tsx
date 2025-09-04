import { useDashboardStore } from "@/store/dashboard";
import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { isSearchProducts } from "@/utils/search-modal";

export const ProductsList = () => {
  const { searchProductModal } = useDashboardStore();

  const { query } = searchProductModal;

  const products = useMemo(
    () => isSearchProducts(searchProductModal.products, query),
    [searchProductModal.products, query]
  );

  return (
    <ul className="flex flex-col gap-1 border-r border-gray-100">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};
