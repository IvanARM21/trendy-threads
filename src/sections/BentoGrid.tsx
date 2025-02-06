"use client";
import Image from "next/image";
import { motion } from "motion/react";

const BentoGrid = () => {
  return (
    <section className="py-24">
      <div className="container">
        <ul className="grid grid-cols-12 auto-rows-[15rem] gap-6">
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="col-span-12 sm:col-span-6 row-span-2 rounded-3xl overflow-hidden w-full h-full shadow-2xl relative cursor-pointer transition-all duration-300"
          >
            <motion.a
              initial={{ opacity: 0, inset: "auto" }}
              whileInView={{ opacity: 1, inset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href="/men"
              className="absolute z-10 inset-0 bg-gradient-to-b from-zinc-900/5 to-zinc-900/70"
            ></motion.a>
            <motion.a
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              href="/men"
              className="absolute text-white bottom-6 font-semibold left-1/2 -translate-x-1/2 text-nowrap w-full z-20 text-center sm:text-xl md:text-2xl overflow-hidden"
            >
              Men&apos;s Apparel
            </motion.a>
            <Image
              src="/bento/men-category.avif"
              alt="Men's Apparel"
              className="h-full w-full object-cover "
              width={500}
              height={700}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="col-span-12 sm:col-span-6 row-span-2 rounded-3xl overflow-hidden w-full h-full shadow-2xl relative cursor-pointer transition-all duration-300"
          >
            <motion.a
              initial={{ opacity: 0, inset: "auto" }}
              whileInView={{ opacity: 1, inset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href="/women"
              className="absolute z-10 inset-0 inset- bg-gradient-to-b from-zinc-900/5 to-zinc-900/70"
            ></motion.a>
            <motion.a
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              href="/women"
              className="absolute text-white bottom-6 font-semibold left-1/2 -translate-x-1/2 text-nowrap w-full z-20 text-center sm:text-xl md:text-2xl overflow-hidden"
            >
              Women&apos;s Apparel
            </motion.a>
            <Image
              src="/bento/women-category.avif"
              alt="Women's Apparel"
              className="h-full w-full object-cover "
              width={700}
              height={500}
            />
          </motion.li>

          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="col-span-12 sm:col-span-6 order-2 lg:order-1 lg:col-span-4 row-span-2  rounded-3xl overflow-hidden w-full h-full shadow-2xl relative cursor-pointer transition-all duration-300"
          >
            <motion.a
              initial={{ opacity: 0, inset: "auto" }}
              whileInView={{ opacity: 1, inset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href="/discounts"
              className="absolute z-10 inset-0 bg-gradient-to-b from-zinc-900/5 to-zinc-900/70"
            ></motion.a>
            <motion.a
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              href="/discounts"
              className="absolute text-white bottom-6 font-semibold left-1/2 -translate-x-1/2 text-nowrap w-full z-20 text-center sm:text-xl md:text-2xl overflow-hidden"
            >
              Discounts
            </motion.a>
            <Image
              src="/bento/discounts.jpg"
              alt="Discounts"
              className="h-full w-full object-cover "
              width={500}
              height={500}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="col-span-12 order-1 lg:order-2  lg:col-span-4 row-span-2  rounded-3xl overflow-hidden w-full h-full shadow-2xl relative cursor-pointer transition-all duration-300"
          >
            <motion.a
              initial={{ opacity: 0, inset: "auto" }}
              whileInView={{ opacity: 1, inset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href="/accessories"
              className="absolute z-10 inset-0 bg-gradient-to-b from-zinc-900/5 to-zinc-900/70"
            ></motion.a>
            <motion.a
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              href="/accessories"
              className="absolute text-white bottom-6 font-semibold left-1/2 -translate-x-1/2 text-nowrap w-full z-20 text-center sm:text-xl md:text-2xl overflow-hidden"
            >
              Accessories
            </motion.a>
            <Image
              src="/bento/accessories.avif"
              alt="Accessories"
              className="h-full w-full object-cover "
              width={500}
              height={500}
            />
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            className="col-span-12 sm:col-span-6 order-3 lg:col-span-4 row-span-2  rounded-3xl overflow-hidden w-full h-full shadow-2xl relative cursor-pointer transition-all duration-300"
          >
            <motion.a
              initial={{ opacity: 0, inset: "auto" }}
              whileInView={{ opacity: 1, inset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              href="/new-arrivals"
              className="absolute z-10 inset-0 bg-gradient-to-b from-zinc-900/5 to-zinc-900/70"
            ></motion.a>
            <motion.a
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              href="/new-arrivals"
              className="absolute text-white bottom-6 font-semibold left-1/2 -translate-x-1/2 text-nowrap w-full z-20 text-center sm:text-xl md:text-2xl overflow-hidden"
            >
              New Arrivals
            </motion.a>
            <Image
              src="/bento/a.avif"
              alt="New Arrivals"
              className="h-full w-full object-cover "
              width={500}
              height={500}
            />
          </motion.li>
        </ul>
      </div>
    </section>
  );
};

export default BentoGrid;
