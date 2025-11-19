"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { createPost, State } from "@/actions/create-post-action";
import { Switch } from "@/components/ui/switch";
//import { Textarea } from "../ui/textarea";
import { PostCategSelect } from "./post-categ-select";
import { Editable, useEditor } from "@wysimark/react";

export default function CreatePostForm({ userId }: { userId: string }) {
  const WYSITOKEN = "PRTV_FhnkKmwubOAt9Acc_rIjDsIST1K9evOrmzk8qkLUKsGwAdoX8";
  const [markdown, setMarkdown] = useState<string>("");
  const editor = useEditor({
    authToken: WYSITOKEN,
  });
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
        <Label className="mb-0" htmlFor="category">
          Category
        </Label>
        <PostCategSelect />
      </div>
      {state.errors?.category && <p>{state.errors?.category}</p>}

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Editable
          editor={editor}
          value={markdown}
          onChange={setMarkdown}
          className="min-h-[220px] text-foreground border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
        />

        {/* <Textarea
          id="content"
          name="content"
          defaultValue={"Enter your post content"}
          rows={8}
        /> */}
      </div>
      {state.errors?.content && <p>{state.errors?.content}</p>}

      <div className="flex flex-col p-4 bg-gray-200 space-x-2 space-y-2">
        <div className="flex flex-row p-2 gap-2">
          <Switch
            name="published"
            id="published"
            defaultValue={"off"}
            className=" data-[state=checked]:border-green-800 data-[state=checked]:bg-green-600 data-[state=unchecked]:border-gray-800 data-[state=unchecked]:bg-gray-400"
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
