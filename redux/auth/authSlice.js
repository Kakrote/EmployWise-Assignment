"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isAllowed:false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
            state.isAllowed=true;
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
            state.isAllowed=false;
        },
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;