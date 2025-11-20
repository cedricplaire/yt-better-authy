"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { DeletePostButtonAction } from "@/actions/delete-post-action";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface DeletePostButtonProps {
  postId: string;
}

export const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  async function handleClick() {
    setIsPending(true);
    const { error } = await DeletePostButtonAction({ postId });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Post Deleted Successfully");
    }
    setIsPending(false);
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={"destructive"}
          className="size-8 rounded-md border-2 border-gray-400 hover:cursor-pointer"
          disabled={isPending}
          onClick={handleClick}
        >
          <span className="sr-only">Delete Post</span>
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete Post (cannot be cancelled !)</TooltipContent>
    </Tooltip>
  );
};

export const PlaceHolderDeletePostButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={"destructive"}
          className="size-8 rounded-md border-2 border-gray-400 hover:cursor-pointer"
          disabled
        >
          <span className="sr-only">Delete Post</span>
          <TrashIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>You dont have authorization</TooltipContent>
    </Tooltip>
  );
};
