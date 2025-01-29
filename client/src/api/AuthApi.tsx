import { ApiClient } from "../util/ClientApi";
import { LoginData, RegisterData, UpdateUserData } from "../util/Types";

export const registerUserApi = async (data: RegisterData) => {
  const response = await ApiClient.post("/auth/register", data);
  return response.data;
};

export const loginUserApi = async (data: LoginData) => {
  const response = await ApiClient.post("/auth/login", data);
  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await ApiClient.get("/auth/user");
  return response.data;
};

export const logoutCurrentUserApi = async () => {
  const response = await ApiClient.post("/auth/logout");
  return response.data;
};

export const updateUserApi = async (data: UpdateUserData) => {
  const response = await ApiClient.put("/auth/update-user", data);
  return response.data;
};

export const updateUserPrivacyApi = async () => {
  const response = await ApiClient.put("/auth/update-user-privacy");
  return response.data;
};
