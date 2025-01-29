import { useForm } from "react-hook-form";
import { SendMessageData, sendMessageSchema } from "../../util/Types";
import { useSendMessageToUser } from "../../api/MessageApi";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useState } from "react";

export const ChatTextFieldInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendMessageData>({
    resolver: zodResolver(sendMessageSchema),
  });
  const { sendMessageToUser } = useSendMessageToUser();

  const [textAreaEmpty, setTextAreaEmpty] = useState<boolean>(true);

  const sendMessage = (data: SendMessageData) => {
    sendMessageToUser(data);
    reset();
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    if (textarea.value.length >= 1) {
      setTextAreaEmpty(false);
    } else {
      setTextAreaEmpty(true);
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  return (
    <form onSubmit={handleSubmit(sendMessage)} className=" relative  p-2  flex items-center gap-2">
      <textarea
        {...register("content")}
        className="w-full resize-none text-base-content  rounded textarea textarea-xs  place-content-center px-4 text-sm  "
        placeholder="Type your message here..."
        onInput={handleInput}
      ></textarea>
      {errors.content?.message && <span className="text-xs text-error absolute -top-5">{errors.content.message}</span>}

      <button
        disabled={textAreaEmpty}
        type="submit"
        className={`bg-accent btn shadow-md btn-square text-neutral hover:bg-accent/70  disabled:bg-accent disabled:text-base-200`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </form>
  );
};
