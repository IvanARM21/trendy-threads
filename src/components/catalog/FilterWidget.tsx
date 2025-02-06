"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  slug: string;
  title: string;
  options: {
    id: number;
    label: string;
  }[];
}

export const FilterWidget = ({ options, title }: Props) => {
  const [isShow, setIsShow] = useState(false);

  const onToggle = () => setIsShow(!isShow);

  return (
    <div className="border-b pb-6  mt-6 first-of-type:mt-0">
      <h3 className="text-xl text-zinc-800 font-semibold">
        <button
          type="button"
          onClick={onToggle}
          className="flex justify-between items-center w-full"
        >
          <span>{title}</span>
          {isShow ? (
            <MinusIcon className="size-6 text-zinc-400" />
          ) : (
            <PlusIcon className="size-6 text-zinc-400" />
          )}
        </button>
      </h3>

      <div
        className="space-y-4 overflow-hidden transition-all duration-300 animate-height"
        style={{
          height: isShow ? "auto" : "0",
        }}
      >
        {options.map((option) => (
          <div key={option.id} className="flex gap-3 items-center mt-4">
            <div className="flex h-5 shrink-0 items-center">
              <div className="group grid size-4 grid-cols-1">
                <input
                  id="filter-mobile-size-2"
                  name="size[]"
                  value="12l"
                  type="checkbox"
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-primary-500 checked:bg-primary-500 indeterminate:border-primary-500 indeterminate:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    className="opacity-0 group-has-[:checked]:opacity-100"
                    d="M3 8L6 11L11 3.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                    d="M3 7H11"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="filter-mobile-size-2"
              className="min-w-0 flex-1 text-gray-500"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
