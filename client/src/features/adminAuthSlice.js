import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/auth/login`, { username, password });
      localStorage.setItem('adminToken', data.token);
      return data.token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const tokenFromStorage = localStorage.getItem('adminToken');

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    token: tokenFromStorage || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('adminToken');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
