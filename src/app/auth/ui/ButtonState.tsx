interface Props {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  children: React.ReactNode;
  className?: string;
  classNameSpinner?: string;
}

import { Spinner } from "@/components/ui/Spinner";
import React from "react";
import { twMerge } from "tailwind-merge";

export const ButtonState = ({
  isError,
  isLoading,
  isSuccess,
  message,
  children,
  className = "",
  classNameSpinner = "",
}: Props) => {
  return (
    <button
      className={twMerge(
        "py-3 h-[52px] relative px-6 text-zinc-100 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-md text-lg font-medium flex items-center gap-2 w-full justify-center",
        isSuccess && "bg-emerald-600 hover:bg-emerald-600",
        isError && "bg-red-600 hover:bg-red-600",
        className
      )}
    >
      {isLoading ? (
        <Spinner
          className={twMerge("absolute top-4", classNameSpinner)}
          bounceColor="bg-zinc-100"
        />
      ) : message.length && (isSuccess || isError) ? (
        message
      ) : (
        children
      )}
    </button>
  );
};
