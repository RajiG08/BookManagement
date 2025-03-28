import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice" // Adjust as per your project
//src\features\auth\authSlice.jsx


export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
