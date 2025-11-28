import useReports from '../../../hooks/useReports'

const FilterPanel = () => {
  const {
    status,
    searchInput,
    sortOrder,
    handleSearchChange,
    handleStatusChange,
    handleSortOrderChange
  } = useReports()

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
      <input
        type="text"
        value={searchInput}
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
        className="w-full md:w-64 sm:w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className="w-full md:w-40 flex-col sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      >
        <option value="">All</option>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => handleSortOrderChange(e.target.value)}
        className="w-full md:w-40 flex-col sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      >
        <option value="DESC">Newest</option>
        <option value="ASC">Oldest</option>
      </select>
    </div>
  )
}

export default FilterPanel
