import { HeaderBread } from "@/components/header-breadcrum";
import { LoginForm } from "@/components/login-form";
import { ReturnButton } from "@/components/return-button";
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

        <LoginForm />

        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/dashboard/auth/register" className="hover:text-foreground">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
