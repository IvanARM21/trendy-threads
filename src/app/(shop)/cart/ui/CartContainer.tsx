"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { CartList } from "./CartList";
import { SummaryOrder } from "./SummaryOrder";

export const CartContainer = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const { cartProduct } = useCartStore();

  useEffect(() => {
    setLoaded(true);
    if (cartProduct.length === 0 && loaded) {
      router.push("/empty");
    }
  }, [loaded, router, cartProduct.length]);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold  text-zinc-800">Shopping Cart</h1>
      <div className="grid lg:grid-cols-12 gap-20 mt-10">
        <CartList />
        <SummaryOrder />
      </div>
    </div>
  );
};
