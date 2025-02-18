"use client";

import { newUserCreate } from "@/actions/user";
import { ButtonState } from "@/app/auth/ui/ButtonState";
import { Alert } from "@/components/ui/Alert";
import { CreateUser } from "@/interfaces/user.interface";
import { getFormState } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const NewUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>();

  const router = useRouter();
  const [formState, setFormState] = useState(getFormState("initial"));

  const onSubmit = async (formData: CreateUser) => {
    try {
      setFormState(getFormState("loading"));
      await newUserCreate(formData);
      setFormState(getFormState("success", "User are created successfully"));
      setTimeout(() => {
        router.replace("/dashboard/users");
        setFormState(getFormState("initial"));
      }, 3000);
    } catch (error) {
      setTimeout(() => setFormState(getFormState("initial")), 3000);
      if (error instanceof Error) {
        setFormState(getFormState("error", error.message));
        return;
      }
      setFormState(getFormState("error", "An unexpected error has ocurred"));
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 px-4 py-6 md:max-w-2xl w-full flex flex-col gap-4 mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-medium text-zinc-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="The name"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          {...register("name", {
            required: {
              value: true,
              message: "The name cannot be empty",
            },
          })}
        />
        {errors.name?.message?.length && (
          <Alert message={errors.name.message} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium text-zinc-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="The email"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          {...register("email", {
            required: {
              value: true,
              message: "The email cannot be empty",
            },
          })}
        />
        {errors.email?.message?.length && (
          <Alert message={errors.email.message} />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-lg font-medium text-zinc-700">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          placeholder="The phone"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          {...register("phone", {
            required: {
              value: true,
              message: "The phone cannot be empty",
            },
          })}
        />
        {errors.email?.message?.length && (
          <Alert message={errors.email.message} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium text-zinc-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="The password"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          {...register("password", {
            required: {
              value: true,
              message: "The password cannot be empty",
            },
            minLength: {
              value: 6,
              message: "The password must be at least 6 characters",
            },
          })}
        />
        {errors.password?.message?.length && (
          <Alert message={errors.password.message} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="role" className="text-lg font-medium text-zinc-700">
          Role
        </label>

        <select
          id="role"
          className="py-3 text-lg text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
          {...register("role", {
            required: {
              value: true,
              message: "The role cannot be empty",
            },
          })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        {errors.role?.message?.length && (
          <Alert message={errors.role.message} />
        )}
      </div>

      <ButtonState {...formState} className="mt-4">
        Create user
      </ButtonState>
    </form>
  );
};
