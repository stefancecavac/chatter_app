import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getCurrentUserApi, loginUserApi, logoutCurrentUserApi, registerUserApi, updateUserApi, updateUserPrivacyApi } from "../api/AuthApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InternalAxiosRequestConfig } from "axios";
import { LoginData, RegisterData, UpdateUserData, userData } from "../util/Types";
import { io, Socket } from "socket.io-client";
import { ApiClient } from "../util/ClientApi";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

type authContextType = {
  user: userData;
  userLoading: boolean;
  onlineUsers: string[] | null;
  registerUser: (data: RegisterData) => void;
  registerError: Error | null;
  registerPending: boolean;
  loginUser: (data: LoginData) => void;
  loginError: Error | null;
  loginPending: boolean;
  updateProfile: (data: UpdateUserData) => void;
  updatePending: boolean;
  updatePrivacy: () => void;
  updatePrivacyPending: boolean;
  logoutUser: () => void;
};
export const AuthContext = React.createContext<authContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | null>(null);

  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUserApi,
  });

  const {
    mutate: registerUser,
    error: registerError,
    isPending: registerPending,
  } = useMutation({
    mutationKey: ["auth"],
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      connectSocket();
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const {
    mutate: loginUser,
    error: loginError,
    isPending: loginPending,
  } = useMutation({
    mutationKey: ["auth"],
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      setToken(data.accessToken);
      connectSocket();
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: logoutUser } = useMutation({
    mutationKey: ["auth"],
    mutationFn: logoutCurrentUserApi,
    onSuccess: () => {
      setToken(undefined);
      disconnectSocket();
      queryClient.setQueryData(["auth"], null);
    },
  });

  const { mutate: updateProfile, isPending: updatePending } = useMutation({
    mutationKey: ["profile"],
    mutationFn: updateUserApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], () => {
        return data;
      });
    },
  });

  const { mutate: updatePrivacy, isPending: updatePrivacyPending } = useMutation({
    mutationKey: ["profile"],
    mutationFn: updateUserPrivacyApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], () => {
        return data;
      });
    },
  });

  useLayoutEffect(() => {
    const requestInterceptor = ApiClient.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      config.headers.Authorization = token && !config._retry ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      ApiClient.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const responseInterceptor = ApiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response.status === 401) {
          originalRequest._retry = true;

          try {
            const response = await ApiClient.post("/auth/refresh-token");
            const newAccessToken = response.data.accessToken;
            setToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return ApiClient(originalRequest);
          } catch {
            setToken(undefined);
            logoutUser();
          }
        }
        return Promise.reject(error.response.data);
      }
    );
    return () => {
      ApiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  const connectSocket = () => {
    if (!user?.id || socket?.connected) return;

    const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
      query: {
        userId: user.id,
      },
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("newMessage", (message) => {
      queryClient.setQueryData(["chat", message.senderId], (oldMessages: any) => {
        if (!oldMessages) return;

        return {
          ...oldMessages,
          pages: oldMessages.pages.map((page: any, index: number) => {
            if (index == 0) {
              return {
                ...page,
                messages: [...page.messages, message],
                lastMessage: message,
              };
            }
            return page;
          }),
        };
      });

      queryClient.setQueryData(["chats"], (oldChats: userData[]) => {
        if (!oldChats) return [];

        const updatedChats = oldChats.map((chat) => (chat.id === message.senderId ? { ...chat, lastMessage: message } : chat));

        return updatedChats.sort((a, b) => {
          const dateA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const dateB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;

          return dateB - dateA;
        });
      });
    });
  };

  useEffect(() => {
    if (user) {
      connectSocket();
    }
  }, [user]);

  const disconnectSocket = () => {
    if (socket?.connected) return socket.disconnect();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        onlineUsers,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
        loginError,
        registerError,
        updatePending,
        loginPending,
        registerPending,
        updatePrivacy,
        updatePrivacyPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as authContextType;
};
