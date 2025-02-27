import ApiService from '@/services/api.service'
import moment from 'moment'

class CalendarService {
  async getAvailableTimeSlots(date) {
    try {
      // Accept string format directly and ensure no timezone manipulation
      const formattedDate =
        typeof date === 'string'
          ? date
          : moment.isMoment(date)
            ? date.format('YYYY-MM-DD')
            : moment(date).format('YYYY-MM-DD')

      const response = await ApiService.get(`/availability/time-slots?date=${formattedDate}`)

      return {
        success: true,
        data: response.data.availableSlots,
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch available time slots',
      }
    }
  }

  async checkAvailability(date, time) {
    try {
      // Accept string format directly and ensure no timezone manipulation
      const formattedDate =
        typeof date === 'string'
          ? date
          : moment.isMoment(date)
            ? date.format('YYYY-MM-DD')
            : moment(date).format('YYYY-MM-DD')

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

export default new CalendarService()
