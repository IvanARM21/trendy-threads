import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface Props {
  error?: boolean;
  message: string;
}

export const Alert = ({ message, error = true }: Props) => {
  return (
    <div
      className={twMerge(
        "py-3 px-2 bg-emerald-50 rounded-md text-emerald-700 font-medium text-sm flex gap-1 items-center",
        error && "bg-red-50 text-red-700"
      )}
    >
      {error ? (
        <ExclamationCircleIcon className="size-6 text-red-500" />
      ) : (
        <CheckCircleIcon className="size-6 text-emerald-500" />
      )}
      {message}
    </div>
  );
};
