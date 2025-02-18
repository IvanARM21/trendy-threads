import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { useState } from "react";
import { getFormState } from "@/utils";
import { ButtonState } from "@/app/auth/ui/ButtonState";
import { addPhone } from "@/actions/user/addPhone";
import { Alert } from "@/components/ui/Alert";
import { UserProfile } from "@/interfaces/user.interface";

interface Props {
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const AddPhoneForm = ({ setUserData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ phone: string }>();
  const [formState, setFormState] = useState(getFormState("initial"));

  const onSubmit = async (formData: { phone: string }) => {
    setFormState(getFormState("loading"));
    const res = await addPhone(formData.phone);
    if (res.error) {
      setFormState(getFormState("error", res.message));
      setTimeout(() => setFormState(getFormState("initial")), 3000);
      return;
    }
    setFormState(getFormState("success", res.message));
    setTimeout(() => {
      setUserData(res.user);
      setFormState(getFormState("initial"));
    }, 3000);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 items-end"
    >
      <input
        type="text"
        id="phone"
        className="py-2 w-full md:w-1/2 text-zinc-600 font-medium placeholder:text-base placeholder:font-normal px-4 border rounded-md border-gray-300 placeholder:text-zinc-400 outline-none focus:ring-indigo-300 transition-colors duration-300 focus:border-transparent focus:ring-2"
        placeholder="Your phone Ex: +598 99 612 953"
        {...register("phone", {
          required: {
            value: true,
            message: "The phone cannot be empty",
          },
        })}
      />
      <div className="flex flex-col md:w-1/2 w-full">
        {errors.phone?.message?.length ? (
          <Alert message={errors.phone.message} />
        ) : (
          <></>
        )}
      </div>

      <ButtonState
        {...formState}
        classNameSpinner="top-2"
        className="md:w-1/2 h-[40px]"
      >
        Save phone
      </ButtonState>
    </motion.form>
  );
};
