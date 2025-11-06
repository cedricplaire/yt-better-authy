import { HeaderBread } from "@/components/header-breadcrum";
import { ReturnButton } from "@/components/return-button";
import React from "react";

export default async function Page() {
  return (
    <>
      <HeaderBread />
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/dashboard/auth/login" label="Login" />
          <h1 className="text-3xl font-bold">Success.</h1>
        </div>
        <p className="text-muted-foreground">
        Succes, You have sent a reset link to your EMail.
        </p>
      </div>
    </>
  );
}
