import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src="https://images.pexels.com/photos/20742131/pexels-photo-20742131/free-photo-of-little-wings.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-medium">Amanda</span>
        </div>
        <EllipsisHorizontalIcon className="size-6 cursor-pointer"></EllipsisHorizontalIcon>
      </div>
      {/* DESCRIPTION */}
      <div className="flex flex-col gap-4 text-neutral-200">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/31864618/pexels-photo-31864618/free-photo-of-charming-narrow-street-in-bologna-italy.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius libero
          aspernatur placeat maxime, rerum quibusdam et maiores, quod asperiores
          doloremque eum quae at commodi atque tenetur, harum officiis minus
          odio?
        </p>
      </div>
      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
            <HandThumbUpIcon className="size-5 cursor-pointer"></HandThumbUpIcon>
            <span className="flex gap-1">
              244<span className="hidden md:inline">Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
            <ChatBubbleBottomCenterTextIcon className="size-5 cursor-pointer"></ChatBubbleBottomCenterTextIcon>
            <span className="flex gap-1">
              244<span className="hidden md:inline">Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
            <ArrowPathRoundedSquareIcon className="size-5 cursor-pointer"></ArrowPathRoundedSquareIcon>
            <span className="flex gap-1">
              244<span className="hidden md:inline">Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments></Comments>
    </div>
  );
};

export default Post;
