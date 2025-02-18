import { redirect } from "next/navigation";
import { CheckoutForm } from "./ui/CheckoutForm";
import { OrderList } from "./ui/OrderList";
import { auth } from "@/auth";
import { getUserAddresses } from "@/actions/user/address";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) redirect("/auth/sign-in");
  const userAddresses = await getUserAddresses(session.user.id ?? "");
  return (
    <section className="py-16">
      <div className="grid lg:grid-cols-2 gap-20 container">
        <CheckoutForm session={session} userAddresses={userAddresses} />
        <OrderList />
      </div>
    </section>
  );
}
