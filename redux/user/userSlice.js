"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://reqres.in/api/users";

// Fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page = 1) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data.data;
});

// Edit user
export const editUser = createAsyncThunk("users/editUser", async ({ id, updatedUser }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedUser, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status !== 200) throw new Error("Failed to update user");

  return { id, updatedUser };
});

// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  if (response.status !== 204) throw new Error("Failed to delete user");

  return id; 
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { id, updatedUser } = action.payload;
        state.users = state.users.map(user => (user.id === id ? { ...user, ...updatedUser } : user));
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
