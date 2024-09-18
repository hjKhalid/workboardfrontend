// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

// Get JWT token and decode user info
const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null,
  loading: false,
  error: null,
};

// Login user
export  const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/login/",
        credentials
      );
      const token = response.data.access;
      localStorage.setItem("token", token);
      return (token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Signup user
export const signup = createAsyncThunk(
  "auth/signup",
  async (userInfo, thunkAPI) => {
    try {
      await axios.post("/api/signup/", userInfo);
      return "Signup successful";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
