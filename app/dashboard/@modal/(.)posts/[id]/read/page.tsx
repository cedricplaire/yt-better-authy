import React from "react";
import PostPreview from "@/app/dashboard/posts/[id]/read/post-preview";
import { PostByIdWithName } from "@/data/posts-data";
import { redirect } from "next/navigation";
import Modal from "@/components/modal-post";


export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const postId = params.id;

  const post = await PostByIdWithName(postId);
  if (!post) {
    redirect("/dashboard/posts");
  }

  return (
    <Modal>
        <PostPreview post={post} />
    </Modal>
  );
}
