import { getProductDetails } from "@/actions/product/searchProduct";
import { ProductByQuery } from "@/interfaces/product.interface";
import { useDashboardStore } from "@/store/dashboard";
import { formattCurrency } from "@/utils";
import { getLocalStorage, setLocalStorage } from "@/utils/search-modal";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  product: ProductByQuery;
}

export const ProductCard = ({ product }: Props) => {
  const { updateSearchProductModal, searchProductModal } = useDashboardStore();

  const handleClick = async () => {
    // Search product details by id
    try {
      const productDetail = await getProductDetails(product?.id ?? "");
      updateSearchProductModal({
        ...searchProductModal,
        productDetail,
      });
      updateLocalStorage(product);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLocalStorage = (newProduct: ProductByQuery) => {
    // Check if recent-searches exists and have products
    const products = getLocalStorage();

    // Check if the new search exists
    const existingProductIndex = products.findIndex(
      (product) => product.id === newProduct.id
    );
    if (existingProductIndex !== -1) {
      // Remove existing product
      const productToMove = products.splice(existingProductIndex, 1)[0];
      // Add existing product at the beginning
      products.unshift(productToMove);
    } else {
      // Add new product at the beginning
      console.log(newProduct);
      products.unshift(newProduct);
    }
    // Limit recent-searches to 5 products
    if (products.length > 5) products.pop();
    console.log(products);

    // Update recent-searches
    setLocalStorage(products);
  };

  return (
    <li
      className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md group"
      onClick={handleClick}
    >
      <div className="flex gap-2">
        <img
          src={product.images[0].url}
          alt={product.name}
          width={100}
          height={100}
          className="size-14 rounded-md object-cover"
        />
        <div>
          <p className="font-semibold text-zinc-600">{product.name}</p>
          <p className="text-sm font-medium text-zinc-500">
            {formattCurrency(product.price)}
          </p>
        </div>
      </div>
      <ChevronRightIcon className="size-4 hidden text-zinc-400 group-hover:block" />
    </li>
  );
};
