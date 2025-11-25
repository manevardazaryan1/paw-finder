import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signUp } from '../services/auth'
import { selectError, selectLoading } from '../redux/slices/auth/singUp'
import { signUpSchema } from '../schema/auth'

export const useSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const result = await dispatch(signUp(values))
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/sign-in')
      }
    }
  })

  return {
    ...formik,
    loading,
    error
  }
}
