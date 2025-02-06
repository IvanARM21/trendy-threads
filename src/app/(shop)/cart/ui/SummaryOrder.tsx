"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formattCurrency } from "@/utils";
import { useEffect, useState } from "react";

export const SummaryOrder = () => {
  const [loaded, setLoaded] = useState(false);

  const { getShippingPrice, getSubtotalPrice, getTaxPrice, getTotalPrice } =
    useCartStore();

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  if (!loaded) return null;

  return (
    <div className=" bg-white p-8 rounded-xl shadow h-[420px] sticky top-10">
      <h2 className="text-2xl font-semibold  text-zinc-800">Order Summary</h2>

      <div className="mt-6">
        <div className="flex justify-between border-b pb-4 mb-4">
          <p className="text-lg text-zinc-500 font-medium">Subtotal</p>
          <p className="text-lg text-zinc-500 font-medium">
            {formattCurrency(getSubtotalPrice())}
          </p>
        </div>
        <div className="flex justify-between border-b pb-4 mb-4">
          <p className="text-lg text-zinc-500 font-medium">Shipping</p>
          <p className="text-lg text-zinc-500 font-medium">
            {formattCurrency(getShippingPrice())}
          </p>
        </div>
        <div className="flex justify-between border-b pb-4 mb-4">
          <p className="text-lg text-zinc-500 font-medium">Taxes</p>
          <p className="text-lg text-zinc-500 font-medium">
            {formattCurrency(getTaxPrice())}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-zinc-800">Total</p>
          <p className="text-xl font-semibold text-zinc-800">
            {formattCurrency(getTotalPrice())}
          </p>
        </div>

        <Link
          href="/checkout"
          className={
            "mt-6 py-3 px-6 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 w-full justify-center"
          }
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
