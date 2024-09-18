// src/features/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
    transports: ['websocket'], // Use WebSocket as the primary transport
    withCredentials: true,     // This allows CORS cookies and headers
  });
  
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch all tasks for a workboard
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (workBoardId, thunkAPI) => {
  try {
    const response = await axios.get(`/api/tasks/?workboard=${workBoardId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Create a new task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
  socket.emit('create_task', taskData);
  return taskData;  // Assuming WebSocket will handle the rest
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskUpdated: (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    },
    taskDeleted: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      });
  },
});

export const { taskUpdated, taskDeleted } = taskSlice.actions;
export default taskSlice.reducer;

// WebSocket listeners for task updates
socket.on('task_created', (data) => {
  store.dispatch(taskUpdated(data.task));
});
socket.on('task_deleted', (data) => {
  store.dispatch(taskDeleted(data.task_id));
});
