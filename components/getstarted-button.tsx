"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button size="lg" className="opacity-50" asChild>
        <span>Get Started</span>
      </Button>
    );
  }

  const href = session ? "/dashboard/profile" : "/dashboard/auth/login";

  return (
    <div className="flex flex-col items-center gap-4">
      <Button size="lg" asChild>
        <Link href={href}>Get Started</Link>
      </Button>

      {session && (
        <p className="flex items-center">
          <span
            data-role={session.user.role}
            className="size-6 mr-1 rounded-full animate-pulse data-[ROLE=USER]:bg-blue-500 data-[ROLE=ADMIN]:bg-green-500"
          />
          Welcome back, {session.user.name}! ‧₊˚♪ 𝄞₊˚⊹
        </p>
      )}
    </div>
  );
};
