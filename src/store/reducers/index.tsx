import { combineReducers } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import authReducer from './authSlice';

const appReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
});

export default appReducer;