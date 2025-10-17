import axios from "axios";

// 🟢 Create a single axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1", // your backend base
  withCredentials: true, // send cookies / auth tokens if used
});

// 🟢 Login
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  if (res.status !== 200) throw new Error("Unable to Login");
  return res.data;
};

// 🟢 Signup
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/user/signup", { name, email, password });
  if (res.status !== 201) throw new Error("Unable to Signup");
  return res.data;
};

// 🟢 Auth Check
export const checkAuthStatus = async () => {
  const res = await api.get("/user/auth-status");
  if (res.status !== 200) throw new Error("Unable to authenticate");
  return res.data;
};

// 🟢 Send Chat Message
export const sendChatRequest = async (message: string) => {
  const res = await api.post("/chat/new", { message });
  if (res.status !== 200) throw new Error("Unable to send chat");
  return res.data;
};

// 🟢 Get All Chats
export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  if (res.status !== 200) throw new Error("Unable to fetch chats");
  return res.data;
};

// 🟢 Delete Chats
export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete");
  if (res.status !== 200) throw new Error("Unable to delete chat");
  return res.data;
};

// 🟢 Logout
export const logoutUser = async () => {
  const res = await api.get("/user/logout");
  if (res.status !== 200) throw new Error("Unable to logout");
  return res.data;
};
