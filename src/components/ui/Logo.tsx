import { motion } from "motion/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export const Logo = ({ className = "" }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href="/"
        className={twMerge(
          "text-xl lg:text-2xl text-zinc-700 font-bold flex justify-center",
          className
        )}
      >
        Trendy
        <span className="text-indigo-600 underline underline-offset-2">
          Threads
        </span>
      </Link>
    </motion.div>
  );
};
