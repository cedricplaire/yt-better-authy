"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { createPost, State } from "@/actions/create-post-action";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "../ui/textarea";
import { PostCategory } from "@/lib/generated/prisma/enums";

export default function CreatePostForm({ userId }: { userId: string }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState
  );

  return (
    <form action={formAction} className="max-w-sm w-full space-y-4">
      {state.message && (
        <div className="p-2 rounded-md bg-red-100 text-red-800 text-sm">
          {state.message}
        </div>
      )}
      <Input type="hidden" name="userId" id="userId" value={userId} />
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input name="title" id="title" defaultValue={""} />
      </div>
      {state.errors?.title && <p>{state.errors?.title}</p>}

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input name="subject" id="subject" defaultValue={""} />
      </div>
      {state.errors?.subject && <p>{state.errors?.subject}</p>}

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <select
          name="category"
          id="category"
          aria-label="Category"
          defaultValue={PostCategory.ALL}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {Object.values(PostCategory).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      {state.errors?.category && <p>{state.errors?.category}</p>}

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={"Enter your post content"}
          rows={8}
        />
      </div>
      {state.errors?.content && <p>{state.errors?.content}</p>}

      <div className="flex flex-col p-4 bg-gray-200 space-x-2 space-y-2">
        <div className="flex flex-row p-2 gap-2">
          <Switch
            name="published"
            id="published"
            defaultValue={"off"}
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
      {state.errors?.published && <p>{state.errors?.published}</p>}

      <Button
        title="create-post"
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        Create Post
      </Button>
    </form>
  );
}
