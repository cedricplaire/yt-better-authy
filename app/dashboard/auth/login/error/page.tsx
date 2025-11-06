import { HeaderBread } from "@/components/header-breadcrum";
import { ReturnButton } from "@/components/return-button";
import React from "react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;
  return (
    <>
      <HeaderBread />
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/dashboard/auth/login" label="Login" />
          <h1 className="text-3xl font-bold">Login Error !</h1>
        </div>
        <div className="text-destrutive">
          {sp.error === "account_not_linked"
            ? "This account is already linked to another signIn method."
            : "Oup's something went wrong, please try again."}
        </div>
      </div>
    </>
  );
}
