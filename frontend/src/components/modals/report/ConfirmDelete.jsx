const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative break-words whitespace-normal"
      >
        <h3 className="text-lg font-semibold mb-2">Confirm</h3>
        <p className="text-gray-700">{message || 'Are you sure?'}</p>

        <div className="flex justify-end gap-3 mt-4 flex-wrap">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
