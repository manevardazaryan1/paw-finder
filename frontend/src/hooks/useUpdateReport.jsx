import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { update } from '../services/report'
import { reportUpdateSchema } from '../schema/report'
import { selectSelected } from '../redux/slices/report'

const useUpdateReport = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const report = useSelector(selectSelected)

  if (!report) return null

  const formik = useFormik({
    initialValues: {
      status: report.status,
      type: report.type,
      description: report.description,
      contact: report.contact,
      image: null
    },
    validationSchema: reportUpdateSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData()
        formData.append('status', values.status)
        formData.append('type', values.type)
        formData.append('description', values.description)
        formData.append('contact', values.contact)

        if (values.image) {
          formData.append('image', values.image)
        }

        await dispatch(update({ id: report.id, data: formData }))

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

export default useUpdateReport
