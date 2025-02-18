"use client";

import { useCartStore } from "@/store/cart";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Alert } from "../ui/Alert";
import { AlertMessage } from "@/interfaces/general.interface";

interface Props {
  condition: boolean;
}

export const QuantityInput = ({ condition }: Props) => {
  const {
    handleQuantity,
    quantity,
    sizeSelect,
    onClickQuantityMinus,
    onClickQuantityPlus,
  } = useCartStore();

  const [alert, setAlert] = useState<AlertMessage>({
    error: true,
    message: "",
  });

  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => {
            if (!condition) {
              setAlert({
                error: true,
                message:
                  "Debes seleccionar una talla para modificar la cantidad",
              });
              return;
            }
            if (+quantity - 1 > 0) {
              onClickQuantityMinus();
            }
          }}
          className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-6 flex justify-center items-center"
        >
          <MinusIcon className="size-5 text-zinc-500" />
        </button>
        <input
          type="text"
          value={quantity}
          onInput={(e) => {
            if (!sizeSelect) {
              setAlert({
                error: true,
                message:
                  "Debes seleccionar una talla para modificar la cantidad",
              });
              return;
            }
            if (!isNaN(+e.currentTarget.value)) {
              handleQuantity(e.currentTarget.value);
            }
          }}
          className="bg-transparent text-zinc-500 text-xl w-6 text-center"
        />
        <button
          type="button"
          onClick={() => {
            if (!sizeSelect) {
              setAlert({
                error: true,
                message:
                  "Debes seleccionar una talla para modificar la cantidad",
              });
              return;
            }
            if (+quantity + 1 < sizeSelect.stock) {
              onClickQuantityPlus();
            }
          }}
          className="bg-zinc-200 hover:bg-zinc-300 transition-colors rounded-full size-6 flex justify-center items-center"
        >
          <PlusIcon className="size-5 text-zinc-500" />
        </button>
      </div>
      {alert.message.length && !sizeSelect ? <Alert {...alert} /> : <></>}
    </>
  );
};
