import { Prisma } from "../../../generated/prisma/client";

export type UserWithCount = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        followers: true;
        followings: true;
        posts: true;
      };
    };
  };
}>;
