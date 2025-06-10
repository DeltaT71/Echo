"use client";
import { switchBlock, switchFollow } from "@/lib/actions";
import React, { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isUserFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isUserFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  // Make a userState constant for tracking the state of the following
  const [userState, setUserState] = useState({
    following: isUserFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });

  // The follow function that the form will execute when the follow button is pressed
  const follow = async () => {
    switchOptimisticState("follow");
    try {
      //send the request to the db for processing
      await switchFollow(userId);

      // Set the follow state of the user
      setUserState((prev) => ({
        //Current object
        ...prev,
        //Always sets to false since the true will come from the DB
        following: prev.following && false,
        // If user is following is false and there is no follow request sent set it as true if there is set it to false.
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // The block function will be called when the block button is pressed.
  const block = async () => {
    switchOptimisticState("block");
    // Sends the request to the db for processing
    await switchBlock(userId);
    try {
      // Set the blocked state of the user
      setUserState((prev) => ({
        // Current Object
        ...prev,
        //Always sets to false since the true will come from the DB
        blocked: !prev.blocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  //Optimistic hook for the setUserState. This optimistic hook was made to work with both Follow and Block.
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full text-xs bg-teal-700 p-2 rounded-lg hover:bg-teal-300 hover:text-black transition-all cursor-pointer">
          {optimisticState.following
            ? "Unfollow"
            : optimisticState.followingRequestSent
            ? "Request Sent"
            : "Follow"}
        </button>
      </form>
      <form className="flex justify-end" action={block}>
        <button className="pr-1 text-sm text-red-500 hover:underline cursor-pointer">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
