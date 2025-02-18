"use client";

import { useDashboardStore } from "@/store/dashboard";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../ui/Spinner";
import { useEffect, useState } from "react";
// import { AlertMessage } from "@/interfaces/general.interface";
// import { INITIAL_ALERT } from "@/constants";
import { Product, ProductByQuery } from "@/interfaces/product.interface";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  getProductByQuery,
  getProductDetails,
} from "@/actions/product/searchProduct";
import { formattCurrency } from "@/utils";
import { ProductSizesQuantityForm } from "@/app/dashboard/orders/edit/[id]/ui/ProductSizesQuantityForm";
import Image from "next/image";

export const ModalSearchProduct = () => {
  const { searchProductModal, closeSearchProduct } = useDashboardStore();

  const { state } = searchProductModal;
  // const [alert, setAlert] = useState<AlertMessage>(INITIAL_ALERT);
  const [products, setProducts] = useState<ProductByQuery[]>([]);
  const [productDetail, setProductDetail] = useState<Product | null>(null);
  const [searching, setSearching] = useState(false);

  const [query, setQuery] = useState("");

  const closeAndReset = () => {
    // setAlert(INITIAL_ALERT);
    closeSearchProduct();
  };

  useEffect(() => {
    const searchingProducts = async () => {
      if (query.length < 3) {
        // Don't search if query is less than 3
        setProducts([]);
        return;
      }

      console.log("Searching...", query);
      // Start the search
      setSearching(true);
      try {
        const products = await getProductByQuery(query);

        setProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setSearching(false);
      }
    };

    // Call get products each 300ms
    const delayDebounce = setTimeout(searchingProducts, 300);

    // Clear timeout
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const searchProductDetails = async (id: string) => {
    try {
      const productDetails = await getProductDetails(id);
      setProductDetail(productDetails);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={twMerge(
          "inset-0 z-30 cursor-pointer fixed opacity-0 -translate-y-full bg-black/80 transition-all duration-300",
          state && "opacity-100 -translate-y-0"
        )}
        onClick={closeAndReset}
      ></div>

      <>
        {!products.length && searching ? (
          <Spinner
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            bounceColor="bg-indigo-600"
          />
        ) : (
          <>
            <div
              className={twMerge(
                "h-fit invisible max-w-2xl w-full bg-white rounded-xl p-10 fixed top-1/2 left-1/2 -translate-y-[calc(50%-40px)] opacity-0 -translate-x-1/2 z-40 transition-all duration-300",
                state && "opacity-100 -translate-y-1/2 visible"
              )}
            >
              <h2 className="text-2xl text-zinc-800 font-semibold ">
                Search for
              </h2>
              <form className="mt-4">
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="product"
                    className="text-lg font-medium text-zinc-700"
                  >
                    <MagnifyingGlassIcon className="size-6 text-zinc-400" />
                  </label>
                  <input
                    type="text"
                    id="product"
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="Search..."
                    className="py-2 text-lg rounded-lg w-full text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4  outline-none ring-zinc-100 transition-colors duration-300 focus:border-transparent ring-2"
                  />
                </div>
              </form>

              {searching ? (
                <Spinner bounceColor="bg-indigo-600" className="mx-auto" />
              ) : (
                <>
                  {!products.length && query.length > 3 ? (
                    <div className="text-zinc-500 text-lg font-medium mt-4">
                      There aren&apos;t products with that name
                    </div>
                  ) : (
                    <ul className="flex flex-col mt-10 gap-4">
                      {products.map((product) => (
                        <li key={product.id} className="grid gap-4 grid-cols-4">
                          <Image
                            src={product.images[0].url}
                            alt=""
                            width={200}
                            height={200}
                            className="aspect-square object-cover rounded-lg shadow"
                          />
                          <div className="flex flex-col justify-between col-span-3">
                            <div>
                              <h3 className="text-xl font-semibold text-zinc-800">
                                {product.name}
                              </h3>
                              <p className="text-zinc-500 text-lg font-medium">
                                {formattCurrency(product.price)}
                              </p>
                            </div>
                            {productDetail &&
                            productDetail.id === product.id ? (
                              <ProductSizesQuantityForm
                                productDetail={productDetail}
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  searchProductDetails(product.id ?? "")
                                }
                                className="py-2 px-4 w-fit text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
                              >
                                Select
                              </button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </>
    </>
  );
};
