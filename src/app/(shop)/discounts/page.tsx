import Link from "next/link";

export default function DiscountsPage() {
  return (
    <section className="pt-14 pb-24">
      <div className="container">
        <div className="flex flex-col justify-between items-center w-full bg-gray-50">
          <div className="w-full">
            <h1 className="text-3xl text-left mb-4 md:text-4xl font-bold  text-zinc-800">
              Discounts
            </h1>
            <p>{`Sorry, at the moment the discounts aren't available... It'll be available soon :)`}</p>

            <Link
              href="/"
              className="text-xl text-zinc-700 mt-4 block rounded-xl underline font-semibold"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
