import { GetOrderForEdit } from "@/interfaces/order.interface";
import { useDashboardStore } from "@/store/dashboard";
import { calculateDiscount, formattCurrency } from "@/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  order: GetOrderForEdit;
}

export const OrdersProduct = ({ order }: Props) => {
  const { openSearchProduct } = useDashboardStore();

  return (
    <div>
      <h2 className="text-2xl font-semibold text-zinc-800 mb-4 border-b pb-4">
        Order Products
      </h2>
      <div className="flex flex-col flex-1">
        {order.orderProducts.map((item) => (
          <div
            key={`${item.product.id}-${item.size?.label ?? ""}`}
            className="grid grid-cols-3 gap-4 border-b pb-8 mb-8 last-of-type:border-b-0 last-of-type:pb-0 last-of-type:mb-0"
          >
            <Image
              src={item.product.images[0].url}
              alt={`Imagen de ${item.product.name}`}
              width={200}
              height={200}
              className="rounded-xl w-full aspect-square object-cover"
            />
            <div className="col-span-2 flex flex-col justify-between">
              <div className="flex justify-between gap-1">
                <div>
                  <h3 className="text-2xl font-semibold text-zinc-800">
                    {item.product.name}
                  </h3>
                  <p className="font-medium text-zinc-500">
                    Qty: {item.quantity}
                  </p>
                  {item.size?.label ? (
                    <p className="font-medium text-zinc-500">
                      Size: {item.size.label}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>

                <button type="button" aria-label="Eliminar producto">
                  <TrashIcon className="size-5 text-zinc-400 hover:text-red-600" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <p
                    className={twMerge(
                      "text-lg font-semibold text-zinc-500",
                      order.discount > 0 && " line-through decoration-2"
                    )}
                  >
                    {formattCurrency(item.price)}
                  </p>
                  <p className="text-xl font-semibold text-indigo-600">
                    {formattCurrency(
                      calculateDiscount(item.price, order.discount)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={openSearchProduct}
        className="w-full h-40 border-2 border-zinc-400 group hover:border-indigo-600 rounded-lg border-dashed mt-4 flex justify-center items-center transition-all duration-300"
      >
        <span className="text-xl text-zinc-600 font-semibold group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
          Add Products
        </span>
      </button>
    </div>
  );
};
