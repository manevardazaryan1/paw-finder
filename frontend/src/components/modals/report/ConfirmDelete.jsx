const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: '500px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Confirm</h3>
        <p>{message || 'Are you sure?'}</p>

        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}
        >
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
