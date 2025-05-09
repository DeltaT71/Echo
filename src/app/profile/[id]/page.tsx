import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import RightMenu from "@/app/components/RightMenu";
import React from "react";

const Profile = () => {
  return (
    <div className="flex gap-6 h-200 pt-6">
      {/* Left Side */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu></LeftMenu>
      </div>
      {/* Center/Main Content */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
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
