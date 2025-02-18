"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImage } from "@/interfaces/product.interface";

interface Props {
  images: ProductImage[];
}

export const ProductImageHover = ({ images }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Image
      src={isHovered ? images[1].url : images[0].url}
      className=" aspect-[5/6] w-full object-cover rounded-xl animate-fade-in"
      alt=""
      width={400}
      height={400}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    />
  );
};
