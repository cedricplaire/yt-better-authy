import { HeaderBread } from "@/components/header-breadcrum";
import { LoginForm } from "@/components/login-form";
import { ReturnButton } from "@/components/return-button";
import { SignInOAuthButton } from "@/components/sign-in-oauth-button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <HeaderBread />
      <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/" label="Home" />
          <h1 className="text-3xl font-bold">Login</h1>
        </div>

        <div className="space-y-4">
          <LoginForm />

          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/dashboard/auth/register"
              className="hover:text-foreground"
            >
              Register
            </Link>
          </p>
        </div>

        <hr className="max-w-sm" />

        <div className="flex flex-col max-w-sm gap-4">
          <SignInOAuthButton provider="google" />
          <SignInOAuthButton provider="github" />
        </div>
      </div>
    </>
  );
}
