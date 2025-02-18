import { getProductById } from "@/actions/product/getProduct";
import { EditProductForm } from "./ui/EditProductForm";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditProductByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories, sizes] = await Promise.all([
    getProductById(id),
    prisma.category.findMany({}),
    await prisma.size.findMany({}),
  ]);

  if (!product) redirect("/dashboard/products");

  return (
    <>
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800">Edit product</h1>
      </div>

      <EditProductForm
        product={product}
        categories={categories}
        sizes={sizes}
      />
    </>
  );
}
