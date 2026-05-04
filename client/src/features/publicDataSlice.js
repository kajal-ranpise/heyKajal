import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchAbout = createAsyncThunk('publicData/fetchAbout', async () => {
  const { data } = await axios.get(`${BASE}/about`);
  return data;
});

export const fetchSkills = createAsyncThunk('publicData/fetchSkills', async () => {
  const { data } = await axios.get(`${BASE}/skills`);
  return data;
});

export const fetchStats = createAsyncThunk('publicData/fetchStats', async () => {
  const { data } = await axios.get(`${BASE}/stats`);
  return data;
});

export const fetchEducation = createAsyncThunk('publicData/fetchEducation', async () => {
  const { data } = await axios.get(`${BASE}/education`);
  return data;
});

export const fetchExperience = createAsyncThunk('publicData/fetchExperience', async () => {
  const { data } = await axios.get(`${BASE}/experience`);
  return data;
});

export const fetchProjects = createAsyncThunk('publicData/fetchProjects', async () => {
  const { data } = await axios.get(`${BASE}/projects`);
  return data;
});

export const fetchServices = createAsyncThunk('publicData/fetchServices', async () => {
  const { data } = await axios.get(`${BASE}/services`);
  return data;
});

const publicDataSlice = createSlice({
  name: 'publicData',
  initialState: {
    about: {},
    skills: [],
    stats: [],
    education: [],
    experience: [],
    projects: [],
    services: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.fulfilled, (state, a) => { state.about = a.payload; })
      .addCase(fetchSkills.fulfilled, (state, a) => { state.skills = a.payload; })
      .addCase(fetchStats.fulfilled, (state, a) => { state.stats = a.payload; })
      .addCase(fetchEducation.fulfilled, (state, a) => { state.education = a.payload; })
      .addCase(fetchExperience.fulfilled, (state, a) => { state.experience = a.payload; })
      .addCase(fetchProjects.fulfilled, (state, a) => { state.projects = a.payload; })
      .addCase(fetchServices.fulfilled, (state, a) => { state.services = a.payload; });
  },
});

export default publicDataSlice.reducer;
