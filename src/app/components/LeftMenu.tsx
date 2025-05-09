import React from "react";
import ProfileCard from "./ProfileCard";
import Link from "next/link";
import {
  BuildingStorefrontIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  MapIcon,
  NewspaperIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import Ad from "./Ad";

const LeftMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard></ProfileCard>}
      <div className="flex flex-col gap-3 p-4 bg-neutral-800 shadow-xl rounded-lg text-sm text-neutral-300">
        <Link
          href="/"
          className="flex gap-2 p-2   hover:bg-neutral-700 rounded-lg"
        >
          <DocumentTextIcon className="size-5 text-teal-300"></DocumentTextIcon>
          <span>Posts</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <MapIcon className="size-5 text-teal-300"></MapIcon>
          <span>Activity</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <BuildingStorefrontIcon className="size-5 text-teal-300"></BuildingStorefrontIcon>
          <span>Marketplace</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <CalendarIcon className="size-5 text-teal-300"></CalendarIcon>
          <span>Events</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <PhotoIcon className="size-5 text-teal-300"></PhotoIcon>
          <span>Albums</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <VideoCameraIcon className="size-5 text-teal-300"></VideoCameraIcon>
          <span>Videos</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <NewspaperIcon className="size-5 text-teal-300"></NewspaperIcon>
          <span>News</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <ComputerDesktopIcon className="size-5 text-teal-300"></ComputerDesktopIcon>
          <span>Courses</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <ClipboardDocumentIcon className="size-5 text-teal-300"></ClipboardDocumentIcon>
          <span>Lists</span>
        </Link>
        <Link
          href="/"
          className="flex gap-2 p-2  hover:bg-neutral-700 rounded-lg"
        >
          <Cog6ToothIcon className="size-5 text-teal-300"></Cog6ToothIcon>
          <span>Settings</span>
        </Link>
      </div>
      <Ad size="sm"></Ad>
    </div>
  );
};

export default LeftMenu;
