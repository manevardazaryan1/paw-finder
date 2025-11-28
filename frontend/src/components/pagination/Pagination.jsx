import usePagination from '../../hooks/usePagination'

const Pagination = ({ currentPage, lastPage, hasPrevPage, hasNextPage, onPageChange }) => {
  const { handlePageChange } = usePagination({ onPageChange })

  return (
    <>
      {lastPage > 1 && (
        <div className="flex flex-wrap gap-2 items-center justify-center mt-6">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-1 border border-gray-500 rounded text-white hover:bg-gray-500 transition"
            >
              1
            </button>
          )}

          {
            <button
              disabled={!hasPrevPage}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 border border-gray-500 rounded text-white hover:bg-gray-500 transition"
            >
              Prev
            </button>
          }
          <button
            disabled
            className="px-3 py-1 border border-gray-500 rounded text-white hover:bg-gray-500 transition"
          >
            {currentPage}
          </button>

          <button
            disabled={!hasNextPage}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border border-gray-500 rounded text-white hover:bg-gray-500 transition"
          >
            Next
          </button>

          {currentPage !== lastPage && (
            <button
              onClick={() => handlePageChange(lastPage)}
              className="px-3 py-1 border border-gray-500 rounded text-white hover:bg-gray-500 transition"
            >
              {lastPage}
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default Pagination
