"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-teal-700 py-1 px-4 rounded-lg hover:bg-teal-300 hover:text-black transition-all w-full mx-auto disabled:bg-teal-300/50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending" : "Send"}
    </button>
  );
};

export default AddPostButton;
