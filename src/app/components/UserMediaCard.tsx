import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMediaCard = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col gap-6 p-4 bg-neutral-800 text-neutral-200 rounded-lg shadow-lg">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium mb-2">
        <span className="text-neutral-300">User Media</span>
        <Link href="/" className="hover:underline text-teal-300  text-sm">
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/30693592/pexels-photo-30693592/free-photo-of-dramatic-aerial-view-of-secluded-tropical-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
