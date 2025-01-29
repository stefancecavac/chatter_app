import React from "react";
import { userData } from "../../util/Types";

type imageUploadProps = {
  user: userData;
  editProfile: boolean;
  setSelectedProfilePic: (data: string) => void;
  setSelectedBannerPic: (data: string) => void;
  selectedProfilePic: string | null;
  selectedBannerPic: string | null;
};

export const ImageUploadInputs: React.FC<imageUploadProps> = ({
  user,
  editProfile,
  selectedBannerPic,
  selectedProfilePic,
  setSelectedBannerPic,
  setSelectedProfilePic,
}) => {
  const handleProfilePic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedProfilePic(base64Image);
    };
  };

  const handleBannerPic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Image = reader.result as string;
      setSelectedBannerPic(base64Image);
    };
  };

  return (
    editProfile && (
      <div className="flex justify-between  gap-3 border-t-2 border-neutral  pt-5">
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-base-content">Profile pic and Banner pic</p>
          <p className="text-info-content text-sm">Update your profile and banner pic</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-5">
            <p className="text-primary">Profile Pic:</p>
            <div className="rounded size-14 bg-primary flex  overflow-hidden ">
              <img src={selectedProfilePic || user?.profilePic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
            </div>

            <label className="btn btn-primary btn-sm">
              Upload
              <input onChange={handleProfilePic} type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <div className="flex items-center justify-between gap-5">
            <p className="text-primary">Banner Pic:</p>

            <div className="rounded size-14 bg-primary flex  overflow-hidden ">
              <img src={selectedBannerPic || user?.bannerPic || "/avatar.jpg"} className="bg-primary" alt="users Pic"></img>
            </div>

            <label className="btn btn-primary btn-sm">
              Upload
              <input onChange={handleBannerPic} type="file" className="hidden" accept="image/*" />
            </label>
          </div>
        </div>
      </div>
    )
  );
};
