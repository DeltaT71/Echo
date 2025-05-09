import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequests = () => {
  return (
    <div className="flex flex-col gap-5 p-4 bg-neutral-800 text-neutral-200 rounded-lg shadow-lg">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium mb-3">
        <span className="text-neutral-300">Friend Requests</span>
        <Link href="/" className="hover:underline text-teal-300  text-sm">
          See all
        </Link>
      </div>
      {/* USERS */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src="https://images.pexels.com/photos/31800106/pexels-photo-31800106/free-photo-of-woman-in-white-lace-top-in-istanbul-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-semibold">Jhonny</span>
        </div>
        <div className="flex gap-4">
          <CheckCircleIcon className="size-6 text-green-400 cursor-pointer"></CheckCircleIcon>
          <XCircleIcon className="size-6 text-red-400 cursor-pointer"></XCircleIcon>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src="https://images.pexels.com/photos/31800106/pexels-photo-31800106/free-photo-of-woman-in-white-lace-top-in-istanbul-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-semibold">Jhonny</span>
        </div>
        <div className="flex gap-4">
          <CheckCircleIcon className="size-6 text-green-400 cursor-pointer"></CheckCircleIcon>
          <XCircleIcon className="size-6 text-red-400 cursor-pointer"></XCircleIcon>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src="https://images.pexels.com/photos/31800106/pexels-photo-31800106/free-photo-of-woman-in-white-lace-top-in-istanbul-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          ></Image>
          <span className="font-semibold">Jhonny</span>
        </div>
        <div className="flex gap-4">
          <CheckCircleIcon className="size-6 text-green-400 cursor-pointer"></CheckCircleIcon>
          <XCircleIcon className="size-6 text-red-400 cursor-pointer"></XCircleIcon>
        </div>
      </div>
    </div>
  );
};

export default FriendRequests;
