import { configureStore } from '@reduxjs/toolkit'
import signInReducer from './slices/auth/signIn'
import signUpReducer from './slices/auth/singUp'
import reportReducer from './slices/report'

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
    reports: reportReducer
  }
})
