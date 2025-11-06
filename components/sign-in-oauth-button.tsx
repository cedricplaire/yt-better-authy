"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

interface SignInOAuthButtonProps {
  provider: "google" | "github";
  signUp?: boolean;
}

export const SignInOAuthButton = ({
  provider,
  signUp,
}: SignInOAuthButtonProps) => {
    const [isPending, setIsPending] = useState<boolean>(false);
  const action = signUp ? "Up" : "In";
  const providerName = provider === "google" ? "Google" : "Github";

  async function handleClick() {
    setIsPending(true);
    await signIn.social({
        provider,
        callbackURL: "/dashboard/profile",
        errorCallbackURL: "/dashboard/auth/login/error"
    });
    setIsPending(false);
  }

  return <Button onClick={handleClick} disabled={isPending}>
    Sign {action} with {providerName}
  </Button>;
};
