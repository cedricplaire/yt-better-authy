import { ChangePasswordForm } from "@/components/change-password-form";
import { HeaderBread } from "@/components/header-breadcrum";
import { ReturnButton } from "@/components/return-button";
import { SignOutButton } from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/update-user-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/dashboard/auth/login");

  const FULL_PAGE_ACCESS = await auth.api.userHasPermission({
    headers: headersList,
    body: {
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  return (
    <>
      <HeaderBread />
      <div className="px-6 py-12 container mx-auto max-w-5xl space-y-6">
        <div className="space-y-4">
          <ReturnButton href="/dashboard" label="Home" />
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <div className="flex items-center gap-2">
          {session.user.role === "ADMIN" && (
            <Button size="sm" asChild>
              <Link href={"/dashboard/admin/dashboard"}>Admin Dashboard</Link>
            </Button>
          )}
          <SignOutButton />
        </div>
        <div className="text-2xl font-bold">Permissions</div>
        <div className="space-x-4">
          <Button size={"sm"}>
            <Link href={"/dashboard/posts/"}>Manage own Posts</Link>
          </Button>
          <Button disabled={!FULL_PAGE_ACCESS.success} size={"sm"}>
            <Link href={"/dashboard/posts/admin"}>Manage All Posts</Link>
          </Button>
        </div>

        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="user image"
            src={session?.user?.image}
            className="size-32 border-2 "
          />
        ) : (
          <div className="size-32 border border-md rounded-md bg-primary text-primary-foreground flex items-center justify-center">
            <span
              data-role={session.user.role}
              className="uppercase text-3xl font-bold animate-bounce data-[ROLE=USER]:text-blue-500 rounded-md data-[ROLE=ADMIN]:text-green-500"
            >
              {session.user?.name.slice(0, 2)}
            </span>
          </div>
        )}

        <pre className="text-sm overflow-clip">
          {JSON.stringify(session, null, 2)}
        </pre>

        <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-blue-600">
          <h2 className="text-2xl font-bold">Update User</h2>
          <UpdateUserForm
            name={session.user.name}
            image={session.user.image ?? ""}
          />
        </div>
        <div className="space-y-4 p-4 rounded-b-md border border-t-8 border-red-600">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
}
