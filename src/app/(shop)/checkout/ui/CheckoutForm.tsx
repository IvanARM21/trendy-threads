"use client";

import { Session } from "next-auth";
import { Alert } from "@/components/ui/Alert";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@/components/ui/Spinner";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useCheckout } from "../hooks/useCheckout";
import { UserAddress } from "@prisma/client";

interface Props {
  session: Session | null;
  userAddresses: UserAddress[];
}

export const CheckoutForm = ({ session, userAddresses }: Props) => {
  const {
    handleSubmit,
    onSubmit,
    newAddress,
    setNewAddress,
    alert,
    isLoading,
    register,
    errors,
    setAddressSelected,
    addressSelected,
  } = useCheckout(session, userAddresses);

  return (
    <div className="order-2 lg:order-1">
      <h3 className="text-2xl font-bold text-zinc-700 mb-4">
        Shipping Information
      </h3>

      {userAddresses.length ? (
        <div className="space-y-4 mb-4">
          <h4 className="text-xl font-semibold text-zinc-700">Your addreses</h4>
          <div className="grid sm:grid-cols-2 gap-4">
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
                  " border-2 border-dashed bg-white p-6 rounded-md flex justify-between gap-4 items-center cursor-pointer relative",
                  addressSelected?.id === address.id && "border-indigo-600"
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
                    <CheckCircleIcon className="h-6 w-6 text-indigo-600 absolute right-2 top-2" />
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

          {!newAddress ? (
            <>
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-zinc-700 mt-8">
                  Payment
                </h3>
                <p className="text-lg font-medium text-zinc-500">
                  By clicking on &quot;Pay&quot;, you will be directed to
                  Mercado Pago to complete your purchase. If you cancel, your
                  order will be deleted. We recommend that you complete the
                  payment to ensure you receive your products.
                </p>
              </div>
              <button
                className={twMerge(
                  "mt-6 py-3 h-[52px] px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors text-lg font-semibold flex items-center gap-2 w-full justify-center",
                  alert.error &&
                    alert.message.length &&
                    "bg-red-600 hover:bg-red-600",
                  !alert.error &&
                    alert.message.length &&
                    "bg-emerald-600 hover:bg-emerald-600"
                )}
                type="button"
                onClick={() => {
                  if (!addressSelected) return;
                  const formData = {
                    address: addressSelected.address,
                    apartment: addressSelected.apartment,
                    zip: addressSelected.zip,
                    city: addressSelected.city,
                    department: addressSelected.department,
                    phone: addressSelected.phone,
                    country: addressSelected.country,
                    instructions: addressSelected.instructions,
                    saveUserAddress: false,
                  };
                  onSubmit(formData);
                }}
              >
                {isLoading ? (
                  <Spinner className="absolute z-20 -top-[86px] text-white" />
                ) : (
                  <>{alert.message.length ? alert.message : "Pay"}</>
                )}
              </button>
            </>
          ) : (
            <> </>
          )}
        </div>
      ) : (
        <></>
      )}

      {!userAddresses.length || newAddress ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            {newAddress || !userAddresses.length ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3, bounce: true }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="address"
                    className="text-lg font-medium text-zinc-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                    placeholder="You address"
                    {...register("address", {
                      required: {
                        value: true,
                        message: "The address is required",
                      },
                    })}
                  />
                  {errors.address?.message && (
                    <Alert message={errors.address.message} />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="apartment"
                    className="text-lg font-medium text-zinc-700"
                  >
                    Apartment / House (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                    placeholder="Ex. House 2, Place"
                    {...register("apartment")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="city"
                      className="text-lg font-medium text-zinc-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                      placeholder="Your city"
                      {...register("city", {
                        required: {
                          value: true,
                          message: "The city is required",
                        },
                      })}
                    />
                    {errors.city?.message && (
                      <Alert message={errors.city.message} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="country"
                      className="text-lg font-medium text-zinc-700"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                      placeholder="Your country"
                      {...register("country", {
                        required: {
                          value: true,
                          message: "The country is required",
                        },
                      })}
                    />
                    {errors.city?.message && (
                      <Alert message={errors.city.message} />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="code"
                      className="text-lg font-medium text-zinc-700"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="zip"
                      className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                      placeholder="Postal code"
                      {...register("zip", {
                        required: {
                          value: true,
                          message: "The postal code is required",
                        },
                      })}
                    />
                    {errors.zip?.message && (
                      <Alert message={errors.zip.message} />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="department"
                      className="text-lg font-medium text-zinc-700"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="department"
                      className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                      placeholder="Your department"
                      {...register("department", {
                        required: {
                          value: true,
                          message: "The department is required",
                        },
                      })}
                    />
                    {errors.department?.message && (
                      <Alert message={errors.department.message} />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-lg font-medium text-zinc-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                    placeholder="Your phone"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "The phone number is required",
                      },
                    })}
                  />
                  {errors.phone?.message && (
                    <Alert message={errors.phone.message} />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="instructions"
                    className="text-lg font-medium text-zinc-700"
                  >
                    Instructions (Optional)
                  </label>
                  <textarea
                    id="instructions"
                    className="py-3 px-4 border placeholder:text-zinc-400 outline-none focus:ring-indigo-600 transition-colors rounded-md duration-300 focus:border-transparent focus:ring-2 resize-none"
                    placeholder="Ex. Call before arriving"
                    rows={3}
                    {...register("instructions")}
                  ></textarea>
                </div>

                <div className="flex gap-3 items-center mt-4">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="saveUserAddress"
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        {...register("saveUserAddress")}
                      />
                      <svg
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          className="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          className="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="saveUserAddress"
                    className="min-w-0 flex-1 text-zinc-500 text-lg font-medium"
                  >
                    Save my information for future purchases
                  </label>
                </div>
              </motion.div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-zinc-700 mt-8">Payment</h3>
            <p className="text-lg font-medium text-zinc-500">
              By clicking on &quot;Pay&quot;, you will be directed to Mercado
              Pago to complete your purchase. If you cancel, your order will be
              deleted. We recommend that you complete the payment to ensure you
              receive your products.
            </p>
          </div>
          <button
            className={twMerge(
              "mt-6 py-3 h-[52px] px-6 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors text-lg font-semibold flex items-center gap-2 w-full justify-center",
              alert.error &&
                alert.message.length &&
                "bg-red-600 hover:bg-red-600",
              !alert.error &&
                alert.message.length &&
                "bg-emerald-600 hover:bg-emerald-600"
            )}
            type="submit"
          >
            {isLoading ? (
              <Spinner className="absolute z-20 -top-[86px] text-white" />
            ) : (
              <>{alert.message.length ? alert.message : "Pay"}</>
            )}
          </button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
