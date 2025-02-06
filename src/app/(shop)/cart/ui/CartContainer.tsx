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
      <h1 className="text-3xl md:text-4xl font-bold  text-zinc-800">
        Carrito de compras
      </h1>
      <div className="grid grid-cols-2 gap-20 mt-10">
        <CartList />
        <SummaryOrder />
      </div>
    </div>
  );
};
