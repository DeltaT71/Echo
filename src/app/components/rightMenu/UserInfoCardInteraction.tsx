"user client";
import React from "react";

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
  return (
    <>
      <form>
        <button className="w-full text-xs bg-teal-700 p-2 rounded-lg hover:bg-teal-300 hover:text-black transition-all cursor-pointer">
          {isUserFollowing
            ? "Unfollow"
            : isFollowingSent
            ? "Request Sent"
            : "Follow"}
        </button>
      </form>
      <form className="flex justify-end">
        <button className="pr-1 text-sm text-red-500 hover:underline cursor-pointer">
          {isUserBlocked ? "Unblock User" : "Block User"}
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
