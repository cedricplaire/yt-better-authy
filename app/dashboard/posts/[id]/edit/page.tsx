import UpdatePostForm from "@/components/posts/edit-post-form";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReturnButton } from "@/components/return-button";
import Link from "next/link";
import { fetchPostById } from "@/data/posts-data";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/dashboard/posts");

  const FULL_PAGE_ACCESS = await auth.api.userHasPermission({
    headers: headersList,
    body: {
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  const post = await fetchPostById(id);

  if (post?.userId !== session.user.id && !FULL_PAGE_ACCESS.success) {
    return (
      <div className="px-8 py-16 container mx-auto max-w-sceen-lg space-y-8">
        <div className="space-y-4">
          <ReturnButton href="/dashboard/posts" label="posts" />
          <h1 className="text-3-xl font-bold">Edit Post</h1>
          <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
            Forbiden - You do not have authorizations for editing this post
          </p>
        </div>
      </div>
    );
  }
  
  if (!post) {
    notFound();
  }
  return (
    <div className="px-8 py-16 container mx-auto max-w-sceen-lg space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/dashboard/posts" label="posts" />
        <h1 className="text-3-xl font-bold">Edit Post</h1>
        <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
          Access Granted
        </p>
        <Button title="create-post" type="submit" className="w-full px-3 py-2">
          <Link href={"/dashboard/posts/create"}>Create New Post</Link>
        </Button>
      </div>
      <div className="px-2 py-4 mx-auto space-y-6">
        <UpdatePostForm post={post} />
      </div>
    </div>
  );
}
