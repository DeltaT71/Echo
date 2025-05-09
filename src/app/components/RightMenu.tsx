import React from "react";
import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Ad from "./Ad";
import UserMediaCard from "./UserMediaCard";
import UserInfoCard from "./UserInfoCard";

const RightMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className="flex flex-col gap-6">
      {userId ? (
        <>
          <UserInfoCard userId={userId} />
          <UserMediaCard userId={userId} />
        </>
      ) : null}
      {/* FRIEND REQUESTS */}
      <FriendRequests></FriendRequests>
      {/* BIRTHDAYS */}
      <Birthdays></Birthdays>
      {/* SPONSORED ADS */}
      <Ad size="md"></Ad>
    </div>
  );
};

export default RightMenu;
