"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import z from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  // userId is the target user
  // Get the ID of the currently authenticated user
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    // Check if the current user is already following the target user
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      // If already following, unfollow (delete the follower entry)
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      // If not following, check if a follow request was already sent
      const existingFollowRequest = await prisma.followerRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        // If a follow request already exists, cancel it (delete the request)
        await prisma.followerRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        // Otherwise, create a new follow request
        await prisma.followerRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    throw new Error("Something went wrong while switching follow status.");
  }
};

export const switchBlock = async (userId: string) => {
  // userId is the target user
  // Get the ID of the currently authenticated user
  const { userId: currentUserId } = await auth();

  // Check if user is authenticated.
  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    // Check if the current user is already blocking the target user
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });
    // If the block exists remove the block.
    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    }
    // If there is no block create it.
    else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while switching follow status.");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  // userId is the target user
  // Get the ID of the currently authenticated user
  const { userId: currentUserId } = await auth();

  // Check if user is authenticated.
  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    // Find the follow Request
    const existingFollowRequest = await prisma.followerRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    //If it exists Delete the request and add a follow to the follower Table
    if (existingFollowRequest) {
      await prisma.followerRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const declineFollowRequest = async (userId: string) => {
  // userId is the target user
  // Get the ID of the currently authenticated user
  const { userId: currentUserId } = await auth();

  // Check if user is authenticated.
  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    // Find the follow Request
    const existingFollowRequest = await prisma.followerRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });
    //If it exists Delete the request.
    if (existingFollowRequest) {
      await prisma.followerRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  //Desctucture the payload
  const { formData, cover } = payload;
  //Get the fields from the form
  const fields = Object.fromEntries(formData);

  //Make sure we are only taking the fields with data in them.
  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  //Define the validation schema and constraints for the profile update.
  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(60).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  //Apply the validation schema to the fields
  const validatedFields = Profile.safeParse({ cover, ...filteredFields });

  //Check for any errors during validation and log them
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true }; //Return the form state Error
  }

  try {
    //Get the currently logged in user ID
    const { userId: currentUserId } = await auth();

    //Check if currentUser exists
    if (!currentUserId) {
      return { success: false, error: true }; //Return the form state Error
    }
    //update the user data
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        //validatedFields can be spread like this for because the form fields match the schema of the model.
        ...validatedFields.data,
      },
    });
    return { success: true, error: false }; //Return the form state Success
  } catch (error) {
    console.log(error);
    return { success: false, error: true }; //Return the form state Error
  }
};

export const switchLike = async (postId: number) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not Authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: currentUserId,
        postId: postId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId: postId,
          userId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const createComment = async (desc: string, postId: number) => {
  const { userId: currentUser } = await auth();

  if (!currentUser) {
    throw new Error("User is not Authenticated!");
  }

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (post) {
      const createdComment = await prisma.comment.create({
        data: {
          postId: post.id,
          desc: desc,
          userId: currentUser,
        },
        include: {
          user: true,
        },
      });
      return createdComment;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  if (!desc) return;

  const descZ = z.string().min(1).max(500);

  const validatedDesc = descZ.safeParse(desc);

  if (!validatedDesc.success) {
    throw new Error("Description is not valid!");
  }
  const { userId: currentUserId } = await auth();

  try {
    if (!currentUserId) {
      throw new Error("User is not Authenticated!");
    }

    await prisma.post.create({
      data: {
        userId: currentUserId,
        desc: validatedDesc.data,
        img: img,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addStory = async (img: string) => {
  const { userId: currentUserId } = await auth();

  try {
    if (!currentUserId) {
      throw new Error("User is not Authenticated!");
    }

    await prisma.stories.deleteMany({
      where: {
        userId: currentUserId,
      },
    });

    const createdStory = await prisma.stories.create({
      data: {
        userId: currentUserId,
        img: img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
