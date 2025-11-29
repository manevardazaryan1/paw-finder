import useReports from '../../hooks/useReports'
import { BACKEND_URL } from '../../constants/app'
import List from '../../components/list/List'
import ListItem from '../../components/list/ListItem'
import Details from '../../components/modals/report/Details'
import Pagination from '../../components/pagination/Pagination'
import FilterPanel from '../../components/filter/report/FilterPanel'

const Reports = () => {
  const {
    reports,
    page,
    hasNextPage,
    hasPrevPage,
    lastPage,
    isOpen,
    handleClose,
    handleShowDetails,
    setPage
  } = useReports()

  return (
    <div className="bg-black min-h-screen">
      <div className="px-4 py-6">
        <FilterPanel />
        {reports.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-6">No reports found</p>
        )}
        <List>
          {reports.map((datum) => {
            return (
              <ListItem key={datum.id}>
                <div className="relative w-full h-48">
                  <img
                    src={`${BACKEND_URL}/static/${datum.image}`}
                    alt={datum.type}
                    className="w-full h-full object-cover object-[30%_45%] rounded-t-lg"
                  />
                  <span
                    className={`absolute top-2 left-2 text-white px-3 py-1 rounded ${
                      datum.status.toLowerCase() === 'lost'
                        ? 'bg-red-800'
                        : datum.status.toLowerCase() === 'found'
                          ? 'bg-green-800'
                          : 'bg-gray-400'
                    } font-semibold`}
                  >
                    {datum.status}
                  </span>
                </div>
                <div className="p-4 flex flex-col items-start w-full">
                  <h2 className="font-semibold text-lg mb-1 w-full truncate">{datum.type}</h2>
                  <p className="text-gray-500 text-sm mb-1 w-full truncate">
                    Contact: {datum.contact}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleShowDetails(datum)}
                    className="text-gray-400 text-sm hover:text-gray-600 transition-colors ml-auto"
                  >
                    Details
                  </button>
                </div>
              </ListItem>
            )
          })}
        </List>
        <Pagination
          currentPage={page}
          lastPage={lastPage}
          onPageChange={setPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
        <Details isOpen={isOpen} onClose={handleClose} />
      </div>
    </div>
  )
}

export default Reports
