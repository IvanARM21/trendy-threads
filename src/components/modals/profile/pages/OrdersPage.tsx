import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { ProfileOrder } from "@/interfaces/order.interface";
import { Spinner } from "@/components/ui/Spinner";
import { getOrdersByUserId } from "@/actions/order/getOrders";
import {
  calculateDiscount,
  formattCurrency,
  formattDate,
  getFulfillmentColorAndText,
  getOrderColorAndText,
} from "@/utils";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { STATUS_COLORS } from "@/constants";
import { payOrder } from "@/actions/order/payOrder";
import { Alert } from "@/components/ui/Alert";
import { AlertMessage } from "@/interfaces/general.interface";

interface Props {
  toggleSidebar: () => void;
  isLoaded: boolean;
  orders: ProfileOrder[];
  setOrders: React.Dispatch<React.SetStateAction<ProfileOrder[]>>;
}

export const OrdersPage = ({
  toggleSidebar,
  isLoaded,
  orders,
  setOrders,
}: Props) => {
  const { data: session } = useSession();

  const [alert, setAlert] = useState<AlertMessage>({
    message: "",
    error: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      if (!isLoaded) {
        const orders = await getOrdersByUserId(userId ?? "");
        setOrders(orders);
      }
      setIsLoading(false);
    },
    [isLoaded]
  ); // Dependencias mínimas necesarias

  useEffect(() => {
    if (session && session.user.id) {
      getOrders(session.user.id);
    }
  }, [session, getOrders, setOrders]); // Ahora podemos incluir getOrders

  const onClickPay = async (orderId: string) => {
    try {
      const res = await payOrder(orderId);
      if (res?.url) {
        setAlert({ error: false, message: "Redirecting to MercadoPago" });
        window.location.href = res.url;
      }
    } catch (error) {
      if (error instanceof Error) {
        setAlert({ error: true, message: error.message });
      }
      setAlert({ error: true, message: "An unexpected error has ocurred" });
    }
  };

  return (
    <div className="py-8 px-6 w-full flex flex-col relative">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-zinc-700">Order List</h2>
        <button type="button" onClick={toggleSidebar} className=" md:hidden">
          <Bars3CenterLeftIcon className="size-6" />
        </button>
      </div>

      {isLoading ? (
        <Spinner
          className="absolute top-1/2 left-1/2 animate-pulse -translate-x-1/2 -translate-y-1/2"
          bounceColor="bg-indigo-600"
        />
      ) : (
        <>
          {orders.length ? (
            <ul className="flex flex-col w-full mt-10 gap-10 overflow-y-auto">
              {orders.map((order) => {
                const paymentStatus = getOrderColorAndText(order.paymentStatus);
                const orderFulfillmentStatus = getFulfillmentColorAndText(
                  order.fulfillmentStatus
                );
                return (
                  <li
                    key={order.id}
                    className="grid lg:grid-cols-12 border p-5 gap-6 rounded-lg"
                  >
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-y-6 lg:col-span-7">
                      <div className="sm:col-span-2 flex justify-between items-center">
                        <div className="flex flex-col gap-1 items-start">
                          <span className=" text-zinc-500 font-medium">
                            Order Status
                          </span>
                          <span
                            className={twMerge(
                              "text-sm font-medium py-0.5 px-2 rounded-md w-fit",
                              STATUS_COLORS[
                                orderFulfillmentStatus.color as keyof typeof STATUS_COLORS
                              ]
                            )}
                          >
                            {orderFulfillmentStatus.text}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <span className=" text-zinc-500 font-medium">
                            Payment Status
                          </span>
                          <span
                            className={twMerge(
                              "text-sm font-medium py-0.5 px-2 rounded-md w-fit",
                              STATUS_COLORS[
                                paymentStatus.color as keyof typeof STATUS_COLORS
                              ]
                            )}
                          >
                            {paymentStatus.text}
                          </span>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-zinc-500 font-medium">Order ID:</p>
                        <p className="text-zinc-900">#{order.id}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 font-medium">Order Date:</p>
                        <p className="text-zinc-900">
                          {formattDate(order.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 font-medium">
                          Delivered Date:
                        </p>
                        <p className="text-zinc-900">
                          {formattDate(order.createdAt)}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 font-medium">Ship to:</p>
                        <p className="text-zinc-900">
                          <span className="block">
                            {order.address?.address}, {order.address?.city},{" "}
                          </span>
                          <span className="block">
                            {order.address?.department},{" "}
                            {order.address?.country}
                          </span>
                        </p>
                      </div>
                      {order.address?.instructions.length ? (
                        <div>
                          <p className="text-zinc-500 font-medium">
                            Instructions:
                          </p>
                          <p className="text-zinc-900">
                            {order.address.instructions}
                          </p>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="flex justify-between items-end col-span-2 border-t pt-8">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-zinc-500">
                            Subtotal:{" "}
                            <span className="text-zinc-800 font-bold">
                              {formattCurrency(order.subtotal)}
                            </span>
                          </p>
                          {order.discount > 0 && (
                            <p className="font-medium text-zinc-500">
                              Discount ({order.discount * 100}%):{" "}
                              <span className="text-zinc-800 font-bold">
                                -
                                {formattCurrency(
                                  order.subtotal -
                                    calculateDiscount(
                                      order.subtotal,
                                      order.discount
                                    )
                                )}
                              </span>
                            </p>
                          )}
                          <p className="font-medium text-zinc-500">
                            Shipping:{" "}
                            <span className="text-zinc-800 font-bold">
                              {formattCurrency(order.shipping)}
                            </span>
                          </p>
                          <p className="font-medium text-zinc-500">
                            Taxes:{" "}
                            <span className="text-zinc-800 font-bold">
                              {formattCurrency(order.tax)}
                            </span>
                          </p>
                          <p className="text-xl font-semibold text-zinc-600">
                            Total amount:{" "}
                            <span className="text-zinc-800 font-bold">
                              {formattCurrency(
                                order.total -
                                  (order.subtotal -
                                    calculateDiscount(
                                      order.subtotal,
                                      order.discount
                                    ))
                              )}
                            </span>
                          </p>
                        </div>
                        {[
                          "ERROR",
                          "REJECTED",
                          "CANCELLED",
                          "UNKNOWN",
                          "AWAITING_PAYMENT",
                        ].includes(order.paymentStatus) ? (
                          <div className="flex flex-col gap-4 items-end">
                            {alert.message ? <Alert {...alert} /> : <></>}
                            <button
                              type="button"
                              onClick={() => onClickPay(order.id)}
                              className={
                                "py-1 px-6 w-fit text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2 justify-center"
                              }
                            >
                              Pay
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <ul className="flex flex-col gap-6 lg:col-span-5">
                      {order.orderProducts.map((orderProduct) => (
                        <li
                          key={orderProduct.id}
                          className="border-b last-of-type:border-b-0 grid grid-cols-5 gap-4 pb-6 last-of-type:pb-0"
                        >
                          <Image
                            src={orderProduct.product.images[0].url}
                            alt={`${orderProduct.product.name}`}
                            className="col-span-2 w-40 aspect-square object-cover rounded-md shadow"
                            width={160}
                            height={160}
                          />
                          <div className="col-span-3">
                            <div className="flex justify-between items-center">
                              <h3 className=" font-semibold text-zinc-800">
                                {orderProduct.product.name}
                              </h3>
                              <p className="text-zinc-800 font-bold">
                                {formattCurrency(orderProduct.price)}
                              </p>
                            </div>
                            <div className="mt-2 flex flex-col gap-1">
                              <p className="text-zinc-500 font-medium text-sm">
                                Qty:{" "}
                                <span className="text-zinc-900">
                                  {orderProduct.quantity}
                                </span>
                              </p>
                              {orderProduct.size?.label ? (
                                <p className="text-zinc-500 font-medium text-sm">
                                  Size:{" "}
                                  <span className="text-zinc-900">
                                    {orderProduct.size.label}
                                  </span>
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-lg font-medium text-zinc-500 mt-6">
              You don&apos;t have orders created at the moment
            </p>
          )}
        </>
      )}
    </div>
  );
};
