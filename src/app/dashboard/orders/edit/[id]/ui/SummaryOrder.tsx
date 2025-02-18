import { GetOrderForEdit } from "@/interfaces/order.interface";
import { calculateDiscount, formattCurrency } from "@/utils";
import React from "react";

interface Props {
  order: GetOrderForEdit;
}

export const SummaryOrder = ({ order }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-zinc-800 mb-4 border-b pb-4">
        Summary Order
      </h2>

      <div className="flex flex-col gap-2">
        <p className="font-medium text-zinc-500 text-xl">
          Subtotal:{" "}
          <span className="text-zinc-800 font-bold">
            {formattCurrency(order.subtotal)}
          </span>
        </p>
        {order.discount > 0 && (
          <p className="font-medium text-zinc-500 text-xl">
            Discount ({order.discount * 100}%):{" "}
            <span className="text-zinc-800 font-bold">
              -
              {formattCurrency(
                order.subtotal -
                  calculateDiscount(order.subtotal, order.discount)
              )}
            </span>
          </p>
        )}
        <p className="font-medium text-zinc-500 text-xl">
          Shipping:{" "}
          <span className="text-zinc-800 font-bold">
            {formattCurrency(order.shipping)}
          </span>
        </p>
        <p className="font-medium text-zinc-500 text-xl">
          Taxes:{" "}
          <span className="text-zinc-800 font-bold">
            {formattCurrency(order.tax)}
          </span>
        </p>
        <p className="text-2xl font-semibold text-zinc-600">
          Total amount:{" "}
          <span className="text-zinc-800 font-bold">
            {formattCurrency(
              order.total -
                (order.subtotal -
                  calculateDiscount(order.subtotal, order.discount))
            )}
          </span>
        </p>
      </div>
    </div>
  );
};
