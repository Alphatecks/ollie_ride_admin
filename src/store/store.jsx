// src/store/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/loginSuccess", "auth/registerSuccess"],
        ignoredPaths: ["auth.user"],
      },
    }),
});

