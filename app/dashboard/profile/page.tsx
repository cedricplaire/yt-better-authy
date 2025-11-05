"use server"

import { HeaderBread } from "@/components/header-breadcrum";
import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });


  if (!session) redirect("/dashboard/auth/login");

  return (
    <>
    <HeaderBread />
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/" label="Home" />
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

          <SignOutButton />

          <pre className="text-sm overflow-clip">
            {JSON.stringify(session, null, 2)}
          </pre>
      </div>
    </>
  );
}
