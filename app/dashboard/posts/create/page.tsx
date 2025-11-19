import { HeaderBread } from "@/components/header-breadcrum";
import CreatePostForm from "@/components/posts/create-post-form";
import { ReturnButton } from "@/components/return-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) throw new Error("Unauthorized");

  const authorId = session.user.id;
  return (
    <div className="px-8 flex flex-1 flex-col gap-4 space-y-8">
      <HeaderBread />
      <div className=" flex flex-row space-x-4 space-y-4">
        <ReturnButton href="/dashboard/posts" label="Posts List" />
      </div>
      <div className="p-4 mx-auto space-y-6">
        <h1 className="text-5xl font-bold">Create New Post</h1>
        <CreatePostForm userId={authorId} />
      </div>
    </div>
  );
}
