import { useSearchParams } from 'react-router-dom'

const usePagination = ({ onPageChange }) => {
  const [_, setSearchParams] = useSearchParams()

  const handlePageChange = (page) => {
    onPageChange(page)
    setSearchParams({ page })
  }

  return {
    handlePageChange
  }
}

export default usePagination
