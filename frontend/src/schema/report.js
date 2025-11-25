import * as Yup from 'yup'

export const reportCreateSchema = Yup.object({
  status: Yup.string()
    .oneOf(['lost', 'found'], "Status must be either 'lost' or 'found'")
    .required('Status is required'),
  type: Yup.string().required('Pet type is required'),
  description: Yup.string()
    .min(15, 'Description must be at least 15 characters long')
    .required('Description is required'),
  contact: Yup.string().required('Contact information is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileType',
      'Unsupported file format',
      (value) => value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    )
})

export const reportUpdateSchema = Yup.object({
  status: Yup.string()
    .oneOf(['lost', 'found'], "Status must be either 'lost' or 'found'")
    .required('Status is required'),
  type: Yup.string().required('Pet type is required'),
  description: Yup.string()
    .min(15, 'Description must be at least 15 characters long')
    .required('Description is required'),
  contact: Yup.string().required('Contact information is required'),
  image: Yup.mixed()
    .notRequired()
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
    )
})
