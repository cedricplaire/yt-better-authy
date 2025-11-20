import { HeaderBread } from "@/components/header-breadcrum";
import {
  DeletePostButton,
  PlaceHolderDeletePostButton,
} from "@/components/posts/delete-post-button";
import {
  EditPostButton,
  PlaceHolderEditPostButton,
} from "@/components/posts/edit-post-button";
import { PlaceHolderPublishPostButton, PublishPostButton } from "@/components/posts/publish-post-button";
import { ReturnButton } from "@/components/return-button";
import { Button } from "@/components/ui/button";
import { CountUserPosts, PostByIdWithName } from "@/data/posts-data";
import { auth } from "@/lib/auth";
import { Circle, CircleCheckBig } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postId = params.id;
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) redirect("/dashboard/auth/login");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    headers: headersList,
    body: {
      permission: {
        posts: ["update", "delete"],
      },
    },
  });

  const post = await PostByIdWithName(postId);
  if (!post) {
    redirect("/dashboard/posts");
  }
  const numUserPosts = await CountUserPosts(post.userId);
  if (numUserPosts === null) {
    const countError = "Error counting user posts.";
    throw new Error(countError);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <HeaderBread />

      <div className="grid auto-rows-min gap-4 md:grid-cols-3 p-2 pt-0">
        <div className="bg-muted/50 aspect-video rounded-xl grid-cols-1 p-2">
          <div className="flex-col flex content-center items-center justify-center space-y-4">
            <p className="text-center font-bold text-3xl text-gray-400">
              Author: <span className="ml-1">{post.user.name}</span>{" "}
            </p>
            <p className="inline-flex text-gray-400">
              Created At :{" "}
              <span className="ml-1 text-foreground">
                {post.createdAt.toLocaleDateString()}{" "}
              </span>
            </p>
            <p className="inline-flex text-gray-400">
              Last Modifications :{" "}
              <span className="ml-1 text-foreground">
                {post.updatedAt.toLocaleDateString()}{" "}
              </span>
            </p>
            {numUserPosts !== null && (
              <div className="inline-flex text-gray-400">
                <span className="font-bold">Total Posts by Author :</span>{" "}
                <span className="ml-1 text-foreground">{numUserPosts} </span>
              </div>
            )}
            <div className="flex items-center">
              {session.user.role === "ADMIN" ? (
                <Button size="sm" asChild>
                  <Link href={"/dashboard/admin/dashboard"}>
                    Admin Dashboard
                  </Link>
                </Button>
              ) : (
                <ReturnButton href={"/dashboard/posts/my-posts"} label="Back to My Posts" />
              )}
            </div>
          </div>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl gap-4 p-2">
          <div className="flex flex-col gap-4 justify-around h-full">
            {post.published ? (
              <div className="flex flex-row">
                <span className="text-gray-400">Status : </span>
                <CircleCheckBig className="mx-2 w-5 h-5 text-green-600" />
                <span className="font-bold text-foreground">Published </span>
              </div>
            ) : (
              <div className="flex flex-row">
                <span className="text-gray-400">Status : </span>
                <Circle className="mx-2 ml-2 w-5 h-5 text-green-600" />
                <span className="font-bold text-foreground">Draft </span>
              </div>
            )}
            <div className="flex flex-row">
              <span className="text-gray-400">Category : </span>
              <span className="ml-1 font-bold text-foreground">
                {" "}
                {post.category}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-muted/50 aspect-video rounded-xl gap-4 p-2">
          <div className="flex flex-col gap-4  justify-between h-full">
            <div className="flex flex-row p-2 justify-between h-full">
              <span className="text-gray-400 mr-2">Publish :</span>
              <span className="grid-cols-1 text-center">
                {!post.published ? (
                  <PublishPostButton postId={post.id} />
                ) : (
                  <PlaceHolderPublishPostButton />
                )}
              </span>
            </div>
            <div className="flex flex-row p-2 justify-between h-full">
              <span className="text-gray-400 mr-2">Edition :</span>
              {post.userId === session.user.id ? (
                <EditPostButton postId={post.id} />
              ) : (
                <PlaceHolderEditPostButton />
              )}
            </div>
            <div className="flex flex-row p-2 justify-between h-full">
              <span className="text-gray-400 mr-2">Delete :</span>
              {post.userId === session.user.id || FULL_POST_ACCESS ? (
                <DeletePostButton postId={post.id} />
              ) : (
                <PlaceHolderDeletePostButton />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-md w-full p-4 space-y-4 gap-2">
        <div className="items-center ml-10 p-2 text-left bg-gray-100 text-gray-800">
          <span className="absolute w-20 h-10 -ml-16 rounded-full -mt-2 drop-shadow-lg drop-shadow-black text-sm text-center items-center justify-items-center content-center border-2 border-gray-400 bg-gray-800 text-gray-100">
            Titre
          </span>
          <p about="post title" className="ml-6 flex flex-row indent-2">
            {post?.title}
          </p>
        </div>
        <div className="items-center ml-10 p-2 text-left bg-gray-100 text-gray-800">
          <span className="absolute w-20 h-10 -ml-16 rounded-full -mt-2 drop-shadow-lg drop-shadow-black text-sm text-center items-center justify-items-center content-center border-2 border-gray-400 bg-gray-800 text-gray-100">
            Subject
          </span>
          <p about="post subject" className="ml-6 flex flex-row indent-2">
            {post?.subject}
          </p>
        </div>
        <div className="items-center ml-10 p-2 text-left bg-gray-100 text-gray-800 overflow-y-scroll max-h-1/2">
          <span className="absolute w-20 h-10 -ml-16 rounded-full -mt-2 drop-shadow-lg drop-shadow-black text-sm text-center items-center justify-items-center content-center border-2 border-gray-400 bg-gray-800 text-gray-100">
            Content
          </span>
          <p about="post content" className="ml-6 flex flex-row indent-2">
            {post?.content}
          </p>
        </div>
      </div>
    </div>
  );
}
