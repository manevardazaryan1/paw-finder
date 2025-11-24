export const API_BASE_URL = 'http://localhost:300/api'

export const AUTH = {
  SIGN_IN: `${API_BASE_URL}/auth/sign-in`,
  SIGN_UP: `${API_BASE_URL}/auth/sign-up`
}

export const REPORTS = {
  GET_ALL: `${API_BASE_URL}/reports`,
  GET_BY_ID: (id) => `${API_BASE_URL}/reports/${id}`,
  CREATE: `${API_BASE_URL}/reports`,
  UPDATE: (id) => `${API_BASE_URL}/reports/${id}`,
  DELETE: (id) => `${API_BASE_URL}/reports/${id}`
}
