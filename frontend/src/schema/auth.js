import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Valid email is required').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Confirm password is required')
})

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Valid email is required').required('Email is required'),
  password: Yup.string().required('Password is required')
})
