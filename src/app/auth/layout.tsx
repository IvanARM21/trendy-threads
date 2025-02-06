import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center py-20">
      <Link
        href="/"
        className="mb-2 text-xl lg:text-2xl text-zinc-700 font-bold flex justify-center"
      >
        Trendy
        <span className="text-indigo-600">Threads</span>
      </Link>
      {children}
    </section>
  );
}
