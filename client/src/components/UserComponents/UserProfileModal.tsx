import React, { useState } from "react";
import { UseAuthContext } from "../../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserData, updateUserDataSchema, userData } from "../../util/Types";
import { FormProvider, useForm } from "react-hook-form";
import { TextFieldInputs } from "./TextFieldInputs";
import { ImageUploadInputs } from "./ImageUploadInputs";
import { createPortal } from "react-dom";

type userProfileModalProp = {
  modalId: string;
  user: userData;
};

export const UserProfileModal: React.FC<userProfileModalProp> = ({ modalId, user }) => {
  const { updateProfile, updatePending, user: currentUser } = UseAuthContext();
  const [selectedProfilePic, setSelectedProfilePic] = useState<string | null>(user?.profilePic || "");
  const [selectedBannerPic, setSelectedBannerPic] = useState<string | null>(user?.bannerPic || "");

  const [editProfile, setEditProfile] = useState<boolean>(false);

  const methods = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserDataSchema),
  });

  const { handleSubmit } = methods;

  const handleUpdateProfile = (data: UpdateUserData) => {
    const updatedData = {
      ...data,
      profilePic: selectedProfilePic,
      bannerPic: selectedBannerPic,
    };

    updateProfile(updatedData);
  };

  return createPortal(
    <dialog id={modalId} className="modal">
      <div className="modal-box p-0 flex flex-col flex-1  items-start max-w-2xl ">
        <div className=" size-40 w-full relative">
          <img src={selectedBannerPic || user?.bannerPic || "bannerPic"} className="bg-primary size-40 w-full" alt="banner Pic"></img>

          <div className="rounded-lg size-32 bg-primary flex  overflow-hidden absolute -bottom-10 left-10 ">
            <img src={selectedProfilePic || user?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleUpdateProfile)} className="flex flex-col w-full p-10 mt-5 gap-10 hover:cursor-default">
            <TextFieldInputs editProfile={editProfile} user={user}></TextFieldInputs>
            <ImageUploadInputs
              user={user}
              editProfile={editProfile}
              selectedBannerPic={selectedBannerPic}
              selectedProfilePic={selectedProfilePic}
              setSelectedBannerPic={setSelectedBannerPic}
              setSelectedProfilePic={setSelectedProfilePic}
            ></ImageUploadInputs>

            {user.id === currentUser.id ? (
              editProfile ? (
                <div className="flex gap-5 justify-end border-t-2 border-neutral pt-5">
                  <button type="button" onClick={() => setEditProfile(false)} className="btn btn-neutral btn-sm">
                    Cancel
                  </button>
                  <button disabled={updatePending} type="submit" className="btn btn-accent btn-sm">
                    {updatePending ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Updating
                      </>
                    ) : (
                      "save"
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex justify-end border-t-2 border-neutral pt-5">
                  <button type="button" onClick={() => setEditProfile((prev) => !prev)} className="btn btn-accent btn-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit profile
                  </button>
                </div>
              )
            ) : (
              ""
            )}
          </form>
        </FormProvider>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body
  );
};
