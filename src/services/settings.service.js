import ApiService from './api.service'

class SettingsService {
  async getSettings() {
    try {
      const response = await ApiService.get('/settings')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch settings',
      }
    }
  }

  async updateGeneralSettings(data) {
    try {
      const response = await ApiService.put('/settings/general', data)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update general settings',
      }
    }
  }

  async updateEmailSettings(data) {
    try {
      const response = await ApiService.put('/settings/email', data)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update email settings',
      }
    }
  }

  async updateSmsSettings(data) {
    try {
      const response = await ApiService.put('/settings/sms', data)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update SMS settings',
      }
    }
  }

  async updatePricingSettings(data) {
    try {
      const response = await ApiService.put('/settings/pricing', data)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update pricing settings',
      }
    }
  }

  async uploadFile(file, type = 'image') {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await ApiService.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload file',
      }
    }
  }
}

export default new SettingsService()
