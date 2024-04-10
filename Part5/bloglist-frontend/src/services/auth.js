import axios from 'axios'
const baseUrl = '/api/login'

const login = (username, password) => {
  const result = axios.post(baseUrl, { username, password })
  return result.then(response => response.data)
}

export default {
  login
}