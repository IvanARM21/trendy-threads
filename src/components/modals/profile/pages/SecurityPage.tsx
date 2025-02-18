import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import { ChangePasswordForm } from "../ui/ChangePasswordForm";
import { CreatePasswordForm } from "../ui/CreatePasswordForm";
import { UserProfile } from "@/interfaces/user.interface";

interface Props {
  toggleSidebar: () => void;
  hasPassword: boolean;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const SecurityPage = ({
  toggleSidebar,
  hasPassword,
  setUserData,
}: Props) => {
  return (
    <div className="py-8 px-6 w-full flex flex-col">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-zinc-700">Security</h2>
        <button type="button" onClick={toggleSidebar} className=" md:hidden">
          <Bars3CenterLeftIcon className="size-6" />
        </button>
      </div>

      <>
        {hasPassword ? (
          <ChangePasswordForm setUserData={setUserData} />
        ) : (
          <CreatePasswordForm setUserData={setUserData} />
        )}
      </>
    </div>
  );
};
