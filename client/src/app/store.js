import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profileSlice';
import adminAuthReducer from '../features/adminAuthSlice';
import adminDataReducer from '../features/adminDataSlice';
import publicDataReducer from '../features/publicDataSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    adminAuth: adminAuthReducer,
    adminData: adminDataReducer,
    publicData: publicDataReducer,
  },
});

export default store;
