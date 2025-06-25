"use client";
import React, { useOptimistic, useState } from "react";
import { Stories, User } from "../../../generated/prisma";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { addStory } from "@/lib/actions";

type StoryWithUser = Stories & { user: User };

const StoryList = ({ stories }: { stories: StoryWithUser[] }) => {
  const [storyList, setStoryList] = useState(stories);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [img, setImg] = useState<any>();
  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const { user, isLoaded } = useUser();

  if (!user && !isLoaded) return "Loading...";
  if (!user && isLoaded) return null;

  const add = async () => {
    if (!img.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: user.id,
      user: {
        id: user.id,
        avatar: user.imageUrl || "/No_avatar.png",
        name: "",
        surname: "",
        username: "Sending...",
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
      const createdStory = await addStory(img.secure_url);
      setStoryList((prev) => [createdStory, ...prev]);
      setImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset="Social_App"
        onSuccess={(result) => {
          setImg(result.info);
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                src={img?.secure_url || user?.imageUrl || "/No_avatar.png"}
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 ring-teal-100 object-cover brightness-50"
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="bg-teal-700 rounded-md text-xs p-1.5 hover:bg-teal-300 hover:text-black transition-all">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}
              <div
                className="absolute text-6xl text-gray-100 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => open()}
              >
                +
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      {/* Story */}
      {optimisticStories.map((story) => {
        return (
          <div
            key={story.id}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <Image
              src={story.user.avatar || "/No_avatar.png"}
              alt=""
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 ring-teal-100 object-cover"
            />
            <span className="font-medium">
              {story.user.name || story.user.username}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default StoryList;
