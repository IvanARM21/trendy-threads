"use client";

import { changeHighlighted } from "@/actions/product/changeStateProduct";
import { useOptimistic, useState, useTransition } from "react";

interface Props {
  productId: string;
  isHighlighted: boolean;
}

export const ToggleHighlighted = ({ productId, isHighlighted }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [highlighted, setHighlighted] = useState(isHighlighted);
  const addOptimisticHighlighted = useOptimistic(
    isHighlighted,
    (_, newState: boolean) => newState
  )[1];

  const handleChange = async (state: boolean) => {
    const prevState = highlighted;

    startTransition(async () => {
      try {
        setHighlighted(state);
        addOptimisticHighlighted(state);
        await changeHighlighted(productId, state);
      } catch (error) {
        console.log(error);
        setHighlighted(prevState);
      }
    });
  };

  return (
    <form action="">
      <label
        htmlFor={`highlighted-${productId}`}
        className="relative w-12 h-7 cursor-pointer"
      >
        <input
          type="checkbox"
          id={`highlighted-${productId}`}
          className="sr-only peer"
          disabled={isPending}
          onChange={(e) => handleChange(e.currentTarget.checked)}
          checked={highlighted}
        />
        <div className="w-12 h-7 bg-gray-300 rounded-full transition peer-checked:bg-indigo-600"></div>
        <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:left-6"></div>
      </label>
    </form>
  );
};
