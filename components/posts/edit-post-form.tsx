"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { State, updatePost } from "@/actions/create-post-action";
import { Prisma } from "@/lib/generated/prisma/client";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";

export default function UpdatePostForm({ post }: { post: Prisma.PostModel }) { 
  const initialState: State = { message: null, errors: {} };
  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, formAction, isPending] = useActionState(
    updatePostWithId,
    initialState
  );


  /*   async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
      evt.preventDefault();
      setIsPending(true);
  
      const formData = new FormData(evt.target as HTMLFormElement);
      const { error } = await updateNewPost(formData);
  
      if (error) {
        toast.error(error);
      } else {
        toast.success("post created successfully");
        (evt.target as HTMLFormElement).reset();
      }
  
      setIsPending(false);
      
      redirect("/posts");
    } */

  return (
    <form action={formAction} className="w-full space-y-4">
      <Input type="hidden" name="userId" id="userId" value={post.userId} />
      <Input type="hidden" name="Id" id="Id" value={post.id} />

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" defaultValue={post.title} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input name="subject" id="subject" defaultValue={post.subject || ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post.content}
          rows={8}
        />
      </div>

      <div className="flex flex-row p-4 bg-gray-200 space-x-2 space-y-2">
        <div className="flex flex-col justify-around space-x-4 gap-2 p-1">
          <div className="flex flex-row p-2 gap-2">
            <Switch
              name="published"
              id="published"
              defaultValue={String(post.published)}
              className="data-[state=checked]:border-green-800 data-[state=checked]:bg-green-600 data-[state=unchecked]:border-gray-800 data-[state=unchecked]:bg-gray-400"
            />
            <Label
              htmlFor="published"
              className="data-[state=checked]:text-green-800 text-gray-800"
            >
              Published ?
            </Label>
          </div>
          <span className="text-sm text-gray-500">
            Uncheck to create a draft and modify later.
          </span>
        </div>
        <div className="flex text-muted rounded-md gap-2">
          <span className="overflow-hidden p-1 text-left">
            When you publish your post, everybody can see it. if you don&apos;t
            want this, uncheck publish switch and come back later to modify your
            post and maybe publish it if you are ready
          </span>
        </div>
      </div>
      {state.errors?.published && <p>{state.errors?.published}</p>}

      <Button
        title="update-post"
        type="submit"
        className="flex items-center space-x-2 space-y-2 w-full"
        disabled={isPending}
      >
        Update Post
      </Button>
    </form>
  );
}
