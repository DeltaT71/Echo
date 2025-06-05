"use client";
import { switchFollow } from "@/lib/actions";
import React, { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isUserFollowing,
  isFollowingSent,
}: {
  userId: string;
  currentUserId: string;
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
    switchOptimisticFollow("");
    try {
      //send the request to the db for processing
      await switchFollow(userId);

      // Set the state
      setUserState((prev) => ({
        //Current object
        ...prev,
        //Always sets to false
        following: prev.following && false,
        // If user is following is false and there is no follow request sent set it as true if there is set it to false.
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  //Optimistic hook for the setUser.
  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    userState,
    (state) => ({
      ...state,
      following: state.following && false,
      followingRequestSent:
        !state.following && !state.followingRequestSent ? true : false,
    })
  );

  return (
    <>
      <form action={follow}>
        <button className="w-full text-xs bg-teal-700 p-2 rounded-lg hover:bg-teal-300 hover:text-black transition-all cursor-pointer">
          {optimisticFollow.following
            ? "Unfollow"
            : optimisticFollow.followingRequestSent
            ? "Request Sent"
            : "Follow"}
        </button>
      </form>
      <form className="flex justify-end">
        <button className="pr-1 text-sm text-red-500 hover:underline cursor-pointer">
          {optimisticFollow.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
