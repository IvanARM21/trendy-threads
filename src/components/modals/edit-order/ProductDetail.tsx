import { getProductDetails } from "@/actions/product/searchProduct";
import { useDashboardStore } from "@/store/dashboard";
import { formattCurrency } from "@/utils";
import { isSearchProducts } from "@/utils/search-modal";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export const ProductDetail = () => {
  const { searchProductModal, updateSearchProductModal } = useDashboardStore();

  const { productDetail, query } = searchProductModal;

  const products = useMemo(
    () => isSearchProducts(searchProductModal.products, query),
    [searchProductModal.products, searchProductModal.products, query]
  );

  useEffect(() => {
    const loadProductDetail = async () => {
      const productDetail = await getProductDetails(products[0].id ?? "");
      updateSearchProductModal({
        ...searchProductModal,
        productDetail: productDetail,
      });
    };
    loadProductDetail();
  }, [products, searchProductModal, updateSearchProductModal]);

  return (
    <div className="flex flex-col">
      <div className="border-b  border-gray-100">
        <div className="p-5">
          <div className="flex gap-4 items-start">
            <Image
              src={productDetail?.images[0].url ?? ""}
              width={100}
              height={100}
              className="size-24 object-cover rounded-xl mb-2"
              alt=""
            />
            <div>
              <p className="text-lg font-semibold text-zinc-700">
                {productDetail?.name}
              </p>

              <p className="font-semibold text-zinc-500">
                {formattCurrency(productDetail?.price ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <span className="text-lg font-medium text-zinc-700 mb-3">Size</span>
            <div className="flex flex-wrap gap-2">
              {productDetail?.sizes.map((size) => (
                <div key={`${size.id}`} className="relative">
                  <span
                    className={twMerge(
                      "transition-colors overflow-hidden w-10 sm:w-14 h-7 sm:h-10 text-zinc-600 font-medium rounded-full border flex justify-center items-center"
                    )}
                  >
                    {size.size.label}
                  </span>
                  <div
                    className={twMerge(
                      "text-xs sm:text-sm bg-teal-600 text-white font-medium rounded-full flex items-center justify-center p-2 size-5 absolute -top-2 -right-2",
                      size.stock === 0 && "bg-red-600",
                      size.stock > 0 && size.stock < 8 && "bg-yellow-600",
                      size.stock >= 8 && size.stock < 12 && "bg-indigo-600"
                    )}
                  >
                    {size.stock}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-lg font-medium text-zinc-700 mb-3">
              Quantity
            </span>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                // onClick={() => {}}
                className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-6 flex justify-center items-center"
              >
                <MinusIcon className="size-5 text-zinc-500" />
              </button>
              <input
                type="text"
                // onInput={(e) => {}}
                className="bg-transparent text-zinc-500 text-xl w-8 text-center border rounded-md outline-none"
              />
              <button
                type="button"
                // onClick={() => {}}
                className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-6 flex justify-center items-center"
              >
                <PlusIcon className="size-5 text-zinc-500" />
              </button>
            </div>
            {/* {alert.message.length && !sizeSelect ? <Alert {...alert} /> : <></>} */}
          </div>
        </div>
      </div>
    </div>
  );
};
