import { REPORTS } from '../../constants/api'
import api from '../axios'

export const getAll = async (params = {}) => {
  try {
    const res = await api.get(REPORTS.GET_ALL, { params })
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}

export const getById = async (id) => {
  try {
    const res = await api.get(REPORTS.GET_BY_ID(id))
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}

export const create = async (data) => {
  try {
    const res = await api.post(REPORTS.CREATE, data)
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}

export const update = async (id, data) => {
  try {
    const res = await api.put(REPORTS.UPDATE(id), data)
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}

export const destroy = async (id) => {
  try {
    const res = await api.delete(REPORTS.DELETE(id))
    return res.data
  } catch (err) {
    throw err.response?.data || { message: err.message }
  }
}
