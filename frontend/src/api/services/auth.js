import { AUTH } from '../../constants/api'
import api from '../axios'

export const signUp = async (data) => {
  try {
    const res = await api.post(AUTH.SIGN_UP, data)
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}

export const signIn = async (data) => {
  try {
    const res = await api.post(AUTH.SIGN_IN, data)
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}
