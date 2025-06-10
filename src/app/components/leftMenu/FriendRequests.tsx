import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequests = async () => {
  const { userId: currentUser } = await auth();

  if (!currentUser) return null;
  const friendRequests = await prisma.followerRequest.findMany({
    where: {
      receiverId: currentUser,
    },
    include: {
      sender: true,
    },
  });

  if (friendRequests.length === 0) return null;

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
      {friendRequests.map((request) => (
        <div key={request.id} className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image
              src={request.sender.avatar || "No_avatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            ></Image>
            <span className="font-semibold">{request.sender.username}</span>
          </div>
          <div className="flex gap-4">
            <CheckCircleIcon className="size-6 text-green-400 cursor-pointer"></CheckCircleIcon>
            <XCircleIcon className="size-6 text-red-400 cursor-pointer"></XCircleIcon>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
