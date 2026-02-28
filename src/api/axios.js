import axios from "axios";
import { auth } from "../config/firebse";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    config.headers["X-Firebase-Uid"] = user.uid;
  }

  return config;
});

export default api;
