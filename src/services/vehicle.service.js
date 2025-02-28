import ApiService from './api.service'

class VehicleService {
  async getVehicles() {
    try {
      const response = await ApiService.get('/vehicles')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch vehicles',
      }
    }
  }

  async getVehicleById(id) {
    try {
      const response = await ApiService.get(`/vehicles/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch vehicle',
      }
    }
  }

  async createVehicle(vehicleData) {
    try {
      const response = await ApiService.post('/vehicles', vehicleData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create vehicle',
      }
    }
  }

  async updateVehicle(id, vehicleData) {
    try {
      const response = await ApiService.put(`/vehicles/${id}`, vehicleData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update vehicle',
      }
    }
  }

  async deleteVehicle(id) {
    try {
      const response = await ApiService.delete(`/vehicles/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete vehicle',
      }
    }
  }

  async getAvailableVehicles() {
    try {
      const response = await ApiService.get('/vehicles/available')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch available vehicles',
      }
    }
  }
}

export default new VehicleService()
