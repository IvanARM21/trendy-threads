import { prisma } from "@/lib/prisma";
import { NewProductForm } from "./ui/NewProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({});
  const sizes = await prisma.size.findMany({});

  return (
    <>
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800">New product</h1>
      </div>

      <NewProductForm categories={categories} sizes={sizes} />
    </>
  );
}
