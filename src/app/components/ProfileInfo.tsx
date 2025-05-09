import Image from "next/image";
import React from "react";

const ProfileInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-200">
      <div className="w-full h-64 relative">
        <Image
          src="https://images.pexels.com/photos/19160388/pexels-photo-19160388/free-photo-of-birds-eye-view-of-a-man-on-a-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          fill
          className="rounded-lg object-cover"
        ></Image>
        <Image
          src="https://images.pexels.com/photos/31802455/pexels-photo-31802455/free-photo-of-curved-modern-building-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-neutral-800 z-20"
        ></Image>
      </div>
      <h1 className="mt-20 mb-4 text-2xl font-medium">Koseki Bijou</h1>
      <div className="flex items-center justify-center gap-12 mb-4">
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium">244</span>
          <span className="text-sm">Posts</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium">44k</span>
          <span className="text-sm">Followers</span>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="font-medium">152</span>
          <span className="text-sm">Following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
