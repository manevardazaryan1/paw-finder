import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { update } from '../services/report'
import { reportUpdateSchema } from '../schema/report'
import { selectSelected, updateSelected } from '../redux/slices/report'

const useUpdateReport = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const report = useSelector(selectSelected)

  useEffect(() => {
    if (!report) {
      navigate('/reports')
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      status: report?.status,
      type: report?.type,
      location: report?.location,
      description: report?.description,
      contact: report?.contact,
      image: null
    },
    validationSchema: reportUpdateSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData()
        formData.append('status', values.status)
        formData.append('type', values.type)
        formData.append('location', values.location)
        formData.append('description', values.description)
        formData.append('contact', values.contact)

        if (values.image) {
          formData.append('image', values.image)
        }

        const result = await dispatch(update({ id: report.id, data: formData })).unwrap()

        dispatch(updateSelected(result))

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

  return {
    formik: report && formik
  }
}

export default useUpdateReport
