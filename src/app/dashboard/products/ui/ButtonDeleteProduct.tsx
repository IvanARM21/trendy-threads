"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { getProductOrdersById } from "@/actions/product/getProductOrdersById";
import { useDashboardStore } from "@/store/dashboard";

interface Props {
  productId: string;
}

export const ButtonDeleteProduct = ({ productId }: Props) => {
  const { openDeleteProduct, deleteProduct } = useDashboardStore();

  const checkIfProductHasOrders = async () => {
    try {
      deleteProduct.loading = true;
      const orders = await getProductOrdersById(productId);
      if (orders.length) {
        deleteProduct.dangerous = true;
      } else {
        deleteProduct.dangerous = false;
      }
      deleteProduct.loading = false;
      openDeleteProduct(productId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button type="button" onClick={checkIfProductHasOrders}>
      <TrashIcon className="size-5 text-zinc-500 hover:text-red-600" />
    </button>
  );
};
