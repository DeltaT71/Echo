"use client";
import { deletePost } from "@/lib/actions";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <EllipsisHorizontalIcon
        onClick={() => setOpen((prev) => !prev)}
        className="size-6 cursor-pointer"
      ></EllipsisHorizontalIcon>
      {open && (
        <div className="absolute top-4 left-0 bg-neutral-600 w-32 p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-50">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={deletePostWithId}>
            <button className="cursor-pointer text-red-500 font-bold">
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
