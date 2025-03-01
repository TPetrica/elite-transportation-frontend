import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_API_URL || 'https://elite-transportation-backend.onrender.com/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const response = await axios.post(
          `${BASE_URL}/auth/refresh-tokens`,
          { refreshToken },
          { skipAuthRefresh: true }
        )

        const { access, refresh } = response.data
        localStorage.setItem('accessToken', access.token)
        localStorage.setItem('refreshToken', refresh.token)

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${access.token}`
        originalRequest.headers.Authorization = `Bearer ${access.token}`

        return apiClient(originalRequest)
      } catch (err) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        // window.location.href = "/login";
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
