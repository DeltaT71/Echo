"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useOptimistic, useState } from "react";
import { FollowerRequest, User } from "../../../../generated/prisma";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import Link from "next/link";

// This type is for the follow Requests that include the sender data.
type FreindRequestsWithSender = FollowerRequest & {
  sender: User;
};

const FriendRequestList = ({
  friendRequests,
}: {
  friendRequests: FreindRequestsWithSender[];
}) => {
  //Create the state for the friend requests.
  const [friendRequestState, setFriendRequestState] = useState(friendRequests);

  const accept = async (requestId: number, userId: string) => {
    // call the optimistic action
    removeOptimisticRequest(requestId);

    //try catch to notify react about error so it can revert the UI to the prev state
    try {
      // DB call to accpet the request.
      await acceptFollowRequest(userId);
      //We filter the existing requests in the UI and remove the accepted one.
      setFriendRequestState((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const decline = async (requestId: number, userId: string) => {
    // call the optimistic action
    removeOptimisticRequest(requestId);

    //try catch to notify react about error so it can revert the UI to the prev state
    try {
      // DB call to accpet the request.
      await declineFollowRequest(userId);
      //We filter the existing requests in the UI and remove the declined one.
      setFriendRequestState((prev) =>
        prev.filter((req) => req.id !== requestId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  // Create the optimistic hook for the friend request states.
  const [optimisticRequest, removeOptimisticRequest] = useOptimistic(
    //We filter the existing requests in the UI and remove the declined/accepted one.
    friendRequestState,
    (state, value: number) => state.filter((req) => req.id !== value)
  );
  return (
    <>
      {
        //map thru all the requests and display them.
        optimisticRequest.map((request) => (
          <div key={request.id} className="flex items-center justify-between">
            <Link href={`/profile/${request.sender.username}`}>
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
            </Link>
            <div className="flex gap-4">
              {/* This action creates a anon function that contains the accept function. The reason we do this is because this is a client component. */}
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
        ))
      }
    </>
  );
};

export default FriendRequestList;
