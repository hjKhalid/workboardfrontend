// src/features/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Fetch all tasks for a workboard
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (workBoardId, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/tasks?id=${workBoardId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Network error');
  }
});

// Create a new task (via WebSocket)
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
  try {
    // Emit task creation event to the WebSocket server
    console.log(taskData);
    
   const create= await axios.post('http://localhost:8000/api/tasks/',taskData)
    return create;  // Assuming WebSocket will handle the rest
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
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
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch tasks';
        state.loading = false;
      })
      
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Add the new task to the state
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create task';
        state.loading = false;
      });
  },
});

export const { taskUpdated, taskDeleted } = taskSlice.actions;
export default taskSlice.reducer;

// WebSocket listeners for task updates
// socket.on('task_created', (data) => {
//   store.dispatch(taskUpdated(data.task)); // Dispatch the taskUpdated action
// });

// socket.on('task_deleted', (data) => {
//   store.dispatch(taskDeleted(data.task_id)); // Dispatch the taskDeleted action
// });

// // WebSocket error handling
// socket.on('connect_error', (error) => {
//   console.error('WebSocket connection error:', error);
// });

// socket.on('disconnect', (reason) => {
//   console.warn('WebSocket disconnected:', reason);
//   if (reason === 'io server disconnect') {
//     // Try to reconnect if the server disconnected the client
//     socket.connect();
//   }
// });

// socket.on('reconnect_attempt', () => {
//   console.log('Attempting to reconnect to WebSocket server...');
// });
