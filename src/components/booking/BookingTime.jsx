import PlacePicker from '@/components/common/PlacePicker'
import { useBooking } from '@/context/BookingContext'
import calendarService from '@/services/calendar.service'
import { Alert } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import { useNavigate, useLocation } from 'react-router-dom'
import SideBar from './SideBar'

// Fixed locations for affiliate bookings
const AFFILIATE_LOCATIONS = {
  AIRPORT: {
    address: 'Salt Lake City International Airport, Salt Lake City, UT, USA',
    coordinates: { lat: 40.7899, lng: -111.9791 },
    isCustom: false,
    isCottonwood: false,
  },
  HOSTEL: {
    address: 'Park City Hostel, Park City, UT, USA',
    coordinates: { lat: 40.6609, lng: -111.4988 },
    isCustom: false,
    isCottonwood: false,
  },
}

const getServices = isAffiliate => {
  if (isAffiliate) {
    return [
      {
        id: 'per-person',
        title: 'Per Person Service',
        description: '$65 per person',
        maxPassengers: 4,
      },
    ]
  }

  const baseServices = [
    {
      id: 'from-airport',
      title: 'From Airport (1-4 Passengers)',
      description: 'Airport pickup with flight tracking - $120',
      maxPassengers: 4,
    },
    {
      id: 'to-airport',
      title: 'To Airport (1-4 Passengers)',
      description: 'Airport dropoff service - $120',
      maxPassengers: 4,
    },
    {
      id: 'canyons',
      title: 'Cottonwood Canyons Transfer (1-4 Passengers)',
      description: 'To/From Snowbird/Alta/Solitude/Brighton/Sundance - $150',
      maxPassengers: 4,
    },
    {
      id: 'hourly',
      title: 'Hourly Service',
      description: '$100 per hour',
      maxPassengers: 4,
    },
  ]

  const perPersonService = {
    id: 'per-person',
    title: 'Per Person Service',
    description: '$65 per person (minimum 2 persons - $130)',
    maxPassengers: 4,
  }

  const groupService = {
    id: 'group',
    title: 'Group Transportation (5+ passengers)',
    description: 'Group - please inquire for pricing and availability',
    requiresInquiry: true,
  }

  return [...baseServices, perPersonService, groupService]
}

