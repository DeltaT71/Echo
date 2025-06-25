import Image from "next/image";
import Link from "next/link";
import React from "react";
import { User } from "../../../../generated/prisma/client";
import prisma from "@/lib/client";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
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
      <div className="flex gap-4 flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post) => {
              if (!post.img) return null;
              return (
                <div key={post.id} className="relative w-1/5 h-24">
                  <Image
                    src={post.img!}
                    alt=""
                    fill
                    className="object-cover rounded-md"
                  ></Image>
                </div>
              );
            })
          : "No Media"}
      </div>
    </div>
  );
};

export default UserMediaCard;
