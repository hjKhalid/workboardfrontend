// src/features/workBoardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  workBoards: [],
  loading: false,
  error: null,
};

// Fetch all workboards
export const fetchWorkBoards = createAsyncThunk('workBoard/fetchWorkBoards', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/api/workboards/');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Create a new workboard
export const createWorkBoard = createAsyncThunk('workBoard/createWorkBoard', async (boardData, thunkAPI) => {
  try {
    const response = await axios.post('/api/workboards/', boardData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const workBoardSlice = createSlice({
  name: 'workBoard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkBoards.fulfilled, (state, action) => {
        state.workBoards = action.payload;
        state.loading = false;
      })
      .addCase(fetchWorkBoards.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(createWorkBoard.fulfilled, (state, action) => {
        state.workBoards.push(action.payload);
        state.loading = false;
      });
  },
});

export default workBoardSlice.reducer;
