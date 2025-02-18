import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { AddPhoneForm } from "../ui/AddPhoneForm";
import { User, UserProfile } from "@/interfaces/user.interface";

interface Props {
  userData: User | null;
  toggleSidebar: () => void;
  setUserData: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

export const ProfilePage = ({
  userData,
  toggleSidebar,
  setUserData,
}: Props) => {
  const [addPhone, setAddPhone] = useState(false);

  if (!userData) {
    return null;
  }
  return (
    <div className="py-8 px-6 w-full flex flex-col">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-zinc-700">Profile</h2>
        <button type="button" onClick={toggleSidebar} className=" md:hidden">
          <Bars3CenterLeftIcon className="size-6" />
        </button>
      </div>
      <div className="py-6 border-b flex justify-between items-center">
        <p className=" text-zinc-600 font-semibold">Name</p>
        <div className="flex gap-4 items-center">
          <Image
            src={userData.image ?? "/placeholder-user.jpg"}
            alt={`Avatar from ${userData.name}`}
            width={50}
            height={50}
            className="rounded-full size-10 border aspect-square object-cover"
          />
          <div className="flex-col flex">
            <span className="text-zinc-600 font-semibold">{userData.name}</span>
          </div>
        </div>
      </div>

      <div className="py-6 border-b flex justify-between items-center">
        <p className=" text-zinc-600 font-semibold">Email</p>
        <p className="text-zinc-500">{userData.email}</p>
      </div>

      <div className="py-6 flex justify-between items-start">
        <p className=" text-zinc-600 font-semibold">Phone</p>
        {userData.phone?.length ? (
          <p className="text-zinc-500">{userData.phone}</p>
        ) : (
          <div className="flex flex-col gap-4 items-end">
            <button
              type="button"
              onClick={() => setAddPhone(!addPhone)}
              className="w-fit bg-indigo-100 px-4 py-2 rounded-lg text-indigo-600 font-medium hover:bg-indigo-200 transition-colors duration-300 cursor-pointer"
            >
              {!addPhone ? "Add phone" : "Cancel"}
            </button>
          </div>
        )}
      </div>
      {userData.phone?.length ? (
        <></>
      ) : (
        <>{addPhone ? <AddPhoneForm setUserData={setUserData} /> : <></>}</>
      )}
    </div>
  );
};
