import {
  UserCircleIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { PageState } from "@/interfaces/general.interface";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Props {
  changePage: (newPage: PageState) => void;
  showSidebar: boolean;
  renderPage: PageState;
}

export const ProfileSidebar = ({
  changePage,
  showSidebar,
  renderPage,
}: Props) => {
  const { data } = useSession();

  return (
    <div
      className={twMerge(
        "min-w-52 py-8 bg-zinc-100 shadow z-50 absolute invisible md:visible md:opacity-100 opacity-0 md:relative -translate-x-full md:translate-x-0 h-[60vh] rounded-l-xl transition-all duration-300",
        showSidebar && "translate-x-0 opacity-100 visible"
      )}
    >
      <div className="px-6 mb-6 hidden md:block">
        <h2 className="text-2xl font-bold text-zinc-800">Your Account</h2>
      </div>
      <nav className="flex flex-col gap-1 px-2">
        <button
          type="button"
          onClick={() => changePage("profile")}
          className={twMerge(
            "flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200",
            renderPage === "profile" && "bg-zinc-200"
          )}
        >
          <UserCircleIcon className="size-5" />
          Profile
        </button>
        {data?.user.role === "ADMIN" && (
          <Link
            href="/dashboard"
            className={
              "flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200 lg:hidden"
            }
          >
            <Squares2X2Icon className="size-5" />
            Dashboard
          </Link>
        )}
        <button
          type="button"
          onClick={() => changePage("security")}
          className={twMerge(
            "flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200",
            renderPage === "security" && "bg-zinc-200"
          )}
        >
          <ShieldCheckIcon className="size-5" />
          Security
        </button>
        <button
          type="button"
          onClick={() => changePage("orders")}
          className={twMerge(
            "flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200",
            renderPage === "orders" && "bg-zinc-200"
          )}
        >
          <ShoppingBagIcon className="size-5" />
          Orders
        </button>
      </nav>
    </div>
  );
};
