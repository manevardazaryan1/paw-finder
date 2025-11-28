import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectSelected } from '../redux/slices/report'
import { selectUser } from '../redux/slices/auth/signIn'
import { destroy } from '../services/report'
import { clear } from '../redux/slices/report'

const useDetails = (onClose) => {
  const report = useSelector(selectSelected)
  const currentUser = useSelector(selectUser)
  const [isConfirmOpen, setConfirmOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isOwner = report?.userId === currentUser.id

  const handleUpdate = () => {
    navigate('/update-report')
  }

  const handleShowConfirmDeleteModal = () => {
    setConfirmOpen(true)
  }

  const handleCloseConfirmDeleteModal = () => {
    setConfirmOpen(false)
  }

  const handleDelete = async () => {
    await dispatch(destroy(report.id))
    dispatch(clear())
    onClose()
  }

  return {
    report: report || {},
    isOwner: isOwner,
    isConfirmOpen,
    handleUpdate,
    handleShowConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
    handleDelete
  }
}

export default useDetails
