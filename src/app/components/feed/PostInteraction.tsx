"use client";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useOptimistic, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import { switchLike } from "@/lib/actions";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  //Get the currently logged in user's id. This is an Async call even if its not stated there.
  const { isLoaded, userId } = useAuth();
  //Create the state for the likes.
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  //Use Effect to make sure the state is set after everything is hydrated
  useEffect(() => {
    //we ask if isLoaded is ready and the userId is here before doing anything to make sure everything is hydrated.
    if (isLoaded && userId) {
      setLikeState({
        likeCount: likes.length,
        isLiked: likes.includes(userId),
      });
    }
  }, [isLoaded, userId, likes]);
  //Optimistic hook for the likes so that we have instant feedback for the users.
  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        //if is liked is true and the button is clicked likes -1 if its false + 1
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        //reverse the bool value of of isLiked.
        isLiked: !state.isLiked,
      };
    }
  );
  //Function that the form will run on button press.
  const likeAction = async () => {
    //call the optimistic hook for instant feedback
    switchOptimisticLike("");

    try {
      //Call the DB action with the post id.
      switchLike(postId);
      //set the like State for the next time use optimistic is called.
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
            <form action={likeAction}>
              <button className="flex gap-2">
                {
                  //If the post is not liked give a normal like button if it is give a full one with color.
                  optimisticLike.isLiked ? (
                    <HandThumbUpIconSolid className="size-5 text-teal-300 cursor-pointer" />
                  ) : (
                    <HandThumbUpIcon className="size-5 cursor-pointer" />
                  )
                }
                <span className="flex gap-1">
                  {optimisticLike.likeCount}
                  <span className="hidden md:inline">Likes</span>
                </span>
              </button>
            </form>
          </div>
          <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
            <ChatBubbleBottomCenterTextIcon className="size-5 cursor-pointer"></ChatBubbleBottomCenterTextIcon>
            <span className="flex gap-1">
              {commentNumber}
              <span className="hidden md:inline">Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-3 bg-neutral-700 p-2 rounded-xl text-neutral-200">
            <ArrowPathRoundedSquareIcon className="size-5 cursor-pointer"></ArrowPathRoundedSquareIcon>
            <span className="flex gap-1">
              <span className="hidden md:inline">Share</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostInteraction;
