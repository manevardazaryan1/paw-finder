import { useSearchParams } from 'react-router-dom'

const Pagination = ({ currentPage, lastPage, hasPrevPage, hasNextPage, onPageChange }) => {
  const [_, setSearchParams] = useSearchParams()

  const handlePageChange = (page) => {
    onPageChange(page)
    setSearchParams({ page })
  }

  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      {currentPage > 1 && <button onClick={() => handlePageChange(1)}>1</button>}

      {
        <button disabled={!hasPrevPage} onClick={() => handlePageChange(currentPage - 1)}>
          Prev
        </button>
      }
      <button disabled>{currentPage}</button>

      <button disabled={!hasNextPage} onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>

      {currentPage !== lastPage && (
        <button onClick={() => handlePageChange(lastPage)}>{lastPage}</button>
      )}
    </div>
  )
}

export default Pagination
