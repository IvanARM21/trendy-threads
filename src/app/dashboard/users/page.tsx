import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default async function UsersDashboardPage() {
  const getUsers = async () => {
    "use server";
    return await prisma.user.findMany({});
  };

  const users = await getUsers();

  const role = {
    ADMIN: "Admin",
    USER: "User",
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-zinc-800">Users List</h1>
        <Link
          href={"/dashboard/users/new"}
          className="py-2 px-6 text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg text-lg font-medium flex items-center gap-2  justify-center"
        >
          Add user
        </Link>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="rounded-lg shadow-sm  min-w-[800px] w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 text-left font-semibold text-zinc-800">
                Nombre
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Email
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Phone
              </th>
              <th className="py-3 text-left font-semibold text-zinc-800">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3 text-zinc-800 font-medium">{user.name}</td>
                <td className="py-3 text-zinc-500 font-medium">{user.email}</td>
                <td className="py-3 text-zinc-500 font-medium">{user.phone}</td>
                <td className="py-3 text-zinc-500 font-medium flex justify-between">
                  {role[user.role]}

                  <div className="flex gap-4">
                    <Link href={`/dashboard/users/edit/${user.id}`}>
                      <PencilSquareIcon className="size-5 text-zinc-500 hover:text-indigo-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
