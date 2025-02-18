import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { auth } from "@/auth";

export default async function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log(session);
  if (!session) {
    redirect("/");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <SessionProvider session={session}>
        <DashboardLayout>{children}</DashboardLayout>
      </SessionProvider>
    </>
  );
}
