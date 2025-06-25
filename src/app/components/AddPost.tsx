"use client";
import { useUser } from "@clerk/nextjs";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import AddPostButton from "./feed/AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading...";
  }

  return (
    <div className="p-4 bg-neutral-800 shadow-xl rounded-lg flex gap-4 justify-between text-sm flex-wrap">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/No_avatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 rounded-full"
      ></Image>
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          action={(formData) => addPost(formData, img?.secure_url || "")}
          className="flex gap-4"
        >
          <textarea
            placeholder="Whats on your mind?"
            className="flex-1 bg-neutral-700 rounded-lg p-2 min-h-15 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
            name="desc"
          ></textarea>
          <div className="flex flex-col gap-3">
            <FaceSmileIcon className="size-5 cursor-pointer text-teal-300"></FaceSmileIcon>
            <AddPostButton></AddPostButton>
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-baseline-center gap-4 mt-4 text-gray-300 text-sm flex-wrap">
          <CldUploadWidget
            uploadPreset="Social_App"
            onSuccess={(result) => {
              setImg(result.info);
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex gap-1 text-xs items-end"
                  onClick={() => open()}
                >
                  <PhotoIcon className="size-5 cursor-pointer text-teal-300"></PhotoIcon>
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>
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
