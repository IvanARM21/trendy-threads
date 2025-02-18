"use client";

import { useState, useOptimistic, useTransition } from "react";
import { PRODUCT_STATES, STATE_ICONS } from "@/constants";
import { Product } from "@/interfaces/product.interface";

import { changeStateProduct } from "@/actions/product/changeStateProduct";
import { twMerge } from "tailwind-merge";

interface Props {
  product: Product;
}

export const SelectProductState = ({ product }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, setOptimisticState] = useState(product.state);
  const addOptimisticProductState = useOptimistic(
    product.state,
    (_, newState: Product["state"]) => newState
  )[1];

  const handleChange = async (state: Product["state"]) => {
    const prevState = optimisticState;

    startTransition(async () => {
      try {
        setOptimisticState(state);
        addOptimisticProductState(state);
        await changeStateProduct(product.id ?? "", state);
      } catch (error) {
        console.log(error);
        setOptimisticState(prevState);
      }
    });
  };

  const Icon = STATE_ICONS[optimisticState].icon;

  return (
    <form className="flex flex-row-reverse gap-4 items-center">
      <Icon
        className={twMerge(
          "size-5 text-zinc-400",
          STATE_ICONS[optimisticState].color
        )}
      />
      <select
        id={product.id}
        onChange={(e) => handleChange(e.target.value as Product["state"])}
        value={optimisticState as Product["state"]}
        disabled={isPending}
        className="bg-gray-50 border text-zinc-600 text-sm rounded-lg focus:ring-2 focus:ring-indigo-600 outline-0 block w-auto p-2.5"
      >
        {PRODUCT_STATES.map((status) => (
          <option
            key={status}
            value={status}
            className="text-zinc-500 font-medium appearance-none"
          >
            {STATE_ICONS[status as keyof typeof STATE_ICONS].label}
          </option>
        ))}
      </select>
    </form>
  );
};
