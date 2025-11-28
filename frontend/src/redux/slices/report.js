import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'
import { getAll, getById, create, update, destroy } from '../../services/report'

const reportsState = (state) => state.reports

export const selectReports = createSelector([reportsState], (state) => state.reports)
export const selectSelected = createSelector([reportsState], (state) => state.selected)
export const selectPage = createSelector([reportsState], (state) => state.page)
export const selectLastPage = createSelector([reportsState], (state) => state.lastPage)
export const selectHasNextPage = createSelector([reportsState], (state) => state.hasNextPage)
export const selectHasPrevPage = createSelector([reportsState], (state) => state.hasPrevPage)
export const selectTotal = createSelector([reportsState], (state) => state.total)
export const selectLoading = createSelector([reportsState], (state) => state.loading)

const initialState = {
  reports: [],
  selected: null,
  page: 1,
  lastPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  total: 0,
  loading: false
}

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    select: (state, action) => {
      return {
        ...state,
        selected: state.reports.find(({ id }) => id === action.payload.id) || null
      }
    },
    clear: (state) => {
      return { ...state, selected: null }
    },
    addReport: (state, action) => {
      return { ...state, reports: [action.payload, ...state.reports] }
    },
    updateSelected: (state, action) => {
      return { ...state, selected: action.payload.report }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false
        state.reports = action.payload.reports
        state.page = action.payload.page
        state.lastPage = action.payload.lastPage
        state.hasNextPage = action.payload.hasNextPage
        state.hasPrevPage = action.payload.hasPrevPage
        state.total = action.payload.total
      })
      .addCase(getAll.rejected, (state) => {
        state.loading = false
      })

      .addCase(getById.pending, (state) => {
        state.loading = true
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedReport = action.payload
      })
      .addCase(getById.rejected, (state) => {
        state.loading = false
      })

      .addCase(create.pending, (state) => {
        state.loading = true
      })
      .addCase(create.fulfilled, (state) => {
        state.loading = false
        state.total += 1
      })
      .addCase(create.rejected, (state) => {
        state.loading = false
      })

      .addCase(update.pending, (state) => {
        state.loading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        const { report } = action.payload
        state.loading = false
        const index = state.reports.findIndex(({ id }) => id === report.id)
        if (index !== -1) state.reports[index] = report
      })
      .addCase(update.rejected, (state) => {
        state.loading = false
      })

      .addCase(destroy.pending, (state) => {
        state.loading = true
      })
      .addCase(destroy.fulfilled, (state, action) => {
        state.loading = false
        state.reports = state.reports.filter(({ id }) => id !== action.payload.id)
        state.total -= 1
      })
      .addCase(destroy.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { select, clear, addReport, updateSelected } = reportSlice.actions
export default reportSlice.reducer
