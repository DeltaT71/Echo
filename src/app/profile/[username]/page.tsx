import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import ProfileInfo from "@/app/components/ProfileInfo";
import RightMenu from "@/app/components/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

const Profile = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();
  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockedId: user.id,
        blockerId: currentUserId,
      },
    });
    if (res) isBlocked = true;
    else {
      isBlocked = false;
    }
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6 h-200 pt-6">
      {/* Left Side */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile"></LeftMenu>
      </div>
      {/* Center/Main Content */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <ProfileInfo user={user}></ProfileInfo>
          <Feed></Feed>
        </div>
      </div>
      {/* Right Side */}
      <div className="hidden lg:flex flex-col gap-6 w-[30%]">
        <RightMenu userId="1"></RightMenu>
      </div>
    </div>
  );
};

export default Profile;
