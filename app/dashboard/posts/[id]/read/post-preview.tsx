import React from 'react';
import { Prisma } from "@/lib/generated/prisma/client";

export default function PostPreview({ post }: { post: Prisma.PostModel }) {
  return (
    <div className="pl-12 py-6 container mx-auto max-w-sceen-lg space-y-6">
      <div className="items-center p-2 text-left bg-gray-100 text-gray-800">
        <span className="absolute w-20 h-10 -ml-16 rounded-full -mt-2 text-sm text-center items-center justify-items-center content-center border-2 border-gray-400 bg-gray-800 text-gray-100">
          Titre
        </span>
        <p about="post title" className="ml-6 flex flex-row indent-2">
          {post?.title}
        </p>
      </div>
      <div className="items-center p-2 text-left bg-gray-100 text-gray-800">
        <span className="absolute w-20 h-10 -ml-16 rounded-full -mt-2 text-sm text-center items-center justify-items-center content-center border-2 border-gray-400 bg-gray-800 text-gray-100">
          Subject
        </span>
        <p about="post subject" className="ml-6 flex flex-row indent-2">
          {post?.subject}
        </p>
      </div>
      <div className="items-center p-2 text-left bg-gray-100 text-gray-800 overflow-y-scroll max-h-24">
        <span className="absolute w-20 h-10 -ml-16 rounded-full -mt-2 text-sm text-center items-center justify-items-center content-center border-2 border-gray-400 bg-gray-800 text-gray-100">
          Content
        </span>
        <p about="post content" className="ml-6 flex flex-row indent-2">
          {post?.content}
        </p>
      </div>
    </div>
  );
}
