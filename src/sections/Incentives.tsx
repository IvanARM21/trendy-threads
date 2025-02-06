"use client";
import { motion } from "motion/react";
import { TruckIcon, GiftIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const Incentives = () => {
  return (
    <section className="pt-24">
      <div className="container">
        <div className="grid xl:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex justify-start xl:justify-between gap-4 items-center border rounded-xl p-7"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-14 h-14 bg-indigo-600 rounded-full block p-4"
            >
              <TruckIcon className="text-white w-6 h-6" />
            </motion.div>
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-xl sm:text-2xl font-semibold overflow-hidden"
              >
                Free Shipping
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-zinc-600 font-medium sm:text-lg"
              >
                We offer free shipping on purchases over $3000,00.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex justify-start xl:justify-between gap-4 items-center border rounded-xl p-5"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-14 h-14 bg-indigo-600 rounded-full block p-4"
            >
              <ArrowPathIcon className="text-white w-6 h-6" />
            </motion.div>
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-xl sm:text-2xl font-semibold"
              >
                Free Returns
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-zinc-600 font-medium sm:text-lg"
              >
                Free returns within the first 30 days of purchase.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex justify-start xl:justify-between gap-4 items-center border rounded-xl p-5"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-14 h-14 bg-indigo-600 rounded-full block p-4"
            >
              <GiftIcon className="size-6 text-white" />
            </motion.div>
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-xl sm:text-2xl font-semibold"
              >
                Discounts
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-zinc-600 font-medium sm:text-lg"
              >
                Get a 10% discount when you register for your first purchase.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Incentives;
