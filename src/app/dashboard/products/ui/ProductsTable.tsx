import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { formattCurrency } from "@/utils";
import { GENDER_FORMATTED } from "@/constants";

import { twMerge } from "tailwind-merge";
import { Product } from "@/interfaces/product.interface";
import { SelectProductState } from "./SelectProductState";
import { ToggleHighlighted } from "./ToggleHighlighted";
import Link from "next/link";
import { ButtonDeleteProduct } from "./ButtonDeleteProduct";

interface Props {
  products: Product[];
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <>
      <div className="overflow-x-auto mt-6">
        <table className="rounded-lg shadow-sm min-w-[1200px] w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 text-left font-semibold text-zinc-800">
                Title
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Price
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Gender
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Sizes
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Highlighted
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id} className="border-b">
                  <td className="py-3 text-zinc-800 font-medium">
                    <div className="flex gap-2 items-center">
                      {product.images.length === 0 ? (
                        <div className="size-16 rounded-md flex items-center text-indigo-600 bg-zinc-800 text-sm font-medium text-center">
                          No images available
                        </div>
                      ) : (
                        <Image
                          src={product.images[0].url}
                          alt=""
                          width={80}
                          height={80}
                          quality={90}
                          className="size-16 sm:size-20 object-cover rounded-md "
                        />
                      )}
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <p
                            className={twMerge(
                              "text-zinc-800 font-semibold text-sm sm:text-base",
                              product.isHighlighted && "text-indigo-600"
                            )}
                          >
                            {product.name}
                          </p>
                          <p className="text-zinc-500 text-xs sm:text-sm font-medium">
                            /products/{""}
                            <span className="text-zinc-700 font-semibold">
                              {product.slug}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-zinc-500 font-medium">
                    {formattCurrency(product.price)}
                  </td>
                  <td className="py-3 text-zinc-500 font-medium">
                    {GENDER_FORMATTED[product.gender].label}
                  </td>
                  <td className="py-3 ">
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
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
                              size.stock > 0 &&
                                size.stock < 8 &&
                                "bg-yellow-600",
                              size.stock >= 8 &&
                                size.stock < 12 &&
                                "bg-indigo-600"
                            )}
                          >
                            {size.stock}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-zinc-500 font-medium">
                    <ToggleHighlighted
                      productId={product.id ?? ""}
                      isHighlighted={product?.isHighlighted ?? false}
                    />
                  </td>
                  <td className="py-3 text-zinc-500 font-medium">
                    <div className="flex items-center justify-between">
                      <SelectProductState product={product} />
                      <div className="flex gap-4">
                        <Link href={`/dashboard/products/edit/${product.id}`}>
                          <PencilSquareIcon className="size-5 text-zinc-500 hover:text-indigo-600" />
                        </Link>

                        <ButtonDeleteProduct productId={product.id ?? ""} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
