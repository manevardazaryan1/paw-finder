import { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getAll } from '../services/report'
import { select, clear } from '../redux/slices/report'
import useDebounce from './useDebounce'
import { REPORTS_SORT_ORDER } from '../constants/app'
import {
  selectSelected,
  selectTotal,
  selectReports,
  selectLastPage,
  selectHasNextPage,
  selectHasPrevPage
} from '../redux/slices/report'

const useReports = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1)
  const selected = useSelector(selectSelected)
  const [isOpen, setIsOpen] = useState(!!selected)
  const [status, setStatus] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [sortOrder, setSortOrder] = useState(REPORTS_SORT_ORDER)

  const reports = useSelector(selectReports)
  const total = useSelector(selectTotal)
  const lastPage = useSelector(selectLastPage)
  const hasNextPage = useSelector(selectHasNextPage)
  const hasPrevPage = useSelector(selectHasPrevPage)
  const search = useDebounce(searchInput, 500)
  const prevTotal = useRef(total)
  let currentPage

  useEffect(() => {
    currentPage = page
    if (currentPage > lastPage) {
      current = 1
    }
    dispatch(getAll({ page: currentPage, status, search, sortOrder }))
  }, [dispatch, page, status, search, sortOrder])

  useEffect(() => {
    if (total < prevTotal.current) {
      prevTotal.current = total
      dispatch(getAll({ page, status, search, sortOrder }))
    }
  }, [dispatch, total])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    }
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpen])

  const handleSearchChange = useCallback((value) => {
    setSearchInput(value)
    setPage(1)
  }, [])

  const handleStatusChange = useCallback((value) => {
    setStatus(value)
    setPage(1)
  }, [])

  const handleSortOrderChange = useCallback((order) => {
    setSortOrder(order)
    setPage(1)
  }, [])

  const handleClose = useCallback(() => {
    dispatch(clear())
    setIsOpen(false)
  }, [])

  const handleShowDetails = useCallback((report) => {
    setIsOpen(true)
    dispatch(select(report))
  }, [])

  return {
    reports,
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
