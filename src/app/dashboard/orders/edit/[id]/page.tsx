import { prisma } from "@/lib/prisma";
import { EditOrderForm } from "./ui/EditOrderForm";

export default async function EditOrderByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id: id },
    select: {
      id: true,
      tax: true,
      total: true,
      subtotal: true,
      shipping: true,
      discount: true,
      addressId: true,
      userId: true,
      paymentStatus: true,
      fulfillmentStatus: true,
      orderProducts: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              images: {
                select: { url: true },
                take: 1,
              },
            },
          },
          size: {
            select: {
              label: true,
            },
          },
        },
      },
      address: true,
    },
  });

  const userAddresses = await prisma.userAddress.findMany({
    where: { userId: order?.userId },
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800">Edit order</h1>
      </div>
      <EditOrderForm order={order} userAddresses={userAddresses} />
    </>
  );
}
