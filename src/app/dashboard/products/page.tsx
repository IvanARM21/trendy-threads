import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductsTable } from "./ui/ProductsTable";
import { DeleteProduct } from "@/components/modals/DeleteProduct";
// const STATE_ICONS = {
//   DRAFT: { icon: PencilIcon, label: "Draft", color: "text-gray-600" },
//   ACTIVE: { icon: CheckCircleIcon, label: "Active", color: "text-teal-600" },
//   OUT_OF_STOCK: {
//     icon: ExclamationTriangleIcon,
//     label: "Out of Stock",
//     color: "text-yellow-600",
//   },
//   DISCONTINUED: {
//     icon: InformationCircleIcon,
//     label: "Discontinued",
//     color: "text-blue-600",
//   },
//   DELETED: { icon: XCircleIcon, label: "Deleted", color: "text-red-600" },
//   ARCHIVED: { icon: ArchiveBoxIcon, label: "Archived", color: "text-gray-600" },
// };

// const PRODUCT_STATES = [
//   "DRAFT",
//   "ACTIVE",
//   "OUT_OF_STOCK",
//   "DISCONTINUED",
//   "DELETED",
//   "ARCHIVED",
// ] as const;

export default async function ProductsDashboardPage() {
  const getProducts = async () => {
    "use server";
    return await prisma.product.findMany({
      include: {
        images: {
          take: 1,
          select: {
            url: true,
          },
        },
        sizes: {
          include: {
            size: true,
          },
        },
        category: true,
      },
      orderBy: {
        name: "asc",
      },
    });
  };

  const products = await getProducts();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-800">Products List</h1>
        <Link
          href={"/dashboard/products/new"}
          className="py-2 px-6 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2  justify-center"
        >
          Add pruduct
        </Link>
      </div>
      <ProductsTable products={products} />
      <DeleteProduct />
    </>
  );
}
