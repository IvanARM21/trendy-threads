"use client";

import { ButtonState } from "@/app/auth/ui/ButtonState";
import { useState } from "react";
import { getFormState } from "@/utils";
import { UserAddress } from "@/interfaces/user.interface";
import { GetOrderForEdit } from "@/interfaces/order.interface";
import { OrdersProduct } from "./OrdersProduct";
import { OrderAddress } from "./OrderAddress";
import { SummaryOrder } from "./SummaryOrder";
import { ModalSearchProduct } from "@/components/modals/ModalSearchProduct";

interface Props {
  order: GetOrderForEdit;
  userAddresses: UserAddress[];
}

export const EditOrderForm = ({ order, userAddresses }: Props) => {
  const [formState] = useState(getFormState("initial"));

  return (
    <>
      <div className="max-w-2xl w-full mx-auto mt-6 px-4 flex flex-col gap-10 pb-10">
        <OrdersProduct order={order} />

        <OrderAddress order={order} userAddresses={userAddresses} />

        <SummaryOrder order={order} />

        <ButtonState {...formState}>Save Order</ButtonState>
      </div>

      <ModalSearchProduct />
    </>
  );
};
