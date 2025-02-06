"use client";

import { motion } from "motion/react";

const Newsletter = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10">
          <motion.img
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            src="/newsletter.jpg"
            className="rounded-xl"
          ></motion.img>

          <div className="flex flex-col justify-center gap-2">
            <motion.h2
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-center text-zinc-800 overflow-hidden mb-2"
            >
              Suscribe to our NewsLetter!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl font-medium text-zinc-500 w-full  text-center mb-4"
            >
              Suscribe to our Newsletter and receive noticies about our news and
              discounts
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-2">
              <motion.input
                initial={{ opacity: 0, flex: 0 }}
                whileInView={{ opacity: 1, flex: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                type="text"
                className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                placeholder="Your email"
              />
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
                type="button"
                className="text-nowrap text-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 font-medium rounded-lg py-3 px-6"
              >
                Subscribe me
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
