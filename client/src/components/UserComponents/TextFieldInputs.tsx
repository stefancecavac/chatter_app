import React from "react";
import { userData } from "../../util/Types";
import { useFormContext } from "react-hook-form";

type textFieldInputsProps = {
  editProfile: boolean;
  user: userData;
};

export const TextFieldInputs: React.FC<textFieldInputsProps> = ({ editProfile, user }) => {
  const { register } = useFormContext();

  return (
    <>
      <div className="flex justify-between  gap-3 border-t-2 border-neutral  pt-5">
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-base-content">Full Name:</p>
          <p className="text-info-content text-sm">Your name and lastname</p>
        </div>

        <div className="flex items-center justify-between gap-5">
          <input readOnly={!editProfile} value={user?.name || ""} {...register("name")} className="input bg-neutral  input-sm "></input>
          <input readOnly={!editProfile} value={user?.lastName || ""} {...register("lastName")} className="input bg-neutral  input-sm"></input>
        </div>
      </div>

      <div className="flex justify-between  gap-3 border-t-2 border-neutral  pt-5">
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-base-content">Email:</p>
          <p className="text-info-content text-sm">Your email</p>
        </div>

        {!user.isPrivate ? (
          <div className="flex items-center justify-between gap-5">
            <input readOnly={!editProfile} value={user?.email} {...register("email")} className="input bg-neutral  input-sm "></input>
          </div>
        ) : (
          <p className="text-sm text-info-content">User profile is set to private</p>
        )}
      </div>

      <div className="flex justify-between  gap-3 border-t-2 border-neutral  pt-5">
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-base-content">Friend-Code:</p>
          <p className="text-info-content text-sm">Your friend-code to share</p>
        </div>

        {!user.isPrivate ? (
          <div className="flex items-center justify-between gap-3">
            <input readOnly value={user.friendCode} className="input bg-neutral  text-primary"></input>
            <label
              onClick={() => {
                navigator.clipboard.writeText(user.friendCode);
              }}
              className="swap swap-flip  p-3  rounded-lg transition-all"
            >
              <input type="checkbox" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-primary swap-off  "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-primary swap-on"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </label>
          </div>
        ) : (
          <p className="text-sm text-info-content">User profile is set to private</p>
        )}
      </div>
    </>
  );
};
