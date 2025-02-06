import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-zinc-800 mt-20">
      <div className="container py-20">
        <div className="grid text-center sm:text-left sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10">
          <div className="sm:col-span-2 md:col-span-1 xl:col-span-2">
            <div className="text-2xl font-bold text-zinc-300 ">
              Trendy<span className="text-indigo-600">Threads</span>
            </div>
            <span className="text-sm lg:text-lg text-zinc-400 font-medium">
              This page&apos;s fake, just to show our development skills
            </span>
          </div>

          <div>
            <h3 className="text-xl text-zinc-300 font-bold">Links</h3>
            <div className="flex gap-4 flex-col mt-4">
              <a
                href=""
                className="text-sm lg:text-lg text-zinc-400 font-medium "
              >
                Privacity Policy
              </a>
              <a
                href=""
                className="text-sm lg:text-lg text-zinc-400 font-medium "
              >
                Terms and Conditions
              </a>

              <a
                href=""
                className="text-sm lg:text-lg text-zinc-400 font-medium "
              >
                Order Tracking
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl text-zinc-300 font-bold">Find us</h3>
            <ul className="flex gap-4 flex-col mt-4">
              <li className="text-sm lg:text-lg text-zinc-400 font-medium">
                Avda Italia 542, Montevideo Urugugay
              </li>
              <li className="text-sm lg:text-lg text-zinc-400 font-medium">
                + 598 99 612 953
              </li>

              <li className="text-sm lg:text-lg text-zinc-400 font-medium">
                trendythreads@gmail.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-zinc-300 font-bold">Social Networks</h3>
            <div className="flex gap-4 flex-col mt-4">
              <a
                href=""
                className="text-sm lg:text-lg text-zinc-400 font-medium "
              >
                Facebook
              </a>
              <a
                href=""
                className="text-sm lg:text-lg text-zinc-400 font-medium "
              >
                Instagram
              </a>
              <a
                href=""
                className="text-sm lg:text-lg text-zinc-400 font-medium "
              >
                Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-10 border-t border-zinc-700">
          <div className="flex flex-col-reverse md:flex-row gap-8 items-center justify-between">
            <div className="text-zinc-400 text-sm lg:text-lg font-medium text-balance text-center">
              © 2024 TrendyThreads Inc. All rights reserved.
            </div>
            <p className="text-zinc-400 font-medium text-sm lg:text-lg">
              Desarrollado por{" "}
              <a
                href="https://ivexus-studio.vercel.app/"
                target="_blank"
                className="text-indigo-600  font-bold"
              >
                Ivexus Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
