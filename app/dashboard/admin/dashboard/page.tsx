"use server"

import { DeleteUserButton, PlaceholderDeleteUserButton } from "@/components/delete-user-button";
import { HeaderBread } from "@/components/header-breadcrum";
import { ReturnButton } from "@/components/return-button";
import { UserRoleSelect } from "@/components/user-role-select";
import { auth } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });


  if (!session) redirect("/dashboard/auth/login");

  if (session.user.role !== "ADMIN") {
    return (
      <>
        <HeaderBread />
        <div className="px-8 py-16 container mx-auto max-w-sceen-lg space-y-8">
          <div className="space-y-4">
            <ReturnButton href="/dashboard/profile" label="Profile" />
            <h1 className="text-3-xl font-bold">Admin Dashboard</h1>
            <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
              FORBIDEN
            </p>
          </div>
        </div>
      </>
    );
  }

  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
        sortBy: "name"
    }
  });
  const sortedUsers = await users.sort((a, b) => {
    if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
    if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
    return 0;
  });

  return (
    <>
      <HeaderBread />
      <div className="px-6 py-12 container mx-auto max-w-5xl space-y-6">
        <div className="space-y-4">
          <ReturnButton href="/dashboard/profile" label="Profile" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
            Access Granted
          </p>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">EMail</th>
                <th className="p-2 text-center">Role</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="border-b text-sm text-left">
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 text-center">
                    <UserRoleSelect role={user.role as UserRole} userId={user.id} />
                  </td>
                  <td className="px-4 py-2 text-center">
                  {user.role === "USER" ? (
                    <DeleteUserButton userId={user.id} />
                  ) : (
                    <PlaceholderDeleteUserButton />
                  )}
                </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
