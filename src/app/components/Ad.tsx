import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const SponsoredAds = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-800 rounded-lg shadow-lg text-neutral-300">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-lg ">Sponsored ads</span>
        <EllipsisHorizontalIcon className="size-5 cursor-pointer"></EllipsisHorizontalIcon>
      </div>
      {/* MAIN IMAGE */}
      <div
        className={`relative w-full ${
          size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
        }`}
      >
        <Image
          src="https://images.pexels.com/photos/30910936/pexels-photo-30910936/free-photo-of-dramatic-wave-crest-at-iquique-s-pacific-coast.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          fill
          className="object-cover rounded-lg"
        ></Image>
      </div>
      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div className="flex gap-3 items-center">
          <Image
            src="https://images.pexels.com/photos/27037687/pexels-photo-27037687/free-photo-of-macaw-parrot-in-forest.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          ></Image>
          <span className="text-md font-medium text-teal-400">
            BigChef Lounge
          </span>
        </div>
      </div>
      <p className={size === "sm" ? "text-xm" : "text-sm"}>
        {size === "sm"
          ? "Lorem ipsum dolor sit amet consectetur adipisicing elit."
          : size === "md"
          ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam provident ut rem consectetur esse alias, sequi, exercitationem consequuntur reprehenderit, porro cupiditate similique."
          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam provident ut rem consectetur esse alias, sequi, exercitationem consequuntur reprehenderit, porro cupiditate similique. Voluptas harum esse aspernatur tempora odio non molestias."}
      </p>
      <button className="w-full p-2 bg-neutral-600 rounded-lg cursor-pointer justify-center items-center text-xs">
        <span>Learn more</span>
      </button>
    </div>
  );
};

export default SponsoredAds;
