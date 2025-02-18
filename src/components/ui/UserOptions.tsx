"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import Link from "next/link";

interface Props {
  onSettingClick: () => void;
}

export const UserOptions = ({ onSettingClick }: Props) => {
  const { data: session } = useSession();
  const { clearCart } = useCartStore();
  const [showOptions, setShowOptions] = useState(false);
  const [documentWidth, setDocumentWidth] = useState(0);

  useEffect(() => {
    const loadDocumentWidth = () => {
      if (typeof window !== undefined) {
        const documentWidth = window.innerWidth;
        setDocumentWidth(documentWidth);
      }
    };
    loadDocumentWidth();
    document?.addEventListener("resize", loadDocumentWidth);
    return () => document.removeEventListener("resize", loadDocumentWidth);
  }, []);

  if (!session) return null;

  return (
    <div className="md:relative">
      <motion.button
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className={
          "size-6 lg:size-8 transition-all duration-300 flex justify-center items-center rounded-full"
        }
      >
        <Image
          src={session?.user?.image ?? "/placeholder-user.jpg"}
          alt={`Avatar from ${session?.user?.name}`}
          width={50}
          height={50}
          className="rounded-full size-6 lg:size-8 aspect-square object-cover"
        />
      </motion.button>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, y: -10, x: documentWidth <= 640 ? "-50%" : 0 }}
          animate={{
            opacity: 1,
            y: 20,
            x: documentWidth <= 640 ? "-50%" : 0,
          }}
          transition={{
            duration: 0.175,
          }}
          className={twMerge(
            "absolute h-auto  w-[calc(100%-20px)] max-w-80 md:w-80 border bg-white shadow-xl rounded-xl max-sm:left-1/2 sm:right-16 md:-right-4  max-sm:-translate-x-1/2 flex flex-col",
            documentWidth <= 640 ? "-translate-x-1/2" : "translate-x-0"
          )}
        >
          <div className="flex gap-4 items-center border-b py-5 px-4">
            <Image
              src={session?.user?.image ?? "/placeholder-user.jpg"}
              alt={`Avatar from ${session?.user?.name}`}
              width={50}
              height={50}
              className="rounded-full size-10 border aspect-square object-cover"
            />
            <div className="flex-col flex">
              <span className="text-zinc-800 font-medium">
                {session?.user?.name}
              </span>
              <span className="text-zinc-500 font-medium text-sm">
                {session?.user?.email}
              </span>
            </div>
          </div>

          {session.user.role === "ADMIN" ? (
            <Link
              href={"/dashboard"}
              className="flex gap-4 items-center text-zinc-700 font-medium border-b px-4 py-2 hover:bg-zinc-100 transition-colors"
            >
              <span className="size-10 flex justify-center items-center">
                <Squares2X2Icon className="size-5 text-zinc-500" />
              </span>
              Dashboard
            </Link>
          ) : (
            <></>
          )}
          <button
            type="button"
            onClick={() => {
              onSettingClick();
              setShowOptions(false);
            }}
            className="flex gap-4 items-center text-zinc-700 font-medium border-b px-4 py-2 hover:bg-zinc-100 transition-colors"
          >
            <span className="size-10 flex justify-center items-center">
              <Cog6ToothIcon className="size-5 text-zinc-500" />
            </span>
            Settings
          </button>

          <button
            type="button"
            className="flex gap-4 items-center text-zinc-700 font-medium px-4 py-2 rounded-b-xl hover:bg-zinc-100 transition-colors"
            onClick={() => {
              clearCart();
              signOut();
            }}
          >
            <span className="size-10 flex justify-center items-center">
              <ArrowRightStartOnRectangleIcon className="size-5 text-zinc-500" />
            </span>
            Sign out
          </button>
        </motion.div>
      )}
    </div>
  );
};
