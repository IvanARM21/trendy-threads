// import { INITIAL_ALERT } from "@/constants";
// import { AlertMessage } from "@/interfaces/general.interface";
import { GetOrderForEdit } from "@/interfaces/order.interface";
import { UserAddress } from "@/interfaces/user.interface";
// import { getFormState } from "@/utils";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  order: GetOrderForEdit;
  userAddresses: UserAddress[];
}

export const OrderAddress = ({ userAddresses, order }: Props) => {
  // const [formState, setFormState] = useState(getFormState("initial"));
  // const [alert, setAlert] = useState<AlertMessage>(INITIAL_ALERT);
  // const [isLoading, setIsLoading] = useState(false);
  const [addressSelected, setAddressSelected] = useState<UserAddress | null>(
    userAddresses.find((address) => address.id === order.addressId) ?? null
  );
  const [newAddress, setNewAddress] = useState(false);

  // const onSubmit = (formData: {}) => {};
  return (
    <div>
      <h2 className="text-2xl font-semibold text-zinc-800 mb-4 border-b pb-4">
        Order Address
      </h2>
      {userAddresses.length ? (
        <div className="space-y-4 mb-4">
          <h4 className="text-xl font-semibold text-zinc-700">User addreses</h4>
          <div className="grid grid-cols-2 gap-4">
            {userAddresses.map((address) => (
              <div
                key={address.id}
                onClick={() => {
                  if (addressSelected?.id === address.id) {
                    setAddressSelected(null);
                    return;
                  }
                  setNewAddress(false);
                  setAddressSelected(address);
                }}
                className={twMerge(
                  " border p-6 rounded-md flex justify-between gap-4 items-center cursor-pointer border-dashed",
                  addressSelected?.id === address.id &&
                    "border-indigo-600 border-2"
                )}
              >
                <div>
                  <p className="font-semibold text-xl text-zinc-800">
                    {address.address}
                  </p>
                  <p className=" text-zinc-500 font-medium">
                    {address.city}, {address.department}, {address.country}
                  </p>
                </div>
                {addressSelected?.id === address.id && (
                  <div className="h-6 w-6">
                    <CheckCircleIcon className="h-6 w-6 text-indigo-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              if (!newAddress) {
                setAddressSelected(null);
              }
              setNewAddress(!newAddress);
            }}
            className="py-3 px-6 w-full text-indigo-700  bg-indigo-200/40 hover:bg-indigo-200/80 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
          >
            {newAddress ? "Cancel" : "Add new address"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
