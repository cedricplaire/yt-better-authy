import { HeaderBread } from "@/components/header-breadcrum";
import { ReturnButton } from "@/components/return-button";
import { SendVerificaionEmailForm } from "@/components/send-verification-email-form";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: Promise<{ error: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const error = (await searchParams).error;

  if (!error) redirect("/dashboard/auth/profile")

  return (
    <>
      <HeaderBread />
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/dashboard/auth/login" label="Login" />
          <h1 className="text-3xl font-bold">Verify Email !</h1>
        </div>
        <div className="text-destrutive">
          {error === "invalid_token" || error === "token_expired"
            ? "Your token is invalid or expired, Please request a new one."
            : error === "email_not_verified"
            ? "please verify your email or request a new verification below"
            : "Oup's something went wrong, please try again."}
        </div>

        <SendVerificaionEmailForm />
      </div>
    </>
  );
}
