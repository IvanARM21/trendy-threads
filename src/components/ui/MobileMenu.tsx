import { motion } from "motion/react";
import { Logo } from "./Logo";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { NAV_LINKS } from "@/constants";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface Props {
  onCloseClick: () => void;
  mobileMenu: boolean;
  onProfileClick: () => void;
}

export const MobileMenu = ({
  onCloseClick,
  mobileMenu,
  onProfileClick,
}: Props) => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <div
      className={twMerge(
        "fixed h-[100dvh] w-full z-50 bg-white transition-all duration-500  lg:hidden",
        mobileMenu ? "-translate-y-0" : "-translate-y-[120%]"
      )}
    >
      <div className="max-w-lg mx-auto px-4 h-screen flex flex-col gap-16 justify-between py-6">
        <div className=" flex justify-between items-center">
          <Logo className="text-2xl" />
          <button
            type="button"
            onClick={() => setTimeout(() => onCloseClick(), 50)}
          >
            <XMarkIcon className="size-10  text-zinc-700 rounded-md p-1 outline-2 hover:outline outline-offset-1 outline-indigo-600 hover:outline-indigo-400" />
          </button>
        </div>

        <nav className="flex flex-col justify-center gap-12 items-center h-full flex-1">
          {NAV_LINKS.map(({ label, href }, linkIndex) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * linkIndex,
              }}
            >
              <Link
                href={href}
                className={twMerge(
                  "relative font-medium text-xl text-zinc-600 hover:text-indigo-600 group cursor-pointer",
                  pathname === href && "text-indigo-600"
                )}
              >
                {label}

                <span
                  className={twMerge(
                    "absolute top-8 left-1/2 bg-indigo-600 h-0.5 w-0  transition-all duration-300 group-hover:w-1/2",
                    pathname === href && "w-1/2"
                  )}
                ></span>
                <span
                  className={twMerge(
                    "absolute top-8 right-1/2 bg-indigo-600 h-0.5 w-0 transition-all duration-300 group-hover:w-1/2",
                    pathname === href && "w-1/2"
                  )}
                ></span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {session.status === "authenticated" ? (
          <div className="flex justify-between gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  onCloseClick();
                  setTimeout(() => {
                    onProfileClick();
                  }, 200);
                }}
                className="bg-indigo-600 text-white px-6 py-3 text-sm  flex justify-center rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
              >
                Profile
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
            >
              <button
                type="button"
                onClick={() => signOut()}
                className="bg-indigo-100 px-6 py-3 text-sm  flex justify-center rounded-xl text-indigo-600 font-medium hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
              >
                Sign out
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="flex justify-between gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
            >
              <Link
                href={"/auth/sign-in"}
                className="bg-indigo-100 px-6 py-3 text-sm  flex justify-center rounded-xl text-indigo-600 font-medium hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
              >
                Sign In
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
            >
              <Link
                href={"/auth/sign-up"}
                className="bg-indigo-600 text-white px-6 py-3 text-sm  flex justify-center rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-300 cursor-pointer"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
