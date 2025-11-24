import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import reportReducer from './slices/report'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: reportReducer
  }
})
