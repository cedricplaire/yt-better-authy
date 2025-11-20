"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Presentation } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface ReadPostButtonProps {
  postId: string;
}

export const PreviewPostButton = ({ postId }: ReadPostButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant={"outline"}
          className="size-8 rounded-md border-2 border-gray-600"
        >
          <Link href={`/posts/${postId}/read`}>
            <Presentation stroke="green" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Reading Post</TooltipContent>
    </Tooltip>
  );
};
