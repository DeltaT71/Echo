import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  LinkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const UserInformationCard = ({ userId }: { userId: string }) => {
  return (
    <div className="flex flex-col gap-6 p-4 bg-neutral-800 text-neutral-200 rounded-lg shadow-lg">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium mb-2">
        <span className="text-neutral-300">User Media</span>
        <Link href="/" className="hover:underline text-teal-300  text-sm">
          See all
        </Link>
      </div>
      {/* USER NAME/TAG */}
      <div className="flex gap-2 items-center">
        <span className="text-xl">Koseki Bijou</span>
        <span className="text-sm text-neutral-500">@kosekibibo</span>
      </div>
      {/* DESC */}
      <p className="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
        mollitia beatae dolorum ullam tempore totam doloremque.
      </p>
      {/* LIVING/EDUCATION/WORK */}
      <div className="flex gap-4 items-center">
        <MapPinIcon className="size-4.5"></MapPinIcon>
        <span className="text-sm">
          Living in <b>Japan</b>
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <AcademicCapIcon className="size-4.5"></AcademicCapIcon>
        <span className="text-sm">
          Went to <b>Vtuber High School</b>
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <BriefcaseIcon className="size-4.5"></BriefcaseIcon>
        <span className="text-sm">
          Works at <b>Hololive</b>
        </span>
      </div>
      {/* USER WEBSITE & DATE OF JOINING */}
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2">
          <LinkIcon className="size-4.5"></LinkIcon>
          <span className="text-sm">
            <Link href="/" className="hover:underline text-teal-300">
              Hololive.com
            </Link>
          </span>
        </div>
        <div className="flex gap-2">
          <CalendarDaysIcon className="size-4.5"></CalendarDaysIcon>
          <span className="text-sm">Joined November 2024</span>
        </div>
      </div>
      {/* FOLLOW BUTTON/BLOCK */}
      <button className="text-xs bg-teal-700 p-2 rounded-lg hover:bg-teal-300 hover:text-black transition-all cursor-pointer">
        Following
      </button>
      <button className="flex justify-end pr-1 text-sm text-red-500 hover:underline cursor-pointer">
        Block user
      </button>
    </div>
  );
};

export default UserInformationCard;
