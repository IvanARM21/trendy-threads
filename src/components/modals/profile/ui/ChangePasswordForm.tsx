import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { changePassword } from "@/actions/user/changePassword";
import { ButtonState } from "@/app/auth/ui/ButtonState";
import { ChangePassword, UserProfile } from "@/interfaces/user.interface";
import { getFormState } from "@/utils";

interface Props {
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const ChangePasswordForm = ({ setUserData }: Props) => {
  const {
    register,
    handleSubmit,
    // TODO: formState: { errors },
    reset,
  } = useForm<ChangePassword>();

  const { data: session } = useSession();

  const [formState, setFormState] = useState(getFormState("initial"));

  const onSubmit = async (formData: ChangePassword) => {
    try {
      formData.userId = session?.user.id ?? "";

      setFormState(getFormState("loading"));
      const res = await changePassword(formData);
      setFormState(getFormState("success", res.message));
      setTimeout(() => {
        reset();
        setUserData(res.user);
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
        Change Password
      </h3>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="currentPassword"
            className="font-medium text-zinc-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="py-2 md:w-1/2 placeholder:text-base text-zinc-600 font-bold placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
            placeholder="Your current password"
            {...register("currentPassword", {
              required: {
                value: true,
                message: "The current password cannot be empty",
              },
            })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword" className="font-medium text-zinc-700">
            New Password
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
          Change password
        </ButtonState>
      </form>
    </>
  );
};
