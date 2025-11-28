import ConfirmDelete from './confirmDelete'
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
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white text-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-500 transition text-lg font-bold"
        >
          <i className="fa-solid fa-xmark cursor-pointer text-gray-700 hover:text-black"></i>
        </button>

        <h2 className="text-xl font-semibold mb-4 break-words whitespace-normal">Report Details</h2>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Status:</span> {report.status}
        </p>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Type:</span> {report.type}
        </p>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Description:</span> {report.description}
        </p>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Location:</span> {report.location}
        </p>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Contact:</span> {report.contact}
        </p>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Author:</span> {report.user.name}
        </p>
        <p className="break-words whitespace-normal">
          <span className="font-semibold">Email:</span> {report.user.email}
        </p>
        {report.image && (
          <img
            src={`${BACKEND_URL}/static/${report.image}`}
            alt={report.type}
            className="w-full h-48 object-cover mt-4 rounded-md"
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

export default Details
