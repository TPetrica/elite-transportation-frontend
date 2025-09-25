import ApiService from '@/services/api.service'
import moment from 'moment'

class BookingService {
  async createBooking(bookingData) {
    try {
      const formattedData = {
        ...bookingData,
        payment: {
          method: 'card',
          amount: bookingData.pricing?.totalPrice || 0,
          currency: 'USD',
          status: 'pending',
        },
        status: 'pending',
      }

      const response = await ApiService.post('/bookings', formattedData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create booking',
      }
    }
  }

  async getBookings(params = {}) {
    try {
      const response = await ApiService.get('/bookings', { params })
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch bookings',
      }
    }
  }

  async getBookingById(id) {
    try {
      const response = await ApiService.get(`/bookings/${id}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch booking',
      }
    }
  }

  async getBookingByNumber(bookingNumber) {
    try {
      const response = await ApiService.get(`/bookings/number/${bookingNumber}`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch booking',
      }
    }
  }

  async updateBooking(id, updateData) {
    try {
      const response = await ApiService.patch(`/bookings/${id}`, updateData)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update booking',
      }
    }
  }

  async cancelBooking(id) {
    try {
      const response = await ApiService.post(`/bookings/${id}/cancel`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to cancel booking',
      }
    }
  }

  async sendReminder(id) {
    try {
      const response = await ApiService.post(`/bookings/${id}/send-reminder`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send reminder',
      }
    }
  }

  async resendEmails(id) {
    try {
      const response = await ApiService.post(`/bookings/${id}/resend-emails`)
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to resend emails',
      }
    }
  }

  async getBookingStats() {
    try {
      const response = await ApiService.get('/bookings/stats')
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch booking statistics',
      }
    }
  }

  formatBookingData(bookingState) {
    const {
      pickupDetails,
      dropoffDetails,
      selectedService,
      selectedExtras,
      passengerDetails,
      distance,
      duration,
      pricing,
      user,
    } = bookingState

    return {
      user: user || null,
      email: passengerDetails.email,
      status: 'pending',
      pickup: {
        address: pickupDetails.address,
        date: pickupDetails.date,
        time: pickupDetails.time,
        flightNumber: passengerDetails.flightNumber || null,
        flightTime: passengerDetails.flightTime || null,
        coordinates: pickupDetails.coordinates || null,
        isCustom: pickupDetails.isCustom || false,
        isCottonwood: pickupDetails.isCottonwood || false,
      },
      dropoff: {
        address: dropoffDetails.address,
        coordinates: dropoffDetails.coordinates || null,
        isCustom: dropoffDetails.isCustom || false,
        isCottonwood: dropoffDetails.isCottonwood || false,
      },
      distance: {
        km: distance?.km || 0,
        miles: distance?.miles || 0,
      },
      duration: duration || '',
      service: selectedService?.id || '',
      passengerDetails: {
        firstName: passengerDetails.firstName,
        lastName: passengerDetails.lastName,
        phone: passengerDetails.phone,
        passengers: passengerDetails.passengers,
        luggage: passengerDetails.luggage,
        skiBags: passengerDetails.skiBags || 0,
        notes: passengerDetails.notes || null,
        specialRequirements: passengerDetails.specialRequirements || null,
      },
      extras: selectedExtras || [],
      payment: {
        method: 'card',
        status: 'pending',
        amount: pricing?.totalPrice || 0,
        currency: 'USD',
      },
      billingDetails: {
        firstName: passengerDetails.firstName,
        lastName: passengerDetails.lastName,
        company: passengerDetails.company || null,
        address: passengerDetails.address || '',
        country: 'US',
        city: '',
        zipCode: '',
      },
      affiliate: bookingState.isAffiliate || false,
      affiliateCode: bookingState.affiliateCode || '',
    }
  }
}

export default new BookingService()
