import { memo } from 'react'
import ConfirmDelete from './ConfirmDelete'
import { BACKEND_URL } from '../../../constants/app'
import useDetails from '../../../hooks/useDetails'

const Details = ({ isOpen, onClose }) => {
  const {
    report,
    isOwner,
    isConfirmOpen,
    handleUpdate,
    handleShowConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
    handleDelete
  } = useDetails(onClose)

  if (!isOpen || !report) return null

  return (
    <div
      className="fixed inset-0 bg-white flex items-center justify-center z-50 "
      onClick={onClose}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.59)), url(${BACKEND_URL}/static/${report.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white text-gray-800 rounded-lg shadow-lg md:w-1/2 p-6 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-500 transition text-lg font-bold"
        >
          <i className="fa-solid fa-xmark cursor-pointer text-gray-700 hover:text-black"></i>
        </button>
        {report.image && (
          <img
            src={`${BACKEND_URL}/static/${report.image}`}
            alt={report.type}
            className="w-full h-screen object-cover mt-4 rounded-md"
          />
        )}
        {isOwner && (
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleShowConfirmDeleteModal}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Delete
            </button>
          </div>
        )}
        <div className="p-4 bg-white rounded-lg w-full mx-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Report Details</h3>
          <div className="divide-y divide-gray-200">
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Status</div>
              <div className="w-2/3 text-sm font-semibold text-gray-900">{report.status}</div>
            </div>
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Type</div>
              <div className="w-2/3 text-sm font-semibold text-gray-900">{report.type}</div>
            </div>
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Description</div>
              <div className="w-2/3 text-sm text-gray-700">{report.description}</div>
            </div>
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Location</div>
              <div className="w-2/3 text-sm text-gray-700">{report.location}</div>
            </div>
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Contact</div>
              <div className="w-2/3 text-sm font-medium text-blue-600">{report.contact}</div>
            </div>
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Author</div>
              <div className="w-2/3 text-sm text-gray-700">{report.user?.name}</div>
            </div>
            <div className="flex py-2">
              <div className="w-1/3 text-sm font-medium text-gray-500">Email</div>
              <div className="w-2/3 text-sm text-gray-700">{report.user?.email}</div>
            </div>
          </div>
        </div>
        <ConfirmDelete
          isOpen={isConfirmOpen}
          onClose={handleCloseConfirmDeleteModal}
          onConfirm={handleDelete}
          message="Do you really want to delete this report?"
        />
      </div>
    </div>
  )
}

export default memo(Details)
