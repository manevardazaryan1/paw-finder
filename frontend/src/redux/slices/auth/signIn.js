import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { signIn } from '../../../services/auth'

const auth = (state) => state.signIn

export const selectUser = createSelector([auth], (auth) => auth.user)
export const selectToken = createSelector([auth], (auth) => auth.token)
export const selectLoading = createSelector([auth], (auth) => auth.loading)
export const selectError = createSelector([auth], (auth) => auth.error)

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  loading: false,
  error: null
}

const signInSlice = createSlice({
  name: 'auth/signIn',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = [
          'Sign in failed',
          action.payload?.message,
          ...action.payload?.errors?.map((err) => err.msg)
        ]
      })
  }
})

export const { signOut, getCurrentUser } = signInSlice.actions
export default signInSlice.reducer
