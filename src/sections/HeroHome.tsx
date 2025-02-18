"use client";
import { motion } from "motion/react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import React from "react";
import Image from "next/image";

const HeroHome = () => {
  return (
    <section className=" min-h-[calc(100vh-80px)] relative  w-full bg-zinc-800">
      <div className="container absolute inset-0 overflow-y-clip">
        <div className="sm:z-20 flex flex-col justify-center items-center xl:items-start absolute top-[calc(100vw-65vw)] left-1/2 xl:left-auto xl:translate-x-0 -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 lg:bg-transparent max-w-2xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-5xl xl:text-6xl text-center xl:text-left font-semibold max-w-xl text-zinc-100"
          >
            Renew your Look with Exclusives Offers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-4 text-xl md:text-2xl text-zinc-300 w-full  text-center xl:text-left"
          >
            The best trends at amazing prices! Take advantage of our special
            offers and renew your style today.
          </motion.p>

          <motion.a
            href="/discounts"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="py-2 rounded-md px-4 text-white bg-indigo-600 text-lg font-medium flex items-center gap-2 w-fit mt-4"
          >
            See offers
            <ArrowRightIcon className="size-5" />
          </motion.a>
        </div>

        <a
          href="/women"
          className="z-10 absolute left-0 xl:left-auto xl:right-[440px] bottom-0 w-32 min-[400px]:w-40 min-[480px]:w-56 md:w-80 xl:w-[440px]  group cursor-pointer hover:opacity-100"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/women.png"
              alt="Women Category Image"
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 320px, 128px"
              className="bottom-0 absolute z-10 transition-all duration-300 group-hover:saturate-0"
              height={715}
              width={440}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/women.png"
              alt="Women Category Image"
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 320px, 128px"
              className="bottom-0 absolute blur-sm cursor-pointer transition-all duration-300 group-hover:saturate-0 group-hover:scale-105"
              height={715}
              width={440}
            />
          </motion.div>
        </a>
        <a
          href="/men"
          className="z-10 absolute right-0 xl:right-0  bottom-0 w-32 min-[400px]:w-40 min-[480px]:w-56 md:w-80 xl:w-[440px] group cursor-pointer hover:opacity-100"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/men.png"
              alt="Men Category Image"
              className="bottom-0 absolute z-10 transition-all duration-300 group-hover:saturate-0"
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 320px, 128px"
              width={440}
              height={850}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/men.png"
              alt="Men Category Image"
              sizes="(min-width: 1280px) 440px, (min-width: 768px) 320px, 128px"
              className="bottom-0 absolute blur-sm cursor-pointer transition-all duration-300 group-hover:saturate-0 group-hover:scale-105"
              width={440}
              height={850}
            />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default HeroHome;
