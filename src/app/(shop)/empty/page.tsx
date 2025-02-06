import Link from "next/link";

export default function NamePage() {
  return (
    <section className="py-16 my-auto">
      <div className="container flex flex-col justify-center items-center gap-2">
        <h1 className="text-3xl text-center md:text-5xl font-bold  text-zinc-800">
          Your cart is empty
        </h1>
        <Link
          href="/"
          className="text-2xl font-medium text-zinc-500 underline hover:text-zinc-700 transition-colors"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
