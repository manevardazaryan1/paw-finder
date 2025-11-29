import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { create } from '../services/report'
import { reportCreateSchema } from '../schema/report'
import { selectSelected } from '../redux/slices/report'
import { clear } from '../redux/slices/report'

const useCreateReport = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selected = useSelector(selectSelected)

  useEffect(() => {
    if (selected) {
      dispatch(clear())
    }
  }, [])

  const initialValues = useMemo(
    () => ({
      status: 'lost',
      type: '',
      location: '',
      description: '',
      contact: '',
      image: null
    }),
    []
  )

  const formik = useFormik({
    initialValues,
    validationSchema: reportCreateSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData()
        formData.append('status', values.status)
        formData.append('type', values.type)
        formData.append('location', values.location)
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

  return { formik }
}

export default useCreateReport
