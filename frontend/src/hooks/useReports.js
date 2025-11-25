import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getAll } from '../services/report'
import { select, clear } from '../redux/slices/report'
import useDebounce from './useDebounce'
import { REPORTS_SORT_ORDER } from '../constants/app'
import {
  selectReports,
  selectLoading,
  selectLastPage,
  selectHasNextPage,
  selectHasPrevPage
} from '../redux/slices/report'

const useReports = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortOrder, setSortOrder] = useState(REPORTS_SORT_ORDER)

  const reports = useSelector(selectReports)
  const loading = useSelector(selectLoading)
  const lastPage = useSelector(selectLastPage)
  const hasNextPage = useSelector(selectHasNextPage)
  const hasPrevPage = useSelector(selectHasPrevPage)
  const search = useDebounce(searchInput, 500)

  const handleSearchChange = (value) => {
    setSearchInput(value)
    setPage(1)
  }

  const handleStatusChange = (value) => {
    setStatus(value)
    setPage(1)
  }

  const handleSortOrderChange = (order) => {
    setSortOrder(order)
    setPage(1)
  }

  useEffect(() => {
    dispatch(getAll({ page, status, search, sortOrder }))
  }, [dispatch, page, status, search, sortOrder])

  const handleClose = () => {
    dispatch(clear())
    setIsOpen(false)
  }

  const handleShowDetails = (report) => {
    setIsOpen(true)
    dispatch(select(report))
  }

  return {
    reports,
    loading,
    page,
    lastPage,
    hasNextPage,
    hasPrevPage,
    isOpen,
    status,
    searchInput,
    sortOrder,
    setPage,
    handleClose,
    handleShowDetails,
    handleSearchChange,
    handleStatusChange,
    handleSortOrderChange
  }
}

export default useReports
