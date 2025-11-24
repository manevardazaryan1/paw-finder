import { createAsyncThunk } from '@reduxjs/toolkit'
import * as authAPI from '../api/services/auth'

export const signUp = createAsyncThunk('auth/signUp', async (data, thunkAPI) => {
  try {
    return await authAPI.signUp(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const signIn = createAsyncThunk('auth/signIn', async (data, thunkAPI) => {
  try {
    return await authAPI.signIn(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
