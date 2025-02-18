"use client";

import dynamic from "next/dynamic";

const HeroHome = dynamic(() => import("@/sections/HeroHome"), { ssr: true });
const Incentives = dynamic(() => import("@/sections/Incentives"), {
  ssr: false,
});
const BentoGrid = dynamic(() => import("@/sections/BentoGrid"), { ssr: false });
const Newsletter = dynamic(() => import("@/sections/Newsletter"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <Incentives />
      <BentoGrid />
      <Newsletter />
    </>
  );
}
