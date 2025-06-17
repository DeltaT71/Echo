import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";
import { User } from "../../../../generated/prisma/client";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInformationCard = async ({ user }: { user: User }) => {
  // Date for the time the user joined.
  const createdAtDate = new Date(user.createdAt);
  //Formatting the date to be more presentable to users.
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  //Get the user currently logged in
  const { userId: currentUserId } = await auth();

  if (currentUserId) {
    const [blockRes, followRes, followingRes] = await Promise.all([
      prisma.block.findFirst({
        where: {
          //The user currently being looked at
          blockedId: user.id,
          //The user currently logged in
          blockerId: currentUserId,
        },
      }),
      prisma.follower.findFirst({
        where: {
          //The user currently being looked at
          followingId: user.id,
          //The user currently logged in
          followerId: currentUserId,
        },
      }),
      prisma.followerRequest.findFirst({
        where: {
          //The user currently being looked at
          receiverId: user.id,
          //The user currently logged in
          senderId: currentUserId,
        },
      }),
    ]);

    // Takes the truthy or falsy value of the Responses and gives it to the boolean variables
    // That way we dont need to write ifs.
    isUserBlocked = !!blockRes;
    isFollowing = !!followRes;
    isFollowingSent = !!followingRes;

    return (
      <div className="flex flex-col gap-6 p-4 bg-neutral-800 text-neutral-200 rounded-lg shadow-lg">
        {/* TOP */}
        <div className="flex items-center justify-between font-medium mb-2">
          <span className="text-neutral-300">User Media</span>
          {currentUserId == user.id ? (
            <UpdateUser user={user}></UpdateUser>
          ) : (
            <Link href="/" className="hover:underline text-teal-300  text-sm">
              See all
            </Link>
          )}
        </div>
        {/* USER NAME/TAG */}
        <div className="flex gap-2 items-center">
          <span className="text-xl">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm text-neutral-500">@{user.username}</span>
        </div>
        {/* DESC */}
        {user.description && <p className="text-sm">{user.description}</p>}
        {/* LIVING/EDUCATION/WORK */}
        {user.city && (
          <div className="flex gap-4 items-center">
            <MapPinIcon className="size-4.5"></MapPinIcon>
            <span className="text-sm">
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className="flex gap-4 items-center">
            <AcademicCapIcon className="size-4.5"></AcademicCapIcon>
            <span className="text-sm">
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}
        {user.work && (
          <div className="flex gap-4 items-center">
            <BriefcaseIcon className="size-4.5"></BriefcaseIcon>
            <span className="text-sm">
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}
        {/* USER WEBSITE & DATE OF JOINING */}
        <div className="flex gap-4 items-center justify-between">
          {user.website && (
            <div className="flex gap-2">
              <LinkIcon className="size-4.5"></LinkIcon>
              <span className="text-sm">
                <Link
                  href={user.website}
                  className="hover:underline text-teal-300"
                >
                  {user.website}
                </Link>
              </span>
            </div>
          )}
          <div className="flex gap-2">
            <CalendarDaysIcon className="size-4.5"></CalendarDaysIcon>
            <span className="text-sm">Joined {formattedDate}</span>
          </div>
        </div>
        {/* FOLLOW BUTTON/BLOCK */}
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isUserFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          ></UserInfoCardInteraction>
        )}
      </div>
    );
  }
};

export default UserInformationCard;
