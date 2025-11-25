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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#1623a9ae',
        color: '#fff',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
          X
        </button>

        <h2>Report Details</h2>
        <p>
          <strong>Status:</strong> {report.status}
        </p>
        <p>
          <strong>Type:</strong> {report.type}
        </p>
        <p>
          <strong>Description:</strong> {report.description}
        </p>
        <p>
          <strong>Contact:</strong> {report.contact}
        </p>
        {report.image && (
          <img
            src={`${BACKEND_URL}/static/${report.image}`}
            alt={report.type}
            style={{ maxWidth: '100px', marginTop: '10px', borderRadius: '4px' }}
          />
        )}
        {isOwner && (
          <>
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleShowConfirmDeleteModal}>
              Delete
            </button>
          </>
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
