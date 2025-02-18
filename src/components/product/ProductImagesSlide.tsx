"use client";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "@/interfaces/product.interface";

interface Props {
  images: ProductImage[];
  name: string;
}

export const ProductImagesSlide = ({ images, name }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as CSSProperties
        }
        loop={true}
        spaceBetween={20}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image.url}>
            <Image
              src={image.url}
              alt={`Product image ${name}`}
              width={800}
              height={800}
              quality={80}
              sizes="(min-width: 480px) 448px, (min-width: 776px) 700px, (min-width: 1024px) 570px, (min-width: 1280px) 700px, (min-width: 1580px) 850px, 100vw"
              className="rounded-xl w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={20}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-5"
      >
        {images.map((image) => (
          <SwiperSlide key={image.url} className="relative shadow rounded-xl">
            <Image
              src={image.url}
              alt={`Product image ${name}`}
              width={210}
              height={322}
              sizes="(min-width: 776px) 160px, (min-width: 1580px) 200px, 100px"
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
