import ApiService from './api.service'
import moment from 'moment'
// import { formatSaltLakeDate, formatSaltLakeTime } from '@/utils/timezone'

class AvailabilityService {
  async getSchedule() {
    try {
      const response = await ApiService.get('/availability/schedule')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch schedule',
      }
    }
  }

  async updateSchedule(daySchedule) {
    try {
      const response = await ApiService.put('/availability/schedule', daySchedule)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update schedule',
      }
    }
  }

  async getAvailableTimeSlots(date) {
    try {
      // Ensure the date is in the correct format
      let formattedDate
      if (typeof date === 'string') {
        formattedDate = date
      } else if (moment.isMoment(date)) {
        formattedDate = date.format('YYYY-MM-DD')
      } else if (date) {
        const momentDate = moment(date)
        formattedDate = momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : null
      } else {
        formattedDate = null
      }

      if (!formattedDate) {
        return {
          success: false,
          error: 'Invalid date provided'
        }
      }

      const response = await ApiService.get(`/availability/time-slots?date=${formattedDate}`)
      return {
        success: true,
        data: response.data.availableSlots,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch available time slots',
      }
    }
  }

  async checkTimeSlotAvailability(date, time) {
    try {
      // Ensure the date is in the correct format
      let formattedDate
      if (typeof date === 'string') {
        formattedDate = date
      } else if (moment.isMoment(date)) {
        formattedDate = date.format('YYYY-MM-DD')
      } else if (date) {
        const momentDate = moment(date)
        formattedDate = momentDate.isValid() ? momentDate.format('YYYY-MM-DD') : null
      } else {
        formattedDate = null
      }

      if (!formattedDate) {
        return {
          success: false,
          error: 'Invalid date provided'
        }
      }

      const response = await ApiService.get(
        `/availability/check?date=${formattedDate}&time=${time}`
      )
      return {
        success: true,
        data: response.data.isAvailable,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to check time slot availability',
      }
    }
  }

  formatAvailableSlots(slots) {
    if (!Array.isArray(slots)) {
      console.error('Invalid slots data:', slots)
      return []
    }

    return slots.map(slot => ({
      time: slot,
      formattedTime: moment(slot, 'HH:mm').format('h:mm A'),
    }))
  }
}

export default new AvailabilityService()
