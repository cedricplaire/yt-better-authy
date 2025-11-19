import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { HeaderBread } from "@/components/header-breadcrum";
import { Badge, BadgeCheckIcon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  //ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { fetchAllMyPosts } from "@/data/posts-data";
import { ReadPostButton } from "@/components/posts/read-post-button";
import {
  EditPostButton,
  PlaceHolderEditPostButton,
} from "@/components/posts/edit-post-button";
import Link from "next/link";

export default async function Page(mapage: { mapage: React.ReactNode }) {
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
  const myPosts = await fetchAllMyPosts(session.user.id);
  if (!myPosts) {
    redirect("/dashboard/posts");
  }
  return (
    <>
      <HeaderBread />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className=" min-h-[1/4] h-1/3 aspect-video rounded-xl p-1 space-y-1 overflow-y-scroll">
          <p className="text-center font-bold text-3xl">Your Posts</p>
          {myPosts.map((post) => (
            <Item key={post.id} variant="outline">
              <ItemMedia variant="image">
                <Image
                  src={"/file.svg"}
                  width={14}
                  height={14}
                  alt="Post image"
                />
              </ItemMedia>
              <ItemContent className="flex flex-col space-y-2">
                <ItemTitle>
                  <span className="text-gray-400">Title : </span>
                  <span className="font-bold">{post.title}</span>
                  <div className="flex flex-row">
                    <span className="text-gray-400">Subject : </span>
                    <span className="ml-1 font-bold"> {post.subject} </span>
                  </div>
                </ItemTitle>

                <div className="flex flex-col md:flex-row space-x-2">
                  <div className="flex flex-row">
                    {post.published ? (
                      <div className="flex flex-row">
                        <BadgeCheckIcon className="mr-2 w-5 h-5 text-green-500" />
                        <span className="font-bold text-foreground">
                          Published{" "}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-row">
                        <Badge className="mr-2 w-5 h-5 text-green-500" />
                        <span className="font-bold">Draft </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row">
                    <span className="text-gray-400">Created At : </span>
                    <span className="ml-1 font-bold">
                      {post.createdAt.toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="text-gray-400">Category : </span>
                    <span className="ml-1 font-bold"> {post.category} </span>
                  </div>
                </div>
              </ItemContent>
              <ItemActions>
                <ReadPostButton postId={post.id} />
                <Link href={`/${post.id}/read`} />
                {FULL_POST_ACCESS ? (
                  <EditPostButton postId={post.id} />
                ) : (
                  <PlaceHolderEditPostButton />
                )}
              </ItemActions>
            </Item>
          ))}
          
        </div>
        <div className="bg-muted/50 min-h-3/4 h-2/3 text-center justify-center p-2 pt-4 flex-1 rounded-xl md:min-h-min">
        {mapage.mapage}
        </div>
      </div>
    </>
  );
}
