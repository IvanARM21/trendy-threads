"use client";

import { useDashboardStore } from "@/store/dashboard";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { changeStateProduct } from "@/actions/product/changeStateProduct";
import { FormEvent, useState } from "react";
import { AlertMessage } from "@/interfaces/general.interface";
import { Alert } from "../ui/Alert";
import { INITIAL_ALERT } from "@/constants";
import { deleteProductById } from "@/actions/product/deleteProduct";

export const DeleteProduct = () => {
  const { deleteProduct, closeDeleteProduct } = useDashboardStore();
  const { dangerous, loading, state, productId } = deleteProduct;
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertMessage>(INITIAL_ALERT);
  const [password, setPassword] = useState("");
  const [enterPassword, setEnterPassword] = useState(false);

  const closeAndReset = () => {
    setAlert(INITIAL_ALERT);
    setPassword("");
    setEnterPassword(false);
    setIsLoading(false);
    closeDeleteProduct();
  };

  const handleLogicalDelete = async () => {
    try {
      setIsLoading(true);
      const res = await changeStateProduct(productId ?? "", "DELETED");
      setAlert({ message: res.message, error: false });
      setTimeout(() => {
        closeAndReset();
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setAlert({ message: error.message, error: true });
      }
      setAlert({ message: "An unexpected error has ocurred", error: true });
      setTimeout(() => {
        setAlert(INITIAL_ALERT);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePermanently = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await deleteProductById(productId ?? "", password);
      setAlert({ message: res.message, error: false });
      setTimeout(() => {
        setTimeout(() => setAlert(INITIAL_ALERT), 3000);
        closeAndReset();
      }, 3000);
    } catch (error) {
      setTimeout(() => setAlert(INITIAL_ALERT), 3000);
      if (error instanceof Error) {
        setAlert({ error: true, message: error.message });
        return;
      }
      setAlert({ error: true, message: "An unexpected error has ocurred" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={twMerge(
          "inset-0 z-30 cursor-pointer fixed opacity-0 -translate-y-full bg-black/80 transition-all duration-300",
          state && "opacity-100 -translate-y-0"
        )}
        onClick={closeAndReset}
      ></div>

      <>
        {loading ? (
          <Spinner
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            bounceColor="bg-indigo-600"
          />
        ) : (
          <>
            <div
              className={twMerge(
                "h-fit invisible max-w-2xl w-full bg-white rounded-xl fixed top-1/2 left-1/2 -translate-y-[calc(50%-40px)] opacity-0 -translate-x-1/2 z-40 transition-all duration-300",
                state && "opacity-100 -translate-y-1/2 visible"
              )}
            >
              <div className="p-10 flex flex-col gap-4">
                <ExclamationCircleIcon className="size-20 text-red-600 mx-auto" />

                <div>
                  <h3 className="text-3xl text-zinc-800 font-bold text-center">
                    {dangerous
                      ? "This product has associated orders"
                      : "Are you sure?"}
                  </h3>

                  <p className="text-lg font-medium text-center text-zinc-500">
                    {dangerous
                      ? "This product has associated orders. For security reasons, it cannot be permanently deleted."
                      : "This product has no associated orders. You can safely delete it permanently."}
                  </p>
                </div>

                {isLoading ? (
                  <Spinner
                    bounceColor="bg-indigo-600"
                    className="z-40 mx-auto"
                  />
                ) : (
                  <>
                    {alert.message ? (
                      <div className="w-80 mx-auto">
                        <Alert {...alert} />
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <form
                  onSubmit={handleDeletePermanently}
                  className={twMerge(
                    "opacity-0 -translate-y-10 invisible h-0 transition-all duration-300",
                    enterPassword && "opacity-100 translate-y-0 visible h-fit"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="password"
                      className="text-lg font-medium text-zinc-700"
                    >
                      Your password to confirm
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      placeholder="Your password"
                      className="py-2 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                    />
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-zinc-100 text-zinc-800 font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                      onClick={() => setEnterPassword(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Permanently
                    </button>
                  </div>
                </form>
                <div
                  className={twMerge(
                    "flex gap-4 justify-center opacity-0 -translate-y-10 invisible h-0 transition-all duration-300",
                    !enterPassword && "opacity-100 translate-y-0 h-fit visible"
                  )}
                >
                  {/* Botón de Cancelar */}
                  <button
                    className="px-4 py-2 bg-zinc-100 text-zinc-800 font-medium rounded-lg hover:bg-zinc-200 transition-colors"
                    onClick={closeAndReset}
                  >
                    Cancel
                  </button>

                  {/* Botón de Borrado Lógico */}
                  <button
                    type="button"
                    className={twMerge(
                      "bg-indigo-100 text-indigo-600 hover:bg-indigo-200 px-4 py-2 rounded-lg  font-medium transition-colors duration-300 cursor-pointer",
                      dangerous &&
                        "-200 text-white bg-indigo-600 hover:bg-indigo-700"
                    )}
                    onClick={handleLogicalDelete}
                  >
                    Mark as Deleted
                  </button>

                  {/* Button delete permanently */}
                  {!dangerous && (
                    <button
                      type="button"
                      onClick={() => setEnterPassword(true)}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Permanently
                    </button>
                  )}
                </div>

                {/* Mensaje adicional si hay órdenes asociadas */}
                {dangerous && (
                  <p className=" text-center text-zinc-500 font-medium mt-4">
                    Note: Marking as &quot;Deleted&quot; will hide the product
                    from customers but keep it in the database for historical
                    purposes.
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
};
