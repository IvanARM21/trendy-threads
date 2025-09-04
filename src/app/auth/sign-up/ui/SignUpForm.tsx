"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Register } from "@/interfaces/user.interface";
import { emailPattern, getFormState } from "@/utils";
import { Alert } from "@/components/ui/Alert";
import { registerUser } from "@/actions/user/register";
import { useState } from "react";
import { ButtonState } from "../../ui/ButtonState";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Register>();

  const router = useRouter();

  const [formState, setFormState] = useState(getFormState("initial"));

  const onSubmit = async (formData: Register) => {
    try {
      setFormState(getFormState("loading"));
      const res = await registerUser(formData);
      setFormState(getFormState("success", res.message));
      setTimeout(() => {
        router.replace("/auth/sign-in");
        setFormState(getFormState("initial"));
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setFormState(getFormState("error", error.message));
        setTimeout(() => setFormState(getFormState("initial")), 3000);
        return;
      }
      setFormState(getFormState("error", "An unexpected error ocurred"));
      setTimeout(() => setFormState(getFormState("initial")), 3000);
    }
  };

  return (
    <form
      className="mt-6 px-6 py-12 md:px-12 bg-white shadow md:rounded-xl md:max-w-2xl w-full flex flex-col gap-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-medium text-zinc-700">
          Name
        </label>
        <input
          type="email"
          id="firstName"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          placeholder="Your first name"
          {...register("name", {
            required: {
              value: true,
              message: "The name cannot be empty",
            },
          })}
        />
        {errors.name && (
          <Alert error={true} message={errors.name.message ?? ""} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium text-zinc-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          placeholder="Your email"
          {...register("email", {
            required: { value: true, message: "The email cannot be empty" },
            pattern: { value: emailPattern(), message: "Invalid email format" },
          })}
        />
        {errors.email && (
          <Alert error={true} message={errors.email.message ?? ""} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium text-zinc-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="py-3 text-lg placeholder:text-base text-zinc-600 font-bold placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          placeholder="Your password"
          {...register("password", {
            required: { value: true, message: "The password cannot be empty" },
            minLength: { value: 6, message: "Password must be greater than 6" },
          })}
        />
        {errors.password && (
          <Alert error={true} message={errors.password.message ?? ""} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password2"
          className="text-lg font-medium text-zinc-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="password2"
          className="py-3 text-lg placeholder:text-base text-zinc-600 font-bold placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          placeholder="Confirm your password"
          {...register("password2", {
            required: {
              value: true,
              message: "The confirm password cannot be empty",
            },
            validate: (value) => {
              if (watch().password !== value) {
                return "Passwords don't match";
              }
              return true;
            },
          })}
        />
        {errors.password2 && (
          <Alert error={true} message={errors.password2.message ?? ""} />
        )}
      </div>
      <Link
        className="text-zinc-500 font-medium text-center"
        href="/auth/sign-in"
      >
        You have an account? Sign in here
      </Link>

      <ButtonState {...formState}>Sign Up</ButtonState>

      <div className="flex items-center">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">o</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { redirectTo: "/" })}
        className="py-3 h-[52px] relative px-6 text-zinc-500 hover:bg-zinc-100 border  transition-colors rounded-md text-lg font-medium flex items-center gap-2 w-full justify-center"
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width="30"
          height="30"
        />
        Sign in with Google
      </button>
    </form>
  );
};
