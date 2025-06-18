"use client";
import React, { useActionState, useEffect, useState } from "react";
import { User } from "../../../../generated/prisma";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { updateProfile } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  //useState variable for closing and opening the form
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const router = useRouter();

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const handleClose = () => {
    setIsOpen(false);
    // state.success && router.refresh(); Can be called like this but TS is whining
    if (state.success) {
      router.refresh();
    }
  };

  // Disable scrolling when form is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up in case the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      <span
        className="hover:underline text-teal-300  text-sm cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </span>
      {isOpen && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black/75 flex items-center justify-center z-50">
          <form
            action={
              //Async function to control the behavior after submitting the form.
              async (formData) => {
                //Update the Profile with the data
                await formAction({ formData, cover: cover?.secure_url || "" });
              }
            }
            className="p-12 bg-neutral-800 rounded-lg shadow-lg flex flex-col ring-1 ring-teal-500 gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            {/* TITLE */}
            <h1 className="font-bold text-neutral-200">Edit Profile</h1>
            <div className="text-neutral-400 text-xs">
              Use the Navbar to change Avatar or Username
            </div>
            {/* COVER PIC UPLOAD*/}
            <CldUploadWidget
              uploadPreset="Social_App"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-3 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <Image
                        src={user.cover || "/No_cover.jpg"}
                        alt=""
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      ></Image>
                      <span className="text-xs text-teal-500 hover:underline hover:text-teal-300">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* WRAPPER */}
            <div className="flex flex-col gap-3 mb-4 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  placeholder={user.name || "Jhon"}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="name"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">Surname</label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="surname"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  placeholder={user.description || "Coding is my passion..."}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="description"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  placeholder={user.city || "New York"}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="city"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">School</label>
                <input
                  type="text"
                  placeholder={user.school || "Hogwarts"}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="school"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">Work</label>
                <input
                  type="text"
                  placeholder={user.work || "Microsoft"}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="work"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">Website</label>
                <input
                  type="text"
                  placeholder={user.website || "Twitter.com"}
                  className="flex-1 bg-neutral-700 rounded-lg p-2 resize-none border-none outline-1 outline-neutral-600 focus:outline-teal-300 transition-all"
                  name="website"
                />
              </div>
            </div>
            <UpdateButton></UpdateButton>
            {state.success && (
              <span className="text-green-500">Profile has been updated!</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong!!</span>
            )}
            <div className="absolute size-6 right-3 top-4 cursor-pointer text-teal-500 transition-colors hover:text-teal-300">
              <XMarkIcon onClick={handleClose}></XMarkIcon>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
