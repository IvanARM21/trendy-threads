"use client";

import Link from "next/link";
import { DASHBOARD_LINKS } from "@/constants";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { usePreferencesStore } from "@/store/preferences";
import { useDashboardStore } from "@/store/dashboard";

export const SidebarDashboard = () => {
  const pathname = usePathname();

  const { preferences, setPreferences } = usePreferencesStore();
  const { showSidebar, hiddenSidebar } = useDashboardStore();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const smallSidebar = preferences?.smallSidebar ?? false;

  return (
    <>
      <div
        className={twMerge(
          "inset-0 bg-black/80 absolute z-20 -translate-x-full transition-all duration-300 opacity-60 xl:hidden",
          showSidebar && "translate-x-0 opacity-100"
        )}
        onClick={hiddenSidebar}
      >
        <button
          type="button"
          className={twMerge(
            "size-8 bg-black/20 absolute right-4 z-30 top-4 rounded-full flex items-center justify-center -translate-x-full",
            showSidebar && "translate-x-0"
          )}
        >
          <XMarkIcon className="size-6 text-white" />
        </button>
      </div>

      <aside
        className={twMerge(
          "bg-indigo-600 text-white w-[calc(100%-64px)] max-w-80  sm:w-80 z-30 py-4 fixed h-screen -translate-x-full xl:-translate-x-0 transition-all duration-300",
          smallSidebar && "sm:w-14 w-14",
          showSidebar && "-translate-x-0"
        )}
      >
        <button
          type="button"
          onClick={() => {
            setPreferences({ ...preferences, smallSidebar: !smallSidebar });
          }}
          className={twMerge(
            "text-2xl text-zinc-100 font-bold ml-4 w-full relative",
            smallSidebar && "ml-0"
          )}
        >
          <span
            className={twMerge(
              "overflow-hidden text-nowrap transition-all absolute left-0 w-[76px] duration-300 -top-4",
              smallSidebar &&
                "w-[14.20px] left-[calc(50%-5px)] -translate-x-1/2"
            )}
          >
            Trendy
          </span>
          <span
            className={twMerge(
              "text-zinc-800 overflow-hidden absolute text-nowrap transition-all left-[76px] w-[90px] duration-300 -top-4",
              smallSidebar &&
                " w-[9.10px] left-[calc(50%+10px)] -translate-x-1/2 "
            )}
          >
            {smallSidebar ? "threads" : "Threads"}
          </span>
        </button>

        <nav className="flex flex-col mt-10 gap-1 px-2">
          {DASHBOARD_LINKS.map(({ icon: Icon, href, label }) => (
            <Link
              href={href}
              key={href}
              onClick={hiddenSidebar}
              className={twMerge(
                "flex items-center gap-4 text-lg font-semibold p-2 rounded-md text-zinc-200 hover:bg-indigo-700 hover:text-white overflow-hidden text-nowrap",
                isActive(href) ? "bg-indigo-700 text-white" : ""
              )}
            >
              <Icon className="size-6 min-w-6 min-h-6" />
              <span
                className={twMerge(
                  "opacity-100 transition-all duration-300",
                  smallSidebar && "opacity-0"
                )}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};
