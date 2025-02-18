"use client";

import { useForm } from "react-hook-form";
import {
  CreateProduct,
  PartialProduct,
  Size,
  SizeForm,
} from "@/interfaces/product.interface";
import { Alert } from "@/components/ui/Alert";
import { ButtonState } from "@/app/auth/ui/ButtonState";
import { useEffect, useState } from "react";
import { getFormState } from "@/utils";
import { Category } from "@/interfaces/category.interface";
import { SizeSelect } from "@/components/dashboard/product/SizeSelect";
import { PRODUCT_STATES, STATE_ICONS } from "@/constants";
import { ImagesModal } from "@/components/modals/images/ImagesModal";
import { useRouter } from "next/navigation";
import { ImagesSelect } from "@/components/dashboard/product/ImagesSelect";
import { updateProduct } from "@/actions/product/updateProduct";

interface Props {
  product: PartialProduct;
  categories: Category[];
  sizes: Size[];
}

export const EditProductForm = ({ product, categories, sizes }: Props) => {
  const { images, ...rest } = product;
  void images;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProduct>({
    defaultValues: { ...rest },
  });

  const router = useRouter();

  const [formState, setFormState] = useState(getFormState("initial"));
  const [showModalImages, setShowModalImages] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [imagesURLs, setImagesURLs] = useState<string[]>([]);
  const [imagesDeleteFromDB, setImagesDeleteFromDB] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<SizeForm[]>([]);

  useEffect(() => {
    if (selectedSizes.length === 0 && product.sizes) {
      const sizesFormatted = product.sizes.map(
        ({ stock, size: { id, label, order } }) => ({ id, label, order, stock })
      );
      setSelectedSizes(sizesFormatted);
    }
    if (imagesURLs.length === 0 && product.images) {
      const imagesURLs = product?.images.map(({ url }) => url);
      setImagesURLs(imagesURLs);
    }
  }, [selectedSizes, imagesURLs, product.sizes, product.images]);

  useEffect(() => {
    const productTitle = watch("name");
    if (productTitle.length) {
      const slug = productTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      setValue("slug", slug);
    }
  }, [watch, setValue]);

  const onSubmit = async (data: CreateProduct) => {
    try {
      setFormState(getFormState("loading"));
      const formData = new FormData();

      // We fill the formdata
      files.map((file) => formData.append("files[]", file));
      formData.append("imagesDelete", JSON.stringify(imagesDeleteFromDB));
      formData.append(
        "data",
        JSON.stringify({ ...data, id: product.id, sizes: selectedSizes })
      );
      // Call server action
      const res = await updateProduct(formData);
      setFormState(getFormState("success", res.message));
      setTimeout(() => {
        setFormState(getFormState("initial"));
        router.replace("/dashboard/products");
      }, 3000);
    } catch (error) {
      setTimeout(() => setFormState(getFormState("initial")), 3000);
      if (error instanceof Error) {
        setFormState(getFormState("error", error.message));
        return;
      }
      setFormState(getFormState("error", "An unexpected error has ocurred"));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 px-4 py-6 md:max-w-2xl w-full flex flex-col gap-4 mx-auto"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lg font-medium text-zinc-700">
            Title
          </label>
          <input
            type="text"
            id="name"
            placeholder="Product title"
            className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            {...register("name", { required: "The name cannot be empty" })}
          />
          {errors.name?.message && <Alert message={errors.name.message} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="slug" className="text-lg font-medium text-zinc-700">
            Slug
          </label>
          <div className="flex flex-nowrap py-3 bg-white text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus-within:ring-indigo-300 transition-colors duration-300 focus-within:border-transparent focus-within:ring-2">
            <label htmlFor="slug" className="text-zinc-500">
              https://trendythreads.com/products/
            </label>
            <input
              id="slug"
              type="text"
              className="placeholder:font-normal outline-0 pl-1.5 text-zinc-800 w-full"
              placeholder="beautiful-product"
              {...register("slug", {
                required: "The slug cannot be empty",
                value: watch("name"),
              })}
            />
          </div>
          {errors.slug?.message && <Alert message={errors.slug.message} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-lg font-medium text-zinc-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Product price"
            className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            {...register("price", {
              required: "The price cannot be empty",
              valueAsNumber: true,
            })}
          />
          {errors.price?.message && <Alert message={errors.price.message} />}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-lg font-medium text-zinc-700">
            Gender
          </label>
          <select
            id="gender"
            className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            {...register("gender", {
              required: "The gender cannot be empty",
            })}
          >
            <option value="MEN">Men</option>
            <option value="WOMEN">Women</option>
          </select>
          {errors.gender?.message && <Alert message={errors.gender.message} />}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="categoryId"
            className="text-lg font-medium text-zinc-700"
          >
            Category
          </label>
          <select
            id="categoryId"
            className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            {...register("categoryId", {
              required: "The category cannot be empty",
            })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId?.message && (
            <Alert message={errors.categoryId.message} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-lg font-medium text-zinc-700"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Product description"
            className="py-3 text-lg resize-none text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            {...register("description", {
              required: "The description cannot be empty",
            })}
          />
          {errors.description?.message && (
            <Alert message={errors.description.message} />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="highlighted"
            className="text-lg font-medium text-zinc-700"
          >
            Is Highlighted
          </label>
          <label
            htmlFor="highlighted"
            className="relative w-12 h-7 cursor-pointer"
          >
            <input
              type="checkbox"
              id="highlighted"
              className="sr-only peer"
              {...register("isHighlighted")}
            />
            <div className="w-12 h-7 bg-gray-300 rounded-full transition peer-checked:bg-indigo-600"></div>
            <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:left-6"></div>
          </label>
        </div>

        <SizeSelect
          sizes={sizes}
          selectedSizes={selectedSizes}
          setSelectedSizes={setSelectedSizes}
        />

        <ImagesSelect
          files={files}
          setFiles={setFiles}
          images={imagesURLs}
          imagesDeleteFromDB={imagesDeleteFromDB}
          openModal={() => setShowModalImages(!showModalImages)}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="state" className="text-lg font-medium text-zinc-700">
            Product state
          </label>
          <select
            id="state"
            value={"DRAFT"}
            className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            {...register("state", {
              required: "The state cannot be empty",
            })}
          >
            {PRODUCT_STATES.map((state) => (
              <option key={state} value={state}>
                {STATE_ICONS[state as keyof typeof STATE_ICONS].label}
              </option>
            ))}
          </select>
          {errors.state?.message && <Alert message={errors.state.message} />}
        </div>

        <ButtonState {...formState} className="mt-4">
          Save Product
        </ButtonState>
      </form>

      <ImagesModal
        files={files}
        setFiles={setFiles}
        images={imagesURLs}
        showModalImages={showModalImages}
        setHiddenModal={() => setShowModalImages(false)}
        imagesDeleteFromDB={imagesDeleteFromDB}
        setImagesDeleteFromDB={(url: string) =>
          setImagesDeleteFromDB([...imagesDeleteFromDB, url])
        }
      />
    </>
  );
};
