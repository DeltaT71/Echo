import { auth } from "@clerk/nextjs/server";
import { GiftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Birthdays = async () => {
  const { userId: currentUserId } = await auth();

  return (
    <>
      {currentUserId && (
        <div className="flex flex-col gap-4 p-4 bg-neutral-800 rounded-lg shadow-lg">
          {/* TOP */}
          <div className="flex items-center justify-between font-medium mb-3">
            <span className="text-neutral-300">Birthdays</span>
          </div>
          {/* USERS */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <Image
                src="https://images.pexels.com/photos/31800106/pexels-photo-31800106/free-photo-of-woman-in-white-lace-top-in-istanbul-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              ></Image>
              <span className="font-semibold">Gigi</span>
            </div>
            <div className="flex gap-4">
              <button className="bg-teal-700 rounded-md text-xs p-1.5 hover:bg-teal-400 hover:text-black transition-all">
                Celebrate
              </button>
            </div>
          </div>
          {/* UPCOMING BIRTHDAYS */}
          <div className="flex gap-4 items-center bg-neutral-700 rounded-lg p-2">
            <GiftIcon className="size-10 text-teal-500"></GiftIcon>
            <div className="">
              <Link href="/" className="flex flex-col gap-1">
                <span className="text-sm font-bold text-neutral-300">
                  Upcoming Birthdays
                </span>
                <span className="text-xs font-bold text-neutral-300">
                  See other 14 have upcoming birthdays
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Birthdays;
