import axios from 'axios'

const API_URL = 'http://your-backend-api.com/api/auth'

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || '登录失败，请稍后再试'
  }
}

const logout = async () => {
  // 实现登出逻辑
}

export default {
  login,
  logout
}