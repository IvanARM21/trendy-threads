"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { UserOptions } from "./UserOptions";
import { ProfileModal } from "../modals/ProfileModal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";

export const Header = () => {
  const { data: session } = useSession();
  const { openCart, getTotalProducts } = useCartStore();
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  console.log(session);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <>
      <header className=" sticky top-0 z-30 min-h-20 bg-white flex items-center shadow-md">
        <div className="flex justify-between items-center w-full container">
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="hidden lg:flex justify-start items-center gap-5 md:w-1/3"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={twMerge(
                  "relative font-medium text-lg text-zinc-600 hover:text-indigo-600 group cursor-pointer",
                  loaded && pathname === href && "text-indigo-600"
                )}
              >
                {label}

                <span
                  className={twMerge(
                    "absolute top-7 left-1/2 bg-indigo-600 h-0.5 w-0  transition-all duration-300 group-hover:w-1/2",
                    loaded && pathname === href && "w-1/2"
                  )}
                ></span>
                <span
                  className={twMerge(
                    "absolute top-7 right-1/2 bg-indigo-600 h-0.5 w-0 transition-all duration-300 group-hover:w-1/2",
                    loaded && pathname === href && "w-1/2"
                  )}
                ></span>
              </Link>
            ))}
          </motion.nav>

          <div className="w-1/2 md:w-1/3 flex justify-center">
            <Logo />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="w-1/2 md:w-1/3 gap-4 md:gap-6 flex justify-end items-center"
          >
            <button type="button">
              <MagnifyingGlassIcon className="size-6 text-zinc-600" />
            </button>
            <button
              type="button"
              className="relative"
              onClick={() => {
                if (loaded) {
                  openCart();
                }
              }}
            >
              <span
                className={twMerge(
                  "absolute -top-3 -right-3 bg-indigo-600 rounded-full h-5 w-5 flex justify-center items-center text-white text-sm font-medium"
                )}
              >
                {loaded && getTotalProducts()}
              </span>
              <ShoppingBagIcon className="size-6 text-zinc-600" />
            </button>
            <motion.div className="gap-4 hidden lg:flex">
              {session ? (
                <UserOptions
                  onSettingClick={() => setProfileModal(!profileModal)}
                />
              ) : (
                <>
                  <Link
                    href={"/auth/sign-in"}
                    className="bg-indigo-100 px-4 py-2 rounded-lg text-indigo-600 font-medium hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={"/auth/sign-up"}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </motion.div>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMobileMenu(true)}
            >
              <Bars3CenterLeftIcon className="size-6 text-zinc-600" />
            </button>
          </motion.div>
        </div>
      </header>

      <MobileMenu
        mobileMenu={mobileMenu}
        onCloseClick={() => setMobileMenu(false)}
      />

      {profileModal && session && (
        <ProfileModal onSettingClick={() => setProfileModal(!profileModal)} />
      )}
    </>
  );
};
