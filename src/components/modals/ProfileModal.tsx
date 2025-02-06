import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  UserCircleIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  PlusIcon,
  Bars3CenterLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

interface Props {
  onSettingClick: () => void;
}

export const ProfileModal = ({ onSettingClick }: Props) => {
  const { data: session } = useSession();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        className="bg-black/30 inset-0 z-30 absolute cursor-pointer as"
        onClick={onSettingClick}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: "-45%", x: "-50%" }}
        animate={{ opacity: 1, y: "-50%" }}
        transition={{
          duration: 0.3,
        }}
        className="px-4 flex justify-center items-center absolute z-40 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-4xl w-full"
      >
        <div className="flex max-w-4xl bg-white shadow w-full rounded-xl overflow-hidden h-[60vh]">
          <div
            className={twMerge(
              "min-w-64 py-8 bg-zinc-100 shadow absolute invisible md:visible md:opacity-100 opacity-0 md:relative -translate-x-full md:translate-x-0 h-[60vh] rounded-l-xl transition-all duration-300",
              showSidebar && "translate-x-0 opacity-100 visible"
            )}
          >
            <div className="px-6 mb-6 hidden md:block">
              <h2 className="text-2xl font-bold text-zinc-800">Your Account</h2>
              <p className="text-zinc-500 font-medium ">
                Manage your account info
              </p>
            </div>
            <nav className="flex flex-col gap-1 px-2">
              <button
                type="button"
                className="flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200"
              >
                <UserCircleIcon className="size-5" />
                Profile
              </button>
              <button
                type="button"
                className="flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200"
              >
                <ShieldCheckIcon className="size-5" />
                Security
              </button>
              <button
                type="button"
                className="flex gap-3 font-medium text-zinc-600 py-3 px-4 items-center rounded-md hover:bg-zinc-200"
              >
                <ShoppingBagIcon className="size-5" />
                Orders
              </button>
            </nav>
          </div>
          <div className="py-8 px-6 w-full flex flex-col">
            <div className="flex justify-between items-center mb-8 md:hidden">
              <h2 className="text-2xl font-bold text-zinc-800">Your Account</h2>
              <button
                type="button"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Bars3CenterLeftIcon className="size-6" />
              </button>
            </div>
            <div>
              <div className="border-b w-full pb-4 flex justify-between items-center">
                <h2 className="text-lg font-bold text-zinc-700">Profile</h2>
                <XMarkIcon
                  className="size-7 cursor-pointer hover:bg-zinc-100 rounded-md p-1"
                  onClick={onSettingClick}
                />
              </div>

              <div className="py-6 border-b flex justify-between items-center">
                <p className=" text-zinc-600 font-semibold">Name</p>
                <div className="flex gap-4 items-center">
                  <Image
                    src={session?.user.image ?? "/placeholder-user.jpg"}
                    alt={`Avatar from ${session?.user.name}`}
                    width={50}
                    height={50}
                    className="rounded-full size-10 border aspect-square object-cover"
                  />
                  <div className="flex-col flex">
                    <span className="text-zinc-600 font-semibold">
                      {session?.user.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-6 border-b flex justify-between items-center">
                <p className=" text-zinc-600 font-semibold">Email</p>
                <p className="text-zinc-500">{session?.user.email}</p>
              </div>

              <div className="py-6 flex justify-between items-center">
                <p className=" text-zinc-600 font-semibold">Phone</p>
                <button
                  type="button"
                  className="text-zinc-500 border px-4 py-2 rounded-xl items-center flex gap-1 text-nowrap hover:bg-zinc-50"
                >
                  <PlusIcon className="size-5" />
                  Add Phone
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
