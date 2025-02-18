import { auth } from "@/auth";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { SessionProvider } from "next-auth/react";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <CartSidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}
