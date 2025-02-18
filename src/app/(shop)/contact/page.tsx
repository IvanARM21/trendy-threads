import { ButtonState } from "@/app/auth/ui/ButtonState";

export default function ContactUsPage() {
  return (
    <>
      <section className="py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center  text-zinc-800 mb-2">
            Contact us
          </h1>
          <p className="text-xl text-zinc-500 font-medium text-center max-w-2xl mx-auto">
            Have any questions or doubts? Feel free to reach out to us! Our team
            is always available to assist you and ensure you have the best
            shopping experience
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid  gap-6">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex gap-2 items-center text-xl text-zinc-500 font-medium">
                Phone:{" "}
                <span className="text-zinc-600 font-bold">+598 99 612 953</span>
              </div>
              <div className="flex gap-2 items-center text-xl text-zinc-500 font-medium">
                Email:{" "}
                <span className="text-zinc-600 font-bold">
                  ivexusstudio@gmail.com
                </span>
              </div>
              <div className="flex gap-2 items-center text-xl text-zinc-500 font-medium">
                Address:{" "}
                <span className="text-zinc-600 font-bold">
                  Avda. Italia 1742, Montevideo, Uruguay
                </span>
              </div>

              <div className="flex gap-2 items-center text-xl text-zinc-500 font-medium">
                Social Networks:{" "}
                <div className="flex gap-2 items-center text-zinc-600 font-bold">
                  <div>Instagram</div>
                  <div>Facebook</div>
                </div>
              </div>
            </div>

            <form action="" className="space-y-4 max-w-2xl mx-auto w-full">
              <div className="flex flex-col gap-2">
                <label
                  className="text-lg font-medium text-zinc-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-lg font-medium text-zinc-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                  placeholder="Tu email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-lg font-medium text-zinc-700"
                  htmlFor="phone"
                >
                  Número
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                  placeholder="Tu número"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-lg font-medium text-zinc-700"
                  htmlFor="message"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
                  placeholder="Tu mensaje"
                  rows={4}
                  required
                ></textarea>
              </div>

              <ButtonState
                isError={false}
                isSuccess={false}
                isLoading={false}
                message=""
              >
                Send message
              </ButtonState>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
