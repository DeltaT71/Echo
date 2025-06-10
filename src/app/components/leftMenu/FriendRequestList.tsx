"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { FollowerRequest, User } from "../../../../generated/prisma";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";

type FreindRequestsWithSender = FollowerRequest & {
  sender: User;
};

const FriendRequestList = ({
  friendRequests,
}: {
  friendRequests: FreindRequestsWithSender[];
}) => {
  const [friendRequestState, setFriendRequestState] = useState(friendRequests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);

    try {
      await acceptFollowRequest(userId);
      setFriendRequestState((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const decline = async (requestId: number, userId: string) => {
    removeOptimisticRequest(requestId);

    try {
      await declineFollowRequest(userId);
      setFriendRequestState((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    friendRequestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );
  return (
    <>
      {optimisticRequest.map((request) => (
        <div key={request.id} className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Image
              src={request.sender.avatar || "/No_avatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            ></Image>
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-4">
            <form action={() => accept(request.id, request.senderId)}>
              <button>
                <CheckCircleIcon className="size-6 text-green-400 cursor-pointer"></CheckCircleIcon>
              </button>
            </form>
            <form action={() => decline(request.id, request.senderId)}>
              <button>
                <XCircleIcon className="size-6 text-red-400 cursor-pointer"></XCircleIcon>
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
