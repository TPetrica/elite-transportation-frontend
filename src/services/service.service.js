import ApiService from './api.service'

class ServiceAPI {
  async getActiveServices() {
    try {
      const response = await ApiService.get('/services/public')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch services',
      }
    }
  }

  async getServiceByType(serviceType) {
    try {
      const response = await ApiService.get(`/services/type/${serviceType}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Error fetching service by type:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch service details',
      }
    }
  }

  async calculatePrice(bookingDetails) {
    try {
      const response = await ApiService.post('/services/calculate-price', bookingDetails)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Error calculating price:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to calculate price',
      }
    }
  }
}

export default new ServiceAPI()
