import { getUserById } from "@/actions/user";
import { UpdateUserForm } from "./ui/UpdateUserForm";

export default async function EditUserByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await getUserById(id);
  return (
    <>
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800">Edit user</h1>
      </div>

      {/* <NewUserForm /> */}
      <UpdateUserForm userData={user} />
    </>
  );
}
