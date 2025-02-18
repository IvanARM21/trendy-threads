import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ButtonState } from "@/app/auth/ui/ButtonState";
import { CreatePassword, UserProfile } from "@/interfaces/user.interface";
import { getFormState } from "@/utils";
import { createPassword } from "@/actions/user/createPassword";

interface Props {
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const CreatePasswordForm = ({ setUserData }: Props) => {
  const { register, handleSubmit, reset } = useForm<CreatePassword>();

  const { data: session } = useSession();

  const [formState, setFormState] = useState(getFormState("initial"));

  const onSubmit = async (formData: CreatePassword) => {
    try {
      formData.userId = session?.user.id ?? "";

      setFormState(getFormState("loading"));
      const res = await createPassword(formData);
      setFormState(getFormState("success", res.message));
      setTimeout(() => {
        setUserData(res.user);
        reset();
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
    <>
      <h3 className=" text-zinc-600 font-semibold my-6 text-xl">
        Create Password
      </h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="font-medium text-zinc-700">
            Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="py-2 md:w-1/2 placeholder:text-base text-zinc-600 font-bold placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            placeholder="Your new password"
            {...register("newPassword", {
              required: {
                value: true,
                message: "The new password cannot be empty",
              },
            })}
          />
        </div>

        <ButtonState
          {...formState}
          classNameSpinner="top-2"
          className="h-[40px] md:w-1/2"
        >
          Create Password
        </ButtonState>
      </form>
    </>
  );
};
