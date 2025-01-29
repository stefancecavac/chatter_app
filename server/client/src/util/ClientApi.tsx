import axios from "axios";

export const ApiClient = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
