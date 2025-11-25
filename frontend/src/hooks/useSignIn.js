import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signIn } from '../services/auth'
import { selectError, selectLoading } from '../redux/slices/auth/signIn'
import { signInSchema } from '../schema/auth'

export const useSignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const result = await dispatch(signIn(values))
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/reports')
      }
    }
  })

  return {
    ...formik,
    loading,
    error
  }
}
