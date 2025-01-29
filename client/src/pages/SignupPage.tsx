import { useState } from "react";
import { RegisterForm } from "../components/SignupForms/RegisterForm";
import { LoginForm } from "../components/SignupForms/LoginForm";

export const SignupPage = () => {
  const [toggleForm, setToggleForm] = useState<boolean>(true);

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-base-100 ">
      <div className=" md:w-2/4 flex flex-col  justify-center flex-1">
        <div className="m-14 md:mx-24 lg:mx-44">
          {toggleForm ? <RegisterForm setToggleForm={setToggleForm}></RegisterForm> : <LoginForm setToggleForm={setToggleForm}></LoginForm>}
        </div>
      </div>
      <div className="bg-base-300 border-l border-info-content w-2/4  flex-col items-center justify-center hidden md:flex md:p-10 lg:p-20 ">
        <h1 className="text-5xl text-primary font-semibold">Welcome to Chatter</h1>
        <p className="text-info-content mt-2">Connect with your friends and family instantly!</p>
        <div className="mt-20 flex flex-col gap-5 text-sm">
          <div className="text-info-content flex flex-col gap-3">
            <div className="flex items-center bg-primary/10 w-fit rounded-lg p-1 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <p className="text-primary whitespace-nowrap  font-medium mr-5">Instant Messaging:</p>
            </div>

            <p className="pl-10">"Send and receive messages in real-time with our fast and reliable chat system."</p>
          </div>
          <div className="text-info-content flex flex-col gap-3">
            <div className="flex items-center bg-primary/10 w-fit rounded-lg p-1 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              <p className="text-primary whitespace-nowrap font-medium  mr-5">Group Chats:</p>
            </div>

            <p className="pl-10">"Create group chats with your friends, family, or colleagues to stay connected."</p>
          </div>

          <div className="text-info-content flex flex-col gap-3">
            <div className="flex items-center bg-primary/10 w-fit rounded-lg p-1 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p className="text-primary whitespace-nowrap  font-medium  mr-5">Media Sharing:</p>
            </div>

            <p className="pl-10"> "Share photos, videos, and files with ease—just a click away!"</p>
          </div>
          <div className="text-info-content flex flex-col gap-3">
            <div className="flex items-center bg-primary/10 w-fit rounded-lg p-1 gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <p className="text-primary whitespace-nowrap font-medium  mr-5 ">Customizable Profile:</p>
            </div>
            <p className="pl-10">"Personalize your profile with a photo, bio, and status."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
