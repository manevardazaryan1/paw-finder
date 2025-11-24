import { createAsyncThunk } from '@reduxjs/toolkit'
import * as reportAPI from '../api/services/report'

export const getAll = createAsyncThunk('reports/getAll', async (params, thunkAPI) => {
  try {
    return await reportAPI.getAll(params)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const getById = createAsyncThunk('reports/getById', async (id, thunkAPI) => {
  try {
    return await reportAPI.getById(id)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const create = createAsyncThunk('reports/create', async (data, thunkAPI) => {
  try {
    return await reportAPI.create(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const update = createAsyncThunk('reports/update', async ({ id, data }, thunkAPI) => {
  try {
    return await reportAPI.update(id, data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const destroy = createAsyncThunk('reports/delete', async (id, thunkAPI) => {
  try {
    return await reportAPI.destroy(id)
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
