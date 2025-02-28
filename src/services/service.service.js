import ApiService from './api.service'

class ServiceService {
  async getServices() {
    try {
      const response = await ApiService.get('/services')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch services',
      }
    }
  }

  async getServiceById(id) {
    try {
      const response = await ApiService.get(`/services/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch service',
      }
    }
  }

  async createService(serviceData) {
    try {
      const response = await ApiService.post('/services', serviceData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create service',
      }
    }
  }

  async updateService(id, serviceData) {
    try {
      const response = await ApiService.put(`/services/${id}`, serviceData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update service',
      }
    }
  }

  async deleteService(id) {
    try {
      const response = await ApiService.delete(`/services/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete service',
      }
    }
  }
}

export default new ServiceService()
