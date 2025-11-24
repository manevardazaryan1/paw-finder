import { createSlice } from '@reduxjs/toolkit'
import { getAll, getById, create, update, destroy } from '../../services/report'

const initialState = {
  reports: [],
  selected: null,
  page: 1,
  lastPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  total: 0,
  loading: false,
  success: null,
  error: null
}

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    select: (state, action) => {
      state.selected = state.reports.find(({ id }) => id === action.payload.id) || null
    },
    clear: (state) => {
      state.selected = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload
        state.page = action.payload.page
        state.lastPage = action.payload.lastPage
        state.hasNextPage = action.payload.hasNextPage
        state.hasPrevPage = action.payload.hasPrevPage
        state.total = action.payload.total
        state.success = action.payload.success
      })
      .addCase(getAll.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch reports'
      })

      .addCase(getById.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedReport = action.payload
        state.success = action.payload.success
      })
      .addCase(getById.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch report'
      })

      .addCase(create.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false
        state.reports.push(action.payload)
        state.success = action.payload.success
      })
      .addCase(create.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload?.message || 'Failed to create report'
      })

      .addCase(update.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(update.fulfilled, (state, action) => {
        const { report, success } = action.payload
        state.loading = false
        const index = state.reports.findIndex(({ id }) => id === report.id)
        if (index !== -1) state.reports[index] = report
        state.success = success
      })
      .addCase(update.rejected, (state, action) => {
        state.success = false
        state.loading = false
        state.error = action.payload?.message || 'Failed to update report'
      })

      .addCase(destroy.pending, (state) => {
        state.loading = true
        state.success = null
        state.error = null
      })
      .addCase(destroy.fulfilled, (state, action) => {
        state.loading = false
        state.reports = state.reports.filter(({ id }) => id !== action.payload.id)
        state.success = action.payload.success
      })
      .addCase(destroy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to delete report'
      })
  }
})

export const { select, clear } = reportSlice.actions
export default reportSlice.reducer
