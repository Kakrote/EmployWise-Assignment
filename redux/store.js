"use client"
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import usersReducer from "./user/userSlice"
export const store=configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
      },

})