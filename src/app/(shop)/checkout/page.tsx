import { redirect } from "next/navigation";
import { CheckoutForm } from "./ui/CheckoutForm";
import { OrderList } from "./ui/OrderList";
import { auth } from "@/auth";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session) redirect("/auth/sign-in");
  return (
    <section className="py-16">
      <div className="grid lg:grid-cols-2 gap-20 container">
        <CheckoutForm session={session} />
        <OrderList />
      </div>
    </section>
  );
}
