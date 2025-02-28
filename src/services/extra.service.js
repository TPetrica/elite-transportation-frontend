import ApiService from './api.service'

class ExtraService {
  async getExtras(params = {}) {
    try {
      const response = await ApiService.get('/extras', { params })
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch extras',
      }
    }
  }

  async getExtraById(id) {
    try {
      const response = await ApiService.get(`/extras/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch extra',
      }
    }
  }

  async createExtra(extraData) {
    try {
      const response = await ApiService.post('/extras', extraData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create extra',
      }
    }
  }

  async updateExtra(id, extraData) {
    try {
      const response = await ApiService.put(`/extras/${id}`, extraData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update extra',
      }
    }
  }

  async deleteExtra(id) {
    try {
      const response = await ApiService.delete(`/extras/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete extra',
      }
    }
  }

  async getExtrasByCategory(category) {
    try {
      const response = await ApiService.get(`/extras?category=${category}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch extras by category',
      }
    }
  }

  async calculateExtrasPrice(extras) {
    try {
      const response = await ApiService.post('/extras/calculate-price', { extras })
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to calculate extras price',
      }
    }
  }
}

export default new ExtraService()
