import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import { Post as PostType, User } from "../../../../generated/prisma";
import PostInteraction from "./PostInteraction";
import Comments from "./Comments";

//Create a type for the posts with included properties.
type FeedPostType = PostType & {
  user: User;
} & {
  likes: { userId: string }[];
} & {
  _count: { comments: number };
};

const Post = ({ post }: { post: FeedPostType }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src={post.user.avatar || "/No_avatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        <EllipsisHorizontalIcon className="size-6 cursor-pointer"></EllipsisHorizontalIcon>
      </div>
      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4 text-neutral-200">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            ></Image>
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      <PostInteraction
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNumber={post._count.comments}
      />
      <Comments postId={post.id}></Comments>
    </div>
  );
};

export default Post;
