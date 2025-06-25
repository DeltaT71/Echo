import Image from "next/image";
import React, { Suspense } from "react";
import { Post as PostType, User } from "../../../../generated/prisma";
import PostInteraction from "./PostInteraction";
import Comments from "./Comments";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

//Create a type for the posts with included properties.
type FeedPostType = PostType & {
  user: User;
} & {
  likes: { userId: string }[];
} & {
  _count: { comments: number };
};

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId: currentUserId } = await auth();
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center gap-4 justify-between">
        <Link href={`/profile/${post.user.username}`}>
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
        </Link>
        {currentUserId === post.userId && (
          <PostInfo postId={post.id}></PostInfo>
        )}
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
      <Suspense fallback="Loading...">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
        <Comments postId={post.id}></Comments>
      </Suspense>
    </div>
  );
};

export default Post;
