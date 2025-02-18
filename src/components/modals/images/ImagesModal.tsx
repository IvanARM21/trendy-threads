import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { twMerge } from "tailwind-merge";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface Props {
  showModalImages: boolean;
  setHiddenModal: () => void;
  files: File[];
  images: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagesDeleteFromDB?: (url: string) => void;
  imagesDeleteFromDB?: string[];
}

export const ImagesModal = ({
  showModalImages,
  setHiddenModal,
  files,
  images,
  setFiles,
  setImagesDeleteFromDB,
  imagesDeleteFromDB = [],
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [imageURLsDB, setImageURLsDB] = useState<string[]>([]);

  useEffect(() => {
    if (imageURLsDB.length === 0) {
      setImageURLsDB([...images]);
    }
  }, [images, imageURLsDB.length]);

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(showModalImages);
    }, 50);
  }, [showModalImages]);

  useEffect(() => {
    if (files && files.length) {
      // Clear previous URLs
      imageURLs.forEach((url) => URL.revokeObjectURL(url));

      // Create temporary URLs for each file
      const urls = files.map((file) => URL.createObjectURL(file));
      setImageURLs(urls);

      // Clean up temporary URLs when the component is unmounted
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [files, imageURLs]);

  const deleteImage = (imageURL: string) => {
    // Find imageIndex
    const imageURLIndex = imageURLs.findIndex(
      (imageURLState) => imageURLState === imageURL
    );

    // Check if index exists
    if (imageURLIndex === -1) {
      return;
    }
    // Clear memory
    imageURLs.forEach((url) => URL.revokeObjectURL(url));

    // Clear files
    const imageURLsUpdated = files.filter(
      (_, index) => index !== imageURLIndex
    );
    setFiles(imageURLsUpdated);
  };

  const deleteImageDB = (imageURL: string) => {
    if (setImagesDeleteFromDB) {
      const imagesUrlsDBUpdated = imageURLsDB.filter(
        (imageURLState) => imageURLState !== imageURL
      );
      setImageURLsDB(imagesUrlsDBUpdated);
      setImagesDeleteFromDB(imageURL);
    }
  };

  const totalImages = useMemo(
    () => files.length + images.length - imagesDeleteFromDB.length,
    [files, images, imagesDeleteFromDB]
  );

  useEffect(() => {
    if (totalImages <= 0) {
      setHiddenModal();
    }
  }, [totalImages, setHiddenModal]);

  return (
    <>
      {/* Overlay */}
      <div
        className={twMerge(
          "inset-0 z-30 cursor-pointer fixed opacity-0 -translate-y-full bg-black/80 transition-all duration-300",
          showModalImages && "opacity-100 -translate-y-0"
        )}
        onClick={setHiddenModal}
      ></div>

      {/* Modal Content */}
      <div
        className={twMerge(
          "rounded-xl max-w-5xl h-[70vh] w-full z-40 bg-white hidden transition-all duration-300 fixed left-1/2 top-1/2 -translate-y-[calc(50%-40px)] opacity-0 -translate-x-1/2",
          showModalImages && "block",
          openModal && "-translate-y-1/2 opacity-100"
        )}
        role="dialog"
        aria-modal="true"
      >
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="h-full"
        >
          {imageURLsDB.map((src, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center p-2 relative"
              >
                <Image
                  src={src}
                  alt={`Product image ${index + 1}`}
                  className="mx-auto rounded-lg"
                  width={600}
                  height={800}
                  quality={90}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "auto",
                  }}
                  loading="lazy"
                />
                <button
                  className="absolute top-4 left-4 cursor-pointer hover:text-red-600 font-medium text-zinc-500"
                  onClick={() => deleteImageDB(src)}
                >
                  Delete
                </button>
              </SwiperSlide>
            );
          })}
          {imageURLs.map((src, index) => {
            return (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center p-2 relative"
              >
                <Image
                  src={src}
                  alt={`Product image ${index + 1}`}
                  className="mx-auto rounded-lg"
                  width={400}
                  height={800}
                  quality={80}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "auto",
                  }}
                  loading="lazy"
                />
                <button
                  className="absolute top-4 left-4 cursor-pointer hover:text-red-600 font-medium text-zinc-500"
                  onClick={() => deleteImage(src)}
                >
                  Delete
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
