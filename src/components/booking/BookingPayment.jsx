import AuthModal from '@/components/auth/AuthModal'
import SideBar from '@/components/booking/SideBar'
import { useAuth } from '@/context/AuthContext'
import { useBooking } from '@/context/BookingContext'
import PaymentService from '@/services/payment.service'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BillingForm from './BillingForm'

export default function BookingPayment() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    pricing,
    pickupDetails,
    dropoffDetails,
    selectedService,
    passengerDetails,
    selectedExtras,
    distance,
    duration,
    isAffiliate,
    affiliateCode,
  } = useBooking()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!passengerDetails || !pickupDetails || !dropoffDetails || !selectedService) {
      navigate('/booking')
      return
    }
  }, [navigate, passengerDetails, pickupDetails, dropoffDetails, selectedService])

  const formatBookingData = () => {
    // Determine the service type based on the selected service
    const serviceType = selectedService.serviceType

    // Format the extras for API
    const formattedExtras = selectedExtras.map(extra => ({
      item: extra.item || extra.id,
      quantity: extra.quantity,
    }))

    // Create the booking data object in the format expected by the API
    return {
      pickup: {
        address: pickupDetails.address,
        coordinates: pickupDetails.coordinates,
        date: pickupDetails.date,
        time: pickupDetails.time,
        flightNumber: pickupDetails.flightNumber || '',
        flightTime: pickupDetails.flightTime || '',
        isCustom: pickupDetails.isCustom || false,
      },
      dropoff: {
        address: dropoffDetails.address,
        coordinates: dropoffDetails.coordinates,
        isCustom: dropoffDetails.isCustom || false,
      },
      distance: {
        km: parseInt(distance?.km || 0),
        miles: parseInt(distance?.miles || 0),
      },
      duration,
      service: serviceType, // Use the service type string, not the ID
      passengerDetails: {
        firstName: passengerDetails.firstName,
        lastName: passengerDetails.lastName,
        phone: passengerDetails.phone,
        passengers: passengerDetails.passengers.toString(),
        luggage: passengerDetails.luggage ? passengerDetails.luggage.toString() : '0',
        email: passengerDetails.email || '',
        notes: passengerDetails.notes || '',
        specialRequirements: passengerDetails.specialRequirements || '',
      },
      email: passengerDetails.email || '',
      affiliate: isAffiliate ? true : false,
      affiliateCode: affiliateCode || '',
    }
  }

  const handlePayment = async billingDetails => {
    try {
      setLoading(true)
      setError(null)

      if (!selectedService?.id) {
        throw new Error('Please select a service')
      }

      const bookingData = formatBookingData()

      const payload = {
        amount: pricing.totalPrice,
        billingDetails,
        bookingData,
      }

      const result = await PaymentService.createCheckoutSession(payload)

      if (!result.success) {
        throw new Error(result.error || 'Error processing payment')
      }

      if (result.data.url) {
        window.location.href = result.data.url
      }
    } catch (err) {
      setError(err.message || 'An error occurred during payment processing')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="box-row-tab mt-50 mb-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          {error && <div className="alert alert-danger mb-30">{error}</div>}
          <BillingForm onSubmit={handlePayment} loading={loading} />
        </div>
      </div>
      <SideBar />
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
