import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Product } from "@/interfaces/product.interface";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  productDetail: Product;
}

export const ProductSizesQuantityForm = ({ productDetail }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-lg sm:text-xl font-medium text-zinc-700 mb-1">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {productDetail.sizes.map((size) => (
              <Fragment key={size.id}>
                <input
                  type="radio"
                  name="size"
                  id={size.id}
                  className="hidden"
                />
                <label
                  htmlFor={size.id}
                  className={twMerge(
                    "transition-colors relative overflow-hidden w-12 sm:w-14 h-8 sm:h-10 text-zinc-600 font-medium rounded-full border flex justify-center items-center hover:border-gray-400 hover:text-zinc-800 cursor-pointer"
                    // size.stock === 2 && "opacity-50",
                    // "border-gray-600 text-zinc-800"
                  )}
                >
                  {size?.size?.label}
                  <span
                    className={`${
                      size.stock === 2
                        ? "bg-zinc-400 h-0.5 w-20 absolute -rotate-45"
                        : "hidden"
                    }`}
                  ></span>
                </label>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="quantity"
            className="text-lg sm:text-xl font-medium text-zinc-700"
          >
            Quantity
          </label>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              // onClick={() => {
              //   // if (!sizeSelect) {
              //   //   setAlert({
              //   //     error: true,
              //   //     message:
              //   //       "Debes seleccionar una talla para modificar la cantidad",
              //   //   });
              //   //   return;
              //   // }
              //   // if (+quantity - 1 > 0) {
              //   //   onClickQuantityMinus();
              //   // }
              // }}
              className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-6 flex justify-center items-center"
            >
              <MinusIcon className="size-5 text-zinc-500" />
            </button>
            <input
              type="text"
              // value={quantity}
              // onInput={(e) => {
              //   // if (!sizeSelect) {
              //   //   setAlert({
              //   //     error: true,
              //   //     message:
              //   //       "Debes seleccionar una talla para modificar la cantidad",
              //   //   });
              //   //   return;
              //   // }
              //   // if (!isNaN(+e.currentTarget.value)) {
              //   //   handleQuantity(e.currentTarget.value);
              //   // }
              // }}
              className="bg-transparent text-zinc-500 text-xl w-6 text-center"
            />
            <button
              type="button"
              // onClick={() => {
              //   // if (!sizeSelect) {
              //   //   setAlert({
              //   //     error: true,
              //   //     message:
              //   //       "Debes seleccionar una talla para modificar la cantidad",
              //   //   });
              //   //   return;
              //   // }
              //   // if (+quantity + 1 < sizeSelect.stock) {
              //   //   onClickQuantityPlus();
              //   // }
              // }}
              className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-6 flex justify-center items-center"
            >
              <PlusIcon className="size-5 text-zinc-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
