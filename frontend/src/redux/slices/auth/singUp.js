import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { signUp } from '../../../services/auth'

const auth = (state) => state.signUp

export const selectLoading = createSelector([auth], (auth) => auth.loading)
export const selectError = createSelector([auth], (auth) => auth.error)

const initialState = {
  loading: false,
  error: null
}

const signUpSlice = createSlice({
  name: 'auth/signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = [
          action.payload?.message || 'Sign up failed',
          ...action.payload.errors?.map((err) => err.msg)
        ]
      })
  }
})

export default signUpSlice.reducer
