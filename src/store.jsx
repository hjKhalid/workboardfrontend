// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import workBoardReducer from "./features/workBoardSlice";
import taskReducer from "./features/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workBoard: workBoardReducer,
    tasks: taskReducer,
  },
});
