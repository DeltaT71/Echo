import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";
import FriendRequestsList from "./FriendRequestList";

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
      <FriendRequestsList friendRequests={friendRequests}></FriendRequestsList>
    </div>
  );
};

export default FriendRequests;
