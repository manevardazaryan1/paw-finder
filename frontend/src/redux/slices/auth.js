import { createSlice } from '@reduxjs/toolkit'
import { signUp, signIn } from '../../services/auth'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  success: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.success = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.success = action.payload.success
      })
      .addCase(signUp.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload?.message || 'Sign up failed'
      })

      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.success = action.payload.success
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(signIn.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload?.message || 'Sign in failed'
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
