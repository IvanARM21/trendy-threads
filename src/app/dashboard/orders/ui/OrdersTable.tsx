"use client";

import { Order } from "@/interfaces/order.interface";
import {
  calculateDiscount,
  formattCurrency,
  formattDate,
  getFulfillmentColorAndText,
  getOrderColorAndText,
} from "@/utils";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  orders: (Order & {
    user: {
      name: string;
      email: string;
    };
  })[];
}

const FULFILLMENT_STATUSES = [
  "RECEIVED",
  "CONFIRMED",
  "PROCESSING",
  "TO_SHIP",
  "SHIPPED",
  "DELIVERED",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "FAILED_DELIVERY",
  "RETURNED",
] as const;

export const OrdersTable = ({ orders }: Props) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="rounded-lg shadow-sm min-w-[1200px] w-full">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-3 text-left font-semibold text-zinc-800">#</th>
            <th className="py-3 text-left font-semibold text-zinc-800">
              Client
            </th>
            <th className="py-3 text-left font-semibold text-zinc-800">
              Payment status
            </th>
            <th className="py-3 text-left font-semibold text-zinc-800">
              Order State/ Shipping Status
            </th>
            <th className="py-3 text-left font-semibold text-zinc-800">
              Total
            </th>

            <th className="py-3 text-left font-semibold text-zinc-800">
              Created at
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 text-zinc-800 font-medium">#{order.id}</td>
              <td className="py-3 text-zinc-500 font-medium">
                <p className="text-zinc-800">{order.user.name}</p>
                <p className="text-zinc-500 text-sm">{order.user.email}</p>
              </td>
              <td className="py-3 text-zinc-500 font-medium">
                <span className="text-zinc-600 text-sm">
                  {getOrderColorAndText(order.paymentStatus).text}
                </span>
              </td>
              <td className="py-3 text-zinc-500 font-medium">
                <form action="">
                  <select
                    id="countries"
                    onChange={(e) => console.log(e.currentTarget.value)}
                    className="bg-gray-50 border text-zinc-600 text-sm rounded-lg focus:ring-2 focus:ring-indigo-600 outline-0 block w-auto p-2.5"
                  >
                    {FULFILLMENT_STATUSES.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className={"text-zinc-500 font-medium appearance-none"}
                      >
                        {getFulfillmentColorAndText(status).text}
                      </option>
                    ))}
                  </select>
                </form>
              </td>
              <td className="py-3 text-zinc-500 font-medium">
                <p>
                  {formattCurrency(
                    calculateDiscount(order.subtotal, order.discount) +
                      order.shipping +
                      order.tax
                  )}
                </p>
                {order.discount > 0 && (
                  <p className="text-xs">Discount: ({order.discount * 100}%)</p>
                )}
              </td>
              <td className="py-3 text-zinc-500 font-medium">
                <div className="flex justify-between items-center">
                  <div>{formattDate(order.createdAt)}</div>
                  <div className="flex gap-4">
                    <Link href={`/dashboard/orders/edit/${order.id}`}>
                      <PencilSquareIcon className="size-5 text-zinc-500 hover:text-indigo-600" />
                    </Link>
                    <button>
                      <TrashIcon className="size-5 text-zinc-500 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
