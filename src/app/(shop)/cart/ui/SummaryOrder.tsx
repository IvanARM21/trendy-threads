"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formattCurrency } from "@/utils";
import { useEffect, useState } from "react";
import { checkIfUserHasDiscount } from "@/actions/order/checkIfUserHasDiscount";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";

const getIfUserHasDiscount = async (
  userId: string,
  setHasDiscount: (value: boolean) => void
) => {
  if (userId) {
    const userHasDiscount = await checkIfUserHasDiscount();
    setHasDiscount(userHasDiscount);
  }
};

export const SummaryOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);
  const { data: session } = useSession();

  const {
    getShippingPrice,
    getSubtotalPrice,
    getTaxPrice,
    getTotalPrice,
    getDiscountPrice,
  } = useCartStore();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      getIfUserHasDiscount(session.user.id, setHasDiscount);
    }
  }, [session]);

  if (!loaded) return null;

  return (
    <div
      className={twMerge(
        "bg-gray-50 p-10 rounded-xl shadow h-[460px] sticky top-10 lg:col-span-5",
        !hasDiscount && "h-[420px]"
      )}
    >
      <h2 className="text-xl font-semibold text-zinc-800">Order Summary</h2>

      <div className="mt-6">
        <div className="flex justify-between border-b pb-4 mb-4">
          <p className=" text-zinc-500 font-medium">Subtotal</p>
          <p className=" text-zinc-500 font-medium">
            {formattCurrency(getSubtotalPrice())}
          </p>
        </div>
        {hasDiscount && (
          <div className="flex justify-between border-b pb-4 mb-4">
            <p className=" text-zinc-500 font-medium">Discount (10%)</p>
            <p className=" text-zinc-500 font-medium">
              -{formattCurrency(getDiscountPrice())}
            </p>
          </div>
        )}
        <div className="flex justify-between border-b pb-4 mb-4">
          <p className=" text-zinc-500 font-medium">Shipping</p>
          <p className=" text-zinc-500 font-medium">
            {formattCurrency(getShippingPrice())}
          </p>
        </div>
        <div className="flex justify-between border-b pb-4 mb-4">
          <p className=" text-zinc-500 font-medium">Taxes</p>
          <p className=" text-zinc-500 font-medium">
            {formattCurrency(getTaxPrice())}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-zinc-800">Total</p>
          <p className="text-xl font-semibold text-zinc-800">
            {formattCurrency(
              getTotalPrice() - (hasDiscount ? getDiscountPrice() : 0)
            )}
          </p>
        </div>

        <Link
          href="/checkout"
          className="mt-6 py-3 px-6 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 w-full justify-center"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
