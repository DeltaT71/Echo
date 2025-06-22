import prisma from "@/lib/client";
import React from "react";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      {/* WRITE */}
      <CommentList comments={comments} postId={postId}></CommentList>
    </div>
  );
};

export default Comments;
