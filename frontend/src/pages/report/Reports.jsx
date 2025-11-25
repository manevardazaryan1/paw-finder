// import { useDispatch } from 'react-redux'
import useReports from '../../hooks/useReports'
import { BACKEND_URL } from '../../constants/app'
import Details from '../../components/modals/report/Details'
import Pagination from '../../components/pagination/Pagination'

const Reports = () => {
  const {
    reports,
    loading,
    page,
    hasNextPage,
    hasPrevPage,
    lastPage,
    isOpen,
    status,
    searchInput,
    sortOrder,
    handleSearchChange,
    handleStatusChange,
    handleSortOrderChange,
    handleClose,
    handleShowDetails,
    setPage
  } = useReports()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>All Reports</h1>

      <input
        type="text"
        value={searchInput}
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <select value={status} onChange={(e) => handleStatusChange(e.target.value)}>
        <option value="">All</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
        <option value="DESC">Newest</option>
        <option value="ASC">Oldest</option>
      </select>

      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            {report.type} - {report.status} - {report.contact}
            <img
              src={`${BACKEND_URL}/static/${report.image}`}
              alt={report.type}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <button type="button" onClick={() => handleShowDetails(report)}>
              Details
            </button>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        lastPage={lastPage}
        onPageChange={setPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
      <Details isOpen={isOpen} onClose={handleClose} />
    </div>
  )
}

export default Reports
