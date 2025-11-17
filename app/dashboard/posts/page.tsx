import { HeaderBread } from "@/components/header-breadcrum";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReturnButton } from "@/components/return-button";
import Link from "next/link";
import {
  fetchPostPagination,
  fetchPostsPage,
  threeLatestPost,
} from "@/data/posts-data";
import Pagination from "@/components/pagination";
import { ReadPostButton } from "@/components/posts/read-post-button";
import {
  EditPostButton,
  PlaceHolderEditPostButton,
} from "@/components/posts/edit-post-button";
import { PostCategory } from "@/lib/generated/prisma/enums";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || " ";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPostsPage(query);
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
  const userPosts = await fetchPostPagination(query, currentPage);
  if (!userPosts) {
    redirect("/dashboard");
  }
  const latestMusic = await threeLatestPost(PostCategory.ENTERTAINMENT);
  const latestIT = await threeLatestPost(PostCategory.TECHNOLOGY);
  if (!latestMusic || !latestIT) {
    return <span>Error fetching posts</span>;
  }

  return (
    <>
      <HeaderBread />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Music Post</p>

            {latestMusic.map((postM) => (
              <div key={postM.id} className="grid-cols-2 grid">
                <span className="grid-cols-1">{postM.user.name} </span>
                <span className="grid-cols-1">{postM.title} </span>
              </div>
            ))}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Latest Informatique Post</p>
            {latestIT.map((postM) => (
              <div key={postM.id} className="grid-cols-2 grid">
                <span className="grid-cols-1">{postM.user.name} </span>
                <span className="grid-cols-1">{postM.title} </span>
              </div>
            ))}
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl">
            <p className="text-center">Informations News</p>
          </div>
        </div>
        <div className="bg-muted/50 min-h-screen text-center justify-center p-2 pt-4 flex-1 rounded-xl md:min-h-min">
          <div className="space-y-4">
            <ReturnButton href="/dashboard/profile" label="Profile" />
            <h1 className="text-3-xl font-bold">All Your Posts</h1>
            <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
              Access Granted
            </p>
            <Button title="create-post" className="w-full px-3 py-2">
              <Link className="w-full h-full" href={"/dashboard/posts/create"}>
                Create Post
              </Link>
            </Button>
          </div>
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="p-2 hidden md:table-cell">ID</th>
                <th className="p-2">Date Create</th>
                <th className="p-2">Published</th>
                <th className="p-2">Title</th>
                <th className="p-2 hidden md:table-cell">Subject</th>
                <th className="p-2">Category</th>
                <th className="p-2 hidden md:table-cell">Content</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post.id} className="border-b text-sm text-left">
                  <td className="p-2 hidden md:table-cell">{`${post.id.slice(
                    0,
                    6
                  )} ...`}</td>
                  <td className="p-2">{post.createdAt.toLocaleDateString()}</td>
                  <td className="p-2">{post.published ? "True" : "False"}</td>
                  <td className="p-2">{post.title}</td>
                  <td className="p-2 hidden md:table-cell">{`${post.subject?.slice(
                    0,
                    20
                  )} ...`}</td>
                  <td className="p-2">{post.category}</td>
                  <td className="p-2 hidden md:table-cell">{`${post.content.slice(
                    0,
                    50
                  )} ...`}</td>

                  <td className="p-2 grid grid-cols-2">
                    <span className="p-2 grid-cols-1">
                      <ReadPostButton postId={post.id} />
                    </span>
                    <span className="grid-cols-1 p-2">
                      {FULL_POST_ACCESS ? (
                        <EditPostButton postId={post.id} />
                      ) : (
                        <PlaceHolderEditPostButton />
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </>
  );
}
