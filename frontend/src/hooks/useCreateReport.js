import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { create } from '../services/report'
import { reportCreateSchema } from '../schema/report'

const useCreateReport = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      status: 'lost',
      type: '',
      description: '',
      contact: '',
      image: null
    },
    validationSchema: reportCreateSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData()
        formData.append('status', values.status)
        formData.append('type', values.type)
        formData.append('description', values.description)
        formData.append('contact', values.contact)
        formData.append('image', values.image)

        await dispatch(create(formData))

        navigate('/reports')
      } catch (err) {
        if (err.response?.data?.errors) {
          const errors = {}
          err.response.data.errors.forEach((e) => {
            errors[e.param] = e.msg
          })
          setErrors(errors)
        }
      } finally {
        setSubmitting(false)
      }
    }
  })

  return formik
}

export default useCreateReport
