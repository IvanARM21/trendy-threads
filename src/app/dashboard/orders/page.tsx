import { OrdersTable } from "./ui/OrdersTable";
import { getOrdersDashboard } from "@/actions/order/getOrdersDashboard";

export default async function OrdersDashboardPage() {
  const orders = await getOrdersDashboard();

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-800">Orders List</h1>
      </div>

      {orders.length ? (
        <OrdersTable orders={orders} />
      ) : (
        <p className="text-xl mt-4 text-zinc-500 font-medium">
          There aren&apos;t orders at the moment
        </p>
      )}
    </>
  );
}
