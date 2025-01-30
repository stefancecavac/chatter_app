import { useEffect, useRef } from "react";
import { useGetChatWitFriend, useMarkMessageAsRead } from "../api/MessageApi";
import { ChatHeader } from "../components/ChatComponents/ChatHeader";
import { ChatMessages } from "../components/ChatComponents/ChatMessages";
import { ChatTextFieldInput } from "../components/ChatComponents/ChatTextFieldInput";
import { useNavigate, useParams } from "react-router-dom";
import { UseAuthContext } from "../context/AuthContext";
import { UseObserverHook } from "../hooks/UseObserverHook";

export const ChatPage = () => {
  const { user } = UseAuthContext();
  const { messages, lastMessage, chatUser, chatLoading, chatError, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetChatWitFriend();
  const { receiverId } = useParams();
  const { markMessageAsRead } = useMarkMessageAsRead();
  const { buttonVisible, observerRef } = UseObserverHook({ hasNextPage });
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (chatError?.success === false || !receiverId) {
      navigate("/");
    }
  }, [chatError, receiverId, navigate]);

  useEffect(() => {
    if (receiverId && lastMessage?.isRead === false && user?.id === lastMessage.receiverId) {
      markMessageAsRead(receiverId);
    }
  }, [receiverId, user?.id, lastMessage?.receiverId]);

  useEffect(() => {
    if (!messageEndRef.current) return;
    if (buttonVisible) return;
    messageEndRef.current.scrollIntoView({ behavior: "instant" });
  }, [buttonVisible, messages]);

  return (
    <div className="w-full flex flex-col relative">
      <ChatHeader chatUser={chatUser} chatLoading={chatLoading}></ChatHeader>

      <div className="flex-1 flex flex-col p-5 pb-0 overflow-auto">
        <div className="relaitve" ref={observerRef}></div>
        {buttonVisible && (
          <button
            disabled={isFetchingNextPage}
            className="absolute btn top-16 mx-20 left-0 right-0 z-20 bg-opacity-50 hover:bg-opacity-50 text-xs font-normal btn-sm"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? <span className="loading loading-spinner text-primary"></span> : "Load more"}
          </button>
        )}

        {messages?.map((message, index) => (
          <div key={index}>
            <ChatMessages message={message} chatUser={chatUser}></ChatMessages>
            <div ref={messageEndRef}></div>
          </div>
        ))}
      </div>

      <ChatTextFieldInput></ChatTextFieldInput>
    </div>
  );
};
