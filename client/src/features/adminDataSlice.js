import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL;

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
});

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchAdminAbout = createAsyncThunk('adminData/fetchAbout', async () => {
  const { data } = await axios.get(`${BASE}/admin/about`, authHeader());
  return data;
});
export const saveAdminAbout = createAsyncThunk('adminData/saveAbout', async (payload) => {
  const { data } = await axios.put(`${BASE}/admin/about`, payload, authHeader());
  return data;
});

const makeListThunks = (name, path) => ({
  fetch: createAsyncThunk(`adminData/fetch${name}`, async () => {
    const { data } = await axios.get(`${BASE}/admin/${path}`, authHeader());
    return data;
  }),
  create: createAsyncThunk(`adminData/create${name}`, async (payload) => {
    const { data } = await axios.post(`${BASE}/admin/${path}`, payload, authHeader());
    return data;
  }),
  update: createAsyncThunk(`adminData/update${name}`, async ({ id, ...payload }) => {
    const { data } = await axios.put(`${BASE}/admin/${path}/${id}`, payload, authHeader());
    return data;
  }),
  remove: createAsyncThunk(`adminData/remove${name}`, async (id) => {
    await axios.delete(`${BASE}/admin/${path}/${id}`, authHeader());
    return id;
  }),
});

export const skillThunks = makeListThunks('Skill', 'skills');
export const statThunks = makeListThunks('Stat', 'stats');
export const educationThunks = makeListThunks('Education', 'education');
export const experienceThunks = makeListThunks('Experience', 'experience');
export const projectThunks = makeListThunks('Project', 'projects');
export const serviceThunks = makeListThunks('Service', 'services');

// ── Helpers ───────────────────────────────────────────────────────────────────

const listHandlers = (key, thunks) => (builder) => {
  builder
    .addCase(thunks.fetch.fulfilled, (state, a) => { state[key] = a.payload; })
    .addCase(thunks.create.fulfilled, (state, a) => { state[key].push(a.payload); })
    .addCase(thunks.update.fulfilled, (state, a) => {
      const i = state[key].findIndex((x) => x._id === a.payload._id);
      if (i !== -1) state[key][i] = a.payload;
    })
    .addCase(thunks.remove.fulfilled, (state, a) => {
      state[key] = state[key].filter((x) => x._id !== a.payload);
    });
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const adminDataSlice = createSlice({
  name: 'adminData',
  initialState: {
    about: {},
    skills: [],
    stats: [],
    education: [],
    experience: [],
    projects: [],
    services: [],
    loading: false,
    successMsg: '',
  },
  reducers: {
    clearSuccessMsg(state) { state.successMsg = ''; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAbout.fulfilled, (state, a) => { state.about = a.payload; })
      .addCase(saveAdminAbout.fulfilled, (state, a) => {
        state.about = a.payload;
        state.successMsg = 'Saved!';
      });

    listHandlers('skills', skillThunks)(builder);
    listHandlers('stats', statThunks)(builder);
    listHandlers('education', educationThunks)(builder);
    listHandlers('experience', experienceThunks)(builder);
    listHandlers('projects', projectThunks)(builder);
    listHandlers('services', serviceThunks)(builder);
  },
});

export const { clearSuccessMsg } = adminDataSlice.actions;
export default adminDataSlice.reducer;
