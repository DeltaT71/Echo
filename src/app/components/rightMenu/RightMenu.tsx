import React, { Suspense } from "react";
import FriendRequests from "../leftMenu/FriendRequests";
import Birthdays from "../leftMenu/Birthdays";
import { User } from "../../../../generated/prisma";
import Ad from "../Ad";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";

const RightMenu = ({ user }: { user: User | null }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <UserMediaCard user={user} />
          </Suspense>
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
