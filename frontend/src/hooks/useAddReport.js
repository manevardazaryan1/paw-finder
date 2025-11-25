import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addReport } from '../redux/slices/report'
import { socket } from '../socket'

export const useAddReport = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('report', (report) => {
      dispatch(addReport(report))
    })

    return () => {
      socket.off('report')
    }
  }, [dispatch])
}
