import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string }) => {
  //Get the currently logged in user
  const { userId: currentUserId } = await auth();

  //This is a toggle for the demo mode.
  //For better user experience in the demo mode its better to fetch all the posts and display them rather than fetching posts from users you follow.
  const DEMO_MODE = true;

  //empty posts array to store the posts later
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let posts: any[] = [];

  //Check if username exists

  if (username) {
    //If there is a username that means we are in the profile page so we fetch all the posts from the user.
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (DEMO_MODE) {
    //We just fetch all the posts to display them for the demo.
    posts = await prisma.post.findMany({
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    //If username does not exist but there is a current user means we are in the feed.
    if (!username && currentUserId) {
      //This whole segment is how the app was planned to work but its not a good experience for the demo so I made a toggle for it called DEMO_MODE.
      //First we find all the users that the current user follows.
      const following = await prisma.follower.findMany({
        where: {
          followerId: currentUserId,
        },
        select: {
          followingId: true,
        },
      });

      //We map them so that we can get an object of userIds
      const followingIds = following.map((f) => f.followingId);
      followingIds.push(currentUserId);

      //We use the new followingIds array to map thru all the posts with these ids and order them in desc.
      posts = await prisma.post.findMany({
        where: {
          userId: {
            in: followingIds,
          },
        },
        include: {
          user: true,
          likes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  }

  return (
    <div className="p-4 bg-neutral-800 shadow-xl rounded-lg flex flex-col gap-12">
      {
        // if post length is 0 there are no posts.
        // We map the posts and show them to the user depending if there is a username or not
        posts.length
          ? posts?.map((post) => <Post key={post.id} post={post} />)
          : "No Posts Found!"
      }
    </div>
  );
};

export default Feed;
