import apiClient from '../config/axios'

// API Service methods
const ApiService = {
  setAuthHeader() {
    const token = localStorage.getItem('accessToken')
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  },

  removeAuthHeader() {
    delete apiClient.defaults.headers.common['Authorization']
  },

  /**
   * Make a GET request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios request config
   * @returns {Promise} - Axios promise
   */
  get: (url, config = {}) => {
    return apiClient.get(url, config)
  },

  /**
   * Make a POST request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Axios request config
   * @returns {Promise} - Axios promise
   */
  post: (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config)
  },

  /**
   * Make a PUT request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Axios request config
   * @returns {Promise} - Axios promise
   */
  put: (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config)
  },

  /**
   * Make a PATCH request
   * @param {string} url - Endpoint URL
   * @param {object} data - Request payload
   * @param {object} config - Axios request config
   * @returns {Promise} - Axios promise
   */
  patch: (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config)
  },

  /**
   * Make a DELETE request
   * @param {string} url - Endpoint URL
   * @param {object} config - Axios request config
   * @returns {Promise} - Axios promise
   */
  delete: (url, config = {}) => {
    return apiClient.delete(url, config)
  },
}

export default ApiService
