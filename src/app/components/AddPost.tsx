import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const AddPost = () => {
  return (
    <div className="p-4 bg-neutral-800 rounded-lg flex gap-4 justify-between text-sm flex-wrap">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/31834931/pexels-photo-31834931/free-photo-of-relaxed-woman-by-the-pool-in-sao-paulo-brazil.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 rounded-full"
      ></Image>
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <div className="flex gap-4">
          <textarea
            placeholder="Whats on your mind?"
            className="flex-1 bg-neutral-700 rounded-lg p-2 min-h-15 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
          ></textarea>
          <FaceSmileIcon className="size-5 cursor-pointer self-end text-teal-300"></FaceSmileIcon>
        </div>
        {/* POST OPTIONS */}
        <div className="flex items-baseline-center gap-4 mt-4 text-gray-300 text-sm flex-wrap">
          <div className="flex gap-1 text-xs items-end">
            <PhotoIcon className="size-5 cursor-pointer text-teal-300"></PhotoIcon>
            Photo
          </div>
          <div className="flex gap-1 text-xs items-end">
            <VideoCameraIcon className="size-5 cursor-pointer text-teal-300"></VideoCameraIcon>
            Video
          </div>
          <div className="flex gap-1 text-xs items-end">
            <ChartBarIcon className="size-5 cursor-pointer text-teal-300"></ChartBarIcon>
            Poll
          </div>
          <div className="flex gap-1 text-xs items-end">
            <CalendarIcon className="size-5 cursor-pointer text-teal-300"></CalendarIcon>
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
