import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    authReady(state) {
      state.loading = false;
    },
    logout(state) {
      state.firebaseUid = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser, authReady, logout } = authSlice.actions;
export default authSlice.reducer;
