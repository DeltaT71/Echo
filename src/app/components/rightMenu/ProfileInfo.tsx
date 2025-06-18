import { UserWithCount } from "@/app/types/UserWithCount";
import Image from "next/image";
import React from "react";

const ProfileInfo = ({ user }: { user: UserWithCount }) => {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-200">
      <div className="w-full h-64 relative">
        <Image
          src={user?.cover || "/No_cover.jpg"}
          alt=""
          fill
          className="rounded-lg object-cover"
        ></Image>
        <Image
          src={user?.avatar || "/No_avatar.png"}
          alt=""
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-neutral-800 z-20"
        ></Image>
      </div>
      <h1 className="mt-20 mb-4 text-2xl font-medium">
        {user.name && user.surname
          ? user.name + " " + user.surname
          : user.username}
      </h1>
      <div className="flex items-center justify-center gap-12 mb-4">
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium">{user._count.posts}</span>
          <span className="text-sm">Posts</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium">{user._count.followings}</span>
          <span className="text-sm">Followers</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium">{user._count.followers}</span>
          <span className="text-sm">Following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
