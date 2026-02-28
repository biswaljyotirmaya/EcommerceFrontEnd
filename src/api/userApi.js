import api from "./axios";

export const onboardUser = (data) => api.post("/api/users/onboard", data);

export const getCurrentUser = () => api.get("/api/users/me");

export const updateProfile = (data) =>
  api.put("/api/users/me", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
