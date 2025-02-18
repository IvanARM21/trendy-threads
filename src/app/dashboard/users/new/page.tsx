import { NewUserForm } from "./ui/NewUserForm";

export default function NewUserPage() {
  return (
    <>
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-zinc-800">New user</h1>
      </div>

      <NewUserForm />
    </>
  );
}
