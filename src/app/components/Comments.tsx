import {
  ArrowUturnLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Comments = () => {
  return (
    <div>
      {/* WRITE */}
      <div className="flex gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/31834931/pexels-photo-31834931/free-photo-of-relaxed-woman-by-the-pool-in-sao-paulo-brazil.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          ></Image>
        </div>
        <div className="flex flex-1 gap-2 items-center justify-between text-sm px-6 py-2 w-full bg-neutral-700 rounded-xl focus-within:ring-1 focus-within:ring-teal-300 transition-all">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent flex-1 outline-none"
          />
          <FaceSmileIcon className="size-6 cursor-pointer text-teal-300"></FaceSmileIcon>
        </div>
      </div>
      {/* COMMENTS */}
      <div>
        {/* COMMENT */}
        <div className="flex justify-between gap-4 mt-4">
          {/* AVATAR */}
          <Image
            src="https://images.pexels.com/photos/27037687/pexels-photo-27037687/free-photo-of-macaw-parrot-in-forest.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          {/* DESC */}
          <div className="flex flex-1 flex-col gap-4">
            <span className="font-medium">Jessica</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              minima ipsum nemo sed eaque laudantium sit ratione voluptatibus
              minus consequuntur odit fugiat id eius dolorum nam, dicta
              accusamus ipsam! Deleniti.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
                <HandThumbUpIcon className="size-4 cursor-pointer"></HandThumbUpIcon>
                <span className="flex gap-1">231</span>
              </div>
              <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
                <ArrowUturnLeftIcon className="size-4 cursor-pointer"></ArrowUturnLeftIcon>
                <span className="flex gap-1">1231</span>
              </div>
            </div>
          </div>
          {/* ICON */}
          <EllipsisHorizontalIcon className="size-5 cursor-pointer"></EllipsisHorizontalIcon>
        </div>
      </div>
    </div>
  );
};

export default Comments;