export default function BookingTime() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    setPickupDetails,
    setDropoffDetails,
    pickupDetails,
    dropoffDetails,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
    setDistanceAndDuration,
    setSelectedService,
    selectedService,
    setAffiliateMode,
    isAffiliate,
    resetBooking,
  } = useBooking()

  const [error, setError] = useState('')
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassengerWarning, setShowPassengerWarning] = useState(false)

  // Check URL for affiliate code
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const affiliateCode = params.get('affiliate')

    // If URL doesn't have affiliate code but state is in affiliate mode, reset the booking state
    if (!affiliateCode && isAffiliate) {
      resetBooking()
      return
    }

    // If URL has affiliate code, set affiliate mode
    if (affiliateCode === 'PCH') {
      setAffiliateMode(affiliateCode)

      // For affiliate bookings, automatically select the per-person service
      const services = getServices(true)
      setSelectedService(services[0])
    }
  }, [location, setAffiliateMode, setSelectedService, isAffiliate, resetBooking])

  // Calculate distance between pickup and dropoff locations
  useEffect(() => {
    const calculateDistance = async () => {
      if (pickupDetails?.coordinates && dropoffDetails?.coordinates && window.google) {
        const service = new window.google.maps.DistanceMatrixService()

        try {
          const response = await service.getDistanceMatrix({
            origins: [pickupDetails.coordinates],
            destinations: [dropoffDetails.coordinates],
            travelMode: 'DRIVING',
            unitSystem: window.google.maps.UnitSystem.METRIC,
          })

          if (response.rows[0]?.elements[0]?.status === 'OK') {
            const distanceValue = response.rows[0].elements[0].distance
            const durationValue = response.rows[0].elements[0].duration

            setDistanceAndDuration({
              distance: {
                km: Math.round(distanceValue.value / 1000),
                miles: Math.round(distanceValue.value / 1609.34),
              },
              duration: durationValue.text,
            })
          }
        } catch (error) {
          console.error('Error calculating distance:', error)
          setError('Error calculating distance. Please try again.')
        }
      }
    }

    calculateDistance()
  }, [pickupDetails?.coordinates, dropoffDetails?.coordinates])

  // Fetch available time slots when date is selected
  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (!selectedDate) return

      setIsLoading(true)
      setError('')

      try {
        // Fixed: Ensure we're sending the date as a string in YYYY-MM-DD format
        const result = await calendarService.getAvailableTimeSlots(
          selectedDate.format('YYYY-MM-DD')
        )

        if (result.success) {
          const formattedSlots = calendarService.formatAvailableSlots(result.data)
          setAvailableTimeSlots(formattedSlots)
        } else {
          setError(result.error || 'Error fetching available times')
        }
      } catch (error) {
        console.error('Error fetching time slots:', error)
        setError('Failed to fetch available time slots')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableTimeSlots()
  }, [selectedDate])

  const handleServiceSelect = event => {
    const serviceId = event.target.value
    const service = getServices(isAffiliate).find(s => s.id === serviceId)

    if (service) {
      setSelectedService(service)
      setShowPassengerWarning(false)

      // Clear locations when switching between airport and non-airport services
      const previousServiceId = selectedService?.id || ''

      // If switching to from-airport, clear the pickup location
      if (service.id === 'from-airport' && previousServiceId !== 'from-airport') {
        setPickupDetails({
          ...pickupDetails,
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
      }

      // If switching to to-airport, clear the dropoff location
      if (service.id === 'to-airport' && previousServiceId !== 'to-airport') {
        setDropoffDetails({
          ...dropoffDetails,
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
      }

      if (service.maxPassengers) {
        setShowPassengerWarning(true)
      }
    }
  }

  const handleDateSelect = date => {
    if (!date) return

    // Fixed: Create a moment object without any timezone adjustments
    const momentDate = moment({
      year: date.year,
      month: date.month.number - 1,
      day: date.day,
    })

    setSelectedDate(momentDate)
    setSelectedTime(null)
    setPickupDetails({
      ...pickupDetails,
      date: momentDate.format('YYYY-MM-DD'),
    })
  }

  const handleTimeSelect = async time => {
    setError('')

    try {
      // Fixed: Pass the date as string format to avoid timezone issues
      const result = await calendarService.checkAvailability(
        selectedDate.format('YYYY-MM-DD'),
        time
      )

      if (result.success && result.data) {
        const hour = parseInt(time.split(':')[0], 10)
        const isNightService = hour >= 23 || hour < 7

        setSelectedTime(time)
        setPickupDetails({
          ...pickupDetails,
          time: time,
        })

        if (isNightService) {
          setError('Night service fee of $20 will be applied for services between 11 PM and 7 AM')
        }
      } else {
        setError('This time slot is no longer available')
        const slotsResult = await calendarService.getAvailableTimeSlots(
          selectedDate.format('YYYY-MM-DD')
        )
        if (slotsResult.success) {
          setAvailableTimeSlots(calendarService.formatAvailableSlots(slotsResult.data))
        }
      }
    } catch (error) {
      console.error('Error selecting time:', error)
      setError('Failed to verify time slot availability')
    }
  }

  const handleFromLocationChange = location => {
    const isCottonwoodService = location.isCottonwood || dropoffDetails?.isCottonwood

    // Special handling for affiliate bookings
    if (isAffiliate) {
      if (location.address === AFFILIATE_LOCATIONS.AIRPORT.address) {
        // If pickup is airport, set dropoff to hostel
        setDropoffDetails({
          ...dropoffDetails,
          ...AFFILIATE_LOCATIONS.HOSTEL,
        })
      } else if (location.address === AFFILIATE_LOCATIONS.HOSTEL.address) {
        // If pickup is hostel, set dropoff to airport
        setDropoffDetails({
          ...dropoffDetails,
          ...AFFILIATE_LOCATIONS.AIRPORT,
        })
      }
    }

    // If any location is in Cottonwood Canyons, automatically select Cottonwood service
    if (isCottonwoodService && (!selectedService || selectedService.id !== 'canyons')) {
      const canyonsService = getServices(isAffiliate).find(s => s.id === 'canyons')
      setSelectedService(canyonsService)
    }

    setPickupDetails({
      ...pickupDetails,
      address: location.address,
      coordinates: location.coordinates,
      isCustom: location.isCustom,
      isCottonwood: location.isCottonwood,
    })
  }

  const handleToLocationChange = location => {
    const isCottonwoodService = location.isCottonwood || pickupDetails?.isCottonwood

    // Special handling for affiliate bookings
    if (isAffiliate) {
      if (location.address === AFFILIATE_LOCATIONS.AIRPORT.address) {
        // If dropoff is airport, set pickup to hostel
        setPickupDetails({
          ...pickupDetails,
          ...AFFILIATE_LOCATIONS.HOSTEL,
        })
      } else if (location.address === AFFILIATE_LOCATIONS.HOSTEL.address) {
        // If dropoff is hostel, set pickup to airport
        setPickupDetails({
          ...pickupDetails,
          ...AFFILIATE_LOCATIONS.AIRPORT,
        })
      }
    }

    // If any location is in Cottonwood Canyons, automatically select Cottonwood service
    if (isCottonwoodService && (!selectedService || selectedService.id !== 'canyons')) {
      const canyonsService = getServices(isAffiliate).find(s => s.id === 'canyons')
      setSelectedService(canyonsService)
    }

    setDropoffDetails({
      ...dropoffDetails,
      address: location.address,
      coordinates: location.coordinates,
      isCustom: location.isCustom,
      isCottonwood: location.isCottonwood,
    })
  }

  const canProceed = () => {
    if (!selectedService) return false
    if (selectedService.requiresInquiry) return false

    const hasValidPickup =
      pickupDetails?.address && (pickupDetails?.coordinates || pickupDetails?.isCustom)
    const hasValidDropoff =
      dropoffDetails?.address && (dropoffDetails?.coordinates || dropoffDetails?.isCustom)

    return Boolean(hasValidPickup && hasValidDropoff && pickupDetails?.date && pickupDetails?.time)
  }

  const handleContinue = async () => {
    if (!canProceed()) {
      setError('Please fill in all required fields')
      return
    }

    try {
      // Fixed: Pass the date as string to avoid timezone issues
      const result = await calendarService.checkAvailability(pickupDetails.date, pickupDetails.time)

      if (!result.success || !result.data) {
        setError('Selected time slot is no longer available. Please choose another time.')
        return
      }

      navigate('/booking-extra')
    } catch (error) {
      console.error('Error proceeding to next step:', error)
      setError('Failed to verify time slot availability')
    }
  }

  const services = getServices(isAffiliate)

  // Determine if PlacePickers should be disabled
  const disableLocationPickers = !selectedService && !isAffiliate

  return (
    <div className="box-row-tab mt-50 mb-50 booking-page">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <div className="box-booking-form">
            <div className="booking-grid">
              <div className="form-field">
                <span className="field-label">Select Service Type</span>
                {isAffiliate ? (
                  <>
                    <select
                      className="form-control"
                      value={selectedService?.id || ''}
                      disabled={true}
                    >
                      <option value="per-person">Per Person Service</option>
                    </select>
                    <div className="service-description mt-2 text-sm text-gray-600">
                      {selectedService?.description}
                    </div>
                  </>
                ) : (
                  <select
                    className="form-control"
                    value={selectedService?.id || ''}
                    onChange={handleServiceSelect}
                    disabled={pickupDetails?.isCottonwood || dropoffDetails?.isCottonwood}
                  >
                    <option value="">Select a service</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                )}

                {!isAffiliate && selectedService?.description && (
                  <div className="service-description mt-2 text-sm text-gray-600">
                    {selectedService.description}
                  </div>
                )}

                {showPassengerWarning && selectedService?.maxPassengers && !isAffiliate && (
                  <Alert
                    className="mt-4"
                    message={`This service is limited to ${selectedService.maxPassengers} passengers. For larger groups, please contact us for a custom quote.`}
                    type="info"
                    showIcon
                  />
                )}

                {selectedService?.requiresInquiry && !isAffiliate && (
                  <div className="inquiry-section mt-4">
                    <Alert
                      message="Please contact us for a custom quote for group transportation."
                      type="info"
                      showIcon
                    />
                    <button
                      onClick={() => navigate('/contact?inquiry=group')}
                      className="btn btn-brand-2 contact-btn mt-4"
                    >
                      Contact for Quote
                    </button>
                  </div>
                )}
              </div>

              <div className="location-section">
                <div className="form-field">
                  <span className="field-label">Pickup Location</span>
                  <div className="input-with-icon">
                    <i className="icon-from"></i>
                    <PlacePicker
                      value={pickupDetails?.address}
                      onChange={handleFromLocationChange}
                      type="pickup"
                      placeholder={
                        disableLocationPickers ? 'Select a service first' : 'Enter pickup location'
                      }
                      selectedService={selectedService}
                      isAffiliate={isAffiliate}
                      disabled={disableLocationPickers}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <span className="field-label">Drop-off Location</span>
                  <div className="input-with-icon">
                    <i className="icon-to"></i>
                    <PlacePicker
                      value={dropoffDetails?.address}
                      onChange={handleToLocationChange}
                      type="dropoff"
                      placeholder={
                        disableLocationPickers
                          ? 'Select a service first'
                          : 'Enter drop-off location'
                      }
                      selectedService={selectedService}
                      isAffiliate={isAffiliate}
                      disabled={disableLocationPickers}
                    />
                  </div>
                </div>
              </div>

              {!selectedService?.requiresInquiry && (
                <div className="datetime-section">
                  <div className="calendar-section">
                    <span className="field-label">Select Date</span>
                    <DatePicker
                      onChange={handleDateSelect}
                      format="MMMM DD YYYY"
                      minDate={new Date()}
                      maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
                      className="custom-datepicker"
                      placeholder="Select the date"
                      editable={false}
                      calendarPosition="bottom-center"
                    />
                  </div>

                  <div className="time-slots">
                    <h5>Available Times</h5>
                    {isLoading ? (
                      <div className="loading">Loading available times...</div>
                    ) : availableTimeSlots.length > 0 ? (
                      <div className="slots-grid">
                        {availableTimeSlots.map(slot => (
                          <button
                            key={slot.time}
                            className={`time-slot ${selectedTime === slot.time ? 'selected' : ''}`}
                            onClick={() => handleTimeSelect(slot.time)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="no-slots">No available time slots for this date</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {error && <Alert className="mt-4" message={error} type="error" showIcon />}

            {!selectedService?.requiresInquiry && (
              <button
                className="btn btn-brand-1 continue-btn mt-6"
                onClick={handleContinue}
                disabled={!canProceed()}
              >
                Continue to Vehicle Selection
              </button>
            )}
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  )
}
