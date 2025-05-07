import React from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import {
  HomeIcon,
  PlayCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      {/* Left */}
      <div className="md:hidden lg:block font-bold text-xl text-teal-400 w-[20%]">
        <Link href="/">Logo</Link>
      </div>
      {/* Center */}
      <div className="hidden md:flex gap-4 w-[50%] text-sm">
        <Link href="/" className="flex gap-2">
          <HomeIcon className="size-5 text-teal-300" />
          <span>Homepage</span>
        </Link>
        <Link href="/" className="flex gap-2">
          <UserGroupIcon className="size-5 text-teal-300" />
          <span>Friends</span>
        </Link>
        <Link href="/" className="flex gap-2">
          <PlayCircleIcon className="size-5 text-teal-300" />
          <span>Stories</span>
        </Link>
      </div>
      {/* LINKS */}

      {/* Right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
