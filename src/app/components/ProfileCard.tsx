import Image from "next/image";
import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col gap-5 p-4 bg-neutral-800 shadow-xl rounded-lg text-neutral-300">
      {/* TOP Images */}
      <div className="h-20 relative">
        <Image
          src="https://images.pexels.com/photos/19160388/pexels-photo-19160388/free-photo-of-birds-eye-view-of-a-man-on-a-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          fill
          className="rounded-md object-cover"
        ></Image>
        <Image
          src="https://images.pexels.com/photos/31802455/pexels-photo-31802455/free-photo-of-curved-modern-building-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
          width={40}
          height={40}
          className="w-13 h-13 rounded-full object-cover absolute left-0 right-0 m-auto -bottom-5 ring-1 ring-neutral-800 z-20"
        ></Image>
      </div>
      {/* User Name */}
      <div className="flex flex-col gap-2">
        <span className="flex text-lg items-center justify-center font-semibold">
          Koseki Bijou
        </span>
        {/* Followers */}
        <div className="flex gap-2 items-center justify-center">
          <div className="flex -space-x-1">
            <Image
              src="https://images.pexels.com/photos/31802455/pexels-photo-31802455/free-photo-of-curved-modern-building-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={40}
              height={40}
              className="w-3 h-3 rounded-full object-cover ring-neutral-800 z-20"
            ></Image>
            <Image
              src="https://images.pexels.com/photos/31802455/pexels-photo-31802455/free-photo-of-curved-modern-building-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={40}
              height={40}
              className="w-3 h-3 rounded-full object-cover ring-neutral-800 z-20"
            ></Image>
            <Image
              src="https://images.pexels.com/photos/31802455/pexels-photo-31802455/free-photo-of-curved-modern-building-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={40}
              height={40}
              className="w-3 h-3 rounded-full object-cover ring-neutral-800 z-20"
            ></Image>
          </div>
          <span className="text-sm">Followers 200</span>
        </div>
      </div>

      <button className="bg-teal-700 py-1 px-4 rounded-lg hover:bg-teal-300 hover:text-black transition-all w-fit mx-auto">
        My Profile
      </button>
    </div>
  );
};

export default ProfileCard;
