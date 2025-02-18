"use client";

import { SidebarDashboard } from "@/components/dashboard/SidebarDashboard";
import { useDashboardStore } from "@/store/dashboard";
import { usePreferencesStore } from "@/store/preferences";

import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  const { data: session } = useSession();

  const { openSidebar } = useDashboardStore();
  const { preferences, toggleSidebar } = usePreferencesStore();

  useEffect(() => {
    document.addEventListener("keydown", toggleSidebar);
    return () => {
      document.removeEventListener("keydown", toggleSidebar);
    };
  }, [toggleSidebar]);

  const smallSidebar = preferences?.smallSidebar ?? false;

  return (
    <>
      {/* Sidebar */}
      <SidebarDashboard />

      <div className="flex flex-col w-full">
        {/* Navbar */}
        <header
          className={twMerge(
            "bg-white z-10 shadow-sm border fixed top-0 xl:left-80 w-full xl:w-[calc(100%-320px)] h-16 px-4 sm:px-8 flex items-center transition-all duration-300",
            smallSidebar && "xl:left-14 xl:w-[calc(100%-56px)]"
          )}
        >
          <div className="flex justify-between items-center w-full">
            <button
              className=" text-zinc-400 mr-4 pr-4 border-r xl:hidden"
              onClick={openSidebar}
            >
              <Bars3CenterLeftIcon className="size-6" />
            </button>
            <form className="flex gap-2 items-center flex-1">
              <label
                htmlFor="search"
                aria-label="Search"
                className="cursor-pointer"
              >
                <MagnifyingGlassIcon className="size-5 text-zinc-400" />
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search..."
                className="border-0 focus:outline-0 py-2 w-full text-zinc-500 font-medium"
              />
            </form>
            <div className="flex gap-3 items-center">
              <Image
                src={session?.user.image ?? "/placeholder-user.jpg"}
                alt=""
                className="size-8 rounded-full"
                width={32}
                height={32}
              />
              <p className="text-zinc-700 font-semibold hidden sm:block">
                {session?.user.name}
              </p>
              <ChevronDownIcon className="size-5 text-zinc-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={twMerge(
            "px-4 sm:px-8 xl:ml-80 mt-24 transition-all duration-300",
            smallSidebar && "xl:ml-14"
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
};
