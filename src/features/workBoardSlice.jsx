
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { response } from 'express';

const initialState = {
  workBoards: [], // Array to hold workboards
  loading: false, // Loading state for asynchronous requests
  error: null, // Error state
};

// Fetch all workboards
export const fetchWorkBoards = createAsyncThunk(
  'workBoard/fetchWorkBoards',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:8000/api/workboards/ '); // Adjusted API endpoint for workboards
      return response.data;
    } catch (error) {
      // Safeguard in case error.response is undefined
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong while fetching workboards');
    }
  }
);

// Create a new workboard
export const createWorkBoard = createAsyncThunk(
  'workBoard/createWorkBoard',
  async (boardData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/api/workboards/', boardData); // Adjusted API endpoint for workboards
      return response.data;
    } catch (error) {
      // Safeguard in case error.response is undefined
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create workboard');
    }
  }
);

export const deleteWorkBoard = createAsyncThunk(
  'workBoard/deleteWorkBoard',
  async(id,thunkAPI)=>{
    try {
      const response= await axios.delete(`http://localhost:8000/api/workboards/${id}`)
     return response.data;     
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create workboard');
      
    }

  }
)

const workBoardSlice = createSlice({
  name: 'workBoard',
  initialState,
  reducers: {}, // Add any reducers you need here
  extraReducers: (builder) => {
    builder
      // Handle fetching workboards
      .addCase(fetchWorkBoards.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting new request
      })
      .addCase(fetchWorkBoards.fulfilled, (state, action) => {
        state.workBoards = action.payload; // Populate workboards on successful fetch
        state.loading = false;
      })
      .addCase(fetchWorkBoards.rejected, (state, action) => {
        state.error = action.payload; // Set error state on fetch failure
        state.loading = false;
      })

      // Handle creating workboard
      .addCase(createWorkBoard.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when starting new request
      })
      .addCase(createWorkBoard.fulfilled, (state, action) => {
        state.workBoards.push(action.payload); // Add the new workboard to the list
        state.loading = false;
      })
      .addCase(createWorkBoard.rejected, (state, action) => {
        state.error = action.payload; // Set error state on create failure
        state.loading = false;
      });
  },
});

export default workBoardSlice.reducer;
