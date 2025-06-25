"use client";
import {
  ArrowUturnLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { Comment, User } from "../../../../generated/prisma";
import { useUser } from "@clerk/nextjs";
import { createComment } from "@/lib/actions";
import Link from "next/link";

type CommentWithUserList = Comment & {
  user: User;
};

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUserList[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [descState, setDescState] = useState("");

  const addComment = async () => {
    if (!user || !descState) return;

    addOptimisticComment({
      id: Math.random(),
      desc: descState,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        avatar: user.imageUrl || "/No_avatar.png",
        name: "",
        surname: "",
        username: "Sending Please Wait...",
        work: "",
        description: "",
        city: "",
        cover: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await createComment(descState, postId);
      setCommentState((prev) => [createdComment, ...prev]);
      optimisticComment.map((comment) => console.log(comment));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUserList) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={user?.imageUrl || "/No_avatar.png"}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            ></Image>
          </div>
          <form
            action={addComment}
            className="flex flex-1 gap-2 items-center justify-between text-sm px-6 py-2 w-full bg-neutral-700 rounded-xl focus-within:ring-1 focus-within:ring-teal-300 transition-all"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="bg-transparent flex-1 outline-none"
              onChange={(e) => setDescState(e.target.value)}
            />
            <FaceSmileIcon className="size-6 cursor-pointer text-teal-300"></FaceSmileIcon>
          </form>
        </div>
      )}
      {/* COMMENTS */}
      {optimisticComment.map((comment) => {
        return (
          <div key={comment.id}>
            {/* COMMENT */}
            <div className="flex justify-between gap-4 mt-4">
              {/* AVATAR */}
              <Link href={`/profile/${comment.user.username}`}>
                <Image
                  src={comment.user.avatar || "/No_avatar.png"}
                  alt=""
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                ></Image>
              </Link>
              {/* DESC */}
              <div className="flex flex-1 flex-col gap-4">
                <span className="font-medium">
                  {comment.user.name && comment.user.surname
                    ? comment.user.name + " " + comment.user.surname
                    : comment.user.username}
                </span>
                <p>{comment.desc}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
                    <HandThumbUpIcon className="size-4 cursor-pointer"></HandThumbUpIcon>
                    <span className="flex gap-1">0</span>
                  </div>
                  <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
                    <ArrowUturnLeftIcon className="size-4 cursor-pointer"></ArrowUturnLeftIcon>
                    <span className="flex gap-1">0</span>
                  </div>
                </div>
              </div>
              {/* ICON */}
              <EllipsisHorizontalIcon className="size-5 cursor-pointer"></EllipsisHorizontalIcon>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CommentList;
