import { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import moment from 'moment'
import { Alert } from 'antd'
import DatePicker from 'react-multi-date-picker'

import PlacePicker from '@/components/common/PlacePicker'
import { useBooking } from '@/context/BookingContext'
import calendarService from '@/services/calendar.service'
import serviceAPI from '@/services/service.service'
import SideBar from './SideBar'

// Constants for affiliate locations
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

function BookingTime() {
  const navigate = useNavigate()
  const location = useLocation()

  // Use selective context extraction to avoid unnecessary re-renders
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
  const [services, setServices] = useState([])
  const [loadingServices, setLoadingServices] = useState(true)

  // Use ref to prevent infinite loops with affiliate mode
  const hasSetAffiliateService = useRef(false)
  const previousPickupCoordinates = useRef(null)
  const previousDropoffCoordinates = useRef(null)

  // Load services from the backend - with proper error handling and cleanup
  useEffect(() => {
    let isMounted = true
    const fetchServices = async () => {
      if (!isMounted) return

      setLoadingServices(true)
      try {
        const response = await serviceAPI.getActiveServices()

        if (!isMounted) return

        if (response.success) {
          setServices(response.data)
        } else {
          setError('Failed to load services. Please try again later.')
        }
      } catch (err) {
        if (!isMounted) return
        console.error('Error loading services:', err)
        setError('Failed to load services. Please try again later.')
      } finally {
        if (isMounted) {
          setLoadingServices(false)
        }
      }
    }

    fetchServices()

    return () => {
      isMounted = false
    }
  }, [])

  // Check URL for affiliate code - memoized deps
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const affiliateCode = params.get('affiliate')

    // If URL doesn't have affiliate code but state is in affiliate mode, reset the booking state
    if (!affiliateCode && isAffiliate) {
      resetBooking()
      hasSetAffiliateService.current = false
      return
    }

    // If URL has affiliate code, set affiliate mode
    if (affiliateCode === 'PCH' && !isAffiliate) {
      setAffiliateMode(affiliateCode)
    }
  }, [location.search, setAffiliateMode, isAffiliate, resetBooking])

  // Set affiliate service after services are loaded and affiliate mode is set
  // Use refs to track previous state to prevent unnecessary effect runs
  useEffect(() => {
    if (isAffiliate && services.length > 0 && !hasSetAffiliateService.current) {
      const perPersonService = services.find(s => s.title.toLowerCase().includes('per person'))
      if (perPersonService) {
        setSelectedService(perPersonService)
        hasSetAffiliateService.current = true
      }
    }
  }, [isAffiliate, services, setSelectedService])

  // Calculate distance between pickup and dropoff locations
  // Use ref comparison to prevent unnecessary API calls
  useEffect(() => {
    if (!pickupDetails?.coordinates || !dropoffDetails?.coordinates || !window.google) return

    // Skip if coordinates haven't changed
    const pickupCoordinatesString = JSON.stringify(pickupDetails.coordinates)
    const dropoffCoordinatesString = JSON.stringify(dropoffDetails.coordinates)

    if (
      pickupCoordinatesString === previousPickupCoordinates.current &&
      dropoffCoordinatesString === previousDropoffCoordinates.current
    ) {
      return
    }

    previousPickupCoordinates.current = pickupCoordinatesString
    previousDropoffCoordinates.current = dropoffCoordinatesString

    const calculateDistance = async () => {
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

    calculateDistance()
  }, [pickupDetails?.coordinates, dropoffDetails?.coordinates, setDistanceAndDuration])

  // Fetch available time slots when date is selected - with debounce
  const previousDateRef = useRef(null)

  useEffect(() => {
    if (!selectedDate) return

    // Skip if date hasn't changed
    const dateString = selectedDate.format('YYYY-MM-DD')
    if (dateString === previousDateRef.current) return
    previousDateRef.current = dateString

    let isMounted = true
    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      setError('')

      try {
        // Ensure we're sending the date as a string in YYYY-MM-DD format
        const result = await calendarService.getAvailableTimeSlots(dateString)

        if (!isMounted) return

        if (result.success) {
          const formattedSlots = calendarService.formatAvailableSlots(result.data)
          setAvailableTimeSlots(formattedSlots)
        } else {
          setError(result.error || 'Error fetching available times')
        }
      } catch (error) {
        if (!isMounted) return
        console.error('Error fetching time slots:', error)
        setError('Failed to fetch available time slots')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }, 300) // 300ms debounce

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [selectedDate])

  // Memoized helper functions to avoid recreation on each render
  const isAirportService = useCallback(service => {
    if (!service || !service.title) return false
    return service.title.toLowerCase().includes('airport')
  }, [])

  const isFromAirportService = useCallback(service => {
    if (!service || !service.title) return false
    return service.title.toLowerCase().includes('from airport')
  }, [])

  const isToAirportService = useCallback(service => {
    if (!service || !service.title) return false
    return service.title.toLowerCase().includes('to airport')
  }, [])

  const handleServiceTypeChange = useCallback(
    (newService, previousService) => {
      if (!newService) return

      const isFromAirport = isFromAirportService(newService)
      const wasFromAirport = isFromAirportService(previousService)

      const isToAirport = isToAirportService(newService)
      const wasToAirport = isToAirportService(previousService)

      // If switching to from-airport, clear the pickup location
      if (isFromAirport && !wasFromAirport) {
        setPickupDetails({
          ...pickupDetails,
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
      }

      // If switching to to-airport, clear the dropoff location
      if (isToAirport && !wasToAirport) {
        setDropoffDetails({
          ...dropoffDetails,
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
      }
    },
    [
      isFromAirportService,
      isToAirportService,
      pickupDetails,
      dropoffDetails,
      setPickupDetails,
      setDropoffDetails,
    ]
  )

  const handleServiceSelect = useCallback(
    event => {
      const serviceId = event.target.value

      const service = services.find(s => s.id === serviceId)

      if (service) {
        setSelectedService(service)
        setShowPassengerWarning(false)

        // Clear locations when switching between airport and non-airport services
        handleServiceTypeChange(service, selectedService)

        if (service.maxPassengers) {
          setShowPassengerWarning(true)
        }
      }
    },
    [services, setSelectedService, handleServiceTypeChange, selectedService]
  )

  const handleDateSelect = useCallback(
    date => {
      if (!date) return

      // Create a moment object without any timezone adjustments
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
    },
    [setSelectedDate, setSelectedTime, pickupDetails, setPickupDetails]
  )

  const handleTimeSelect = useCallback(
    async time => {
      setError('')

      try {
        // Pass the date as string format to avoid timezone issues
        const result = await calendarService.checkAvailability(
          selectedDate.format('YYYY-MM-DD'),
          time
        )

        if (result.success && result.data) {
          setSelectedTime(time)
          setPickupDetails({
            ...pickupDetails,
            time: time,
          })

          // Check if it's a night service (11 PM - 7 AM)
          const hour = parseInt(time.split(':')[0], 10)
          if (hour >= 23 || hour < 7) {
            setError('Night service fee will be applied for services between 11 PM and 7 AM')
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
    },
    [selectedDate, setSelectedTime, pickupDetails, setPickupDetails]
  )

  const handleAffiliateLocationChange = useCallback(
    (locationType, location) => {
      if (location.address === AFFILIATE_LOCATIONS.AIRPORT.address) {
        // If selected location is airport, set the other end to hostel
        if (locationType === 'pickup') {
          setDropoffDetails({
            ...dropoffDetails,
            ...AFFILIATE_LOCATIONS.HOSTEL,
          })
        } else {
          setPickupDetails({
            ...pickupDetails,
            ...AFFILIATE_LOCATIONS.AIRPORT,
          })
        }
      } else if (location.address === AFFILIATE_LOCATIONS.HOSTEL.address) {
        // If selected location is hostel, set the other end to airport
        if (locationType === 'pickup') {
          setDropoffDetails({
            ...dropoffDetails,
            ...AFFILIATE_LOCATIONS.AIRPORT,
          })
        } else {
          setPickupDetails({
            ...pickupDetails,
            ...AFFILIATE_LOCATIONS.HOSTEL,
          })
        }
      }
    },
    [pickupDetails, dropoffDetails, setPickupDetails, setDropoffDetails]
  )

  const handleFromLocationChange = useCallback(
    location => {
      const isCottonwoodService = location.isCottonwood || dropoffDetails?.isCottonwood

      // Special handling for affiliate bookings
      if (isAffiliate) {
        handleAffiliateLocationChange('pickup', location)
      }

      // If any location is in Cottonwood Canyons, automatically select Cottonwood service
      if (isCottonwoodService) {
        const canyonsService = services.find(s => s.title.toLowerCase().includes('cottonwood'))
        if (
          canyonsService &&
          (!selectedService || !selectedService.title?.toLowerCase().includes('cottonwood'))
        ) {
          setSelectedService(canyonsService)
        }
      }

      setPickupDetails({
        ...pickupDetails,
        address: location.address,
        coordinates: location.coordinates,
        isCustom: location.isCustom,
        isCottonwood: location.isCottonwood,
      })
    },
    [
      dropoffDetails,
      isAffiliate,
      handleAffiliateLocationChange,
      services,
      selectedService,
      setSelectedService,
      pickupDetails,
      setPickupDetails,
    ]
  )

  const handleToLocationChange = useCallback(
    location => {
      const isCottonwoodService = location.isCottonwood || pickupDetails?.isCottonwood

      // Special handling for affiliate bookings
      if (isAffiliate) {
        handleAffiliateLocationChange('dropoff', location)
      }

      // If any location is in Cottonwood Canyons, automatically select Cottonwood service
      if (isCottonwoodService) {
        const canyonsService = services.find(s => s.title.toLowerCase().includes('cottonwood'))
        if (
          canyonsService &&
          (!selectedService || !selectedService.title?.toLowerCase().includes('cottonwood'))
        ) {
          setSelectedService(canyonsService)
        }
      }

      setDropoffDetails({
        ...dropoffDetails,
        address: location.address,
        coordinates: location.coordinates,
        isCustom: location.isCustom,
        isCottonwood: location.isCottonwood,
      })
    },
    [
      pickupDetails,
      isAffiliate,
      handleAffiliateLocationChange,
      services,
      selectedService,
      setSelectedService,
      dropoffDetails,
      setDropoffDetails,
    ]
  )

  const canProceed = useCallback(() => {
    if (!selectedService) return false
    if (selectedService.requiresInquiry) return false

    const hasValidPickup =
      pickupDetails?.address && (pickupDetails?.coordinates || pickupDetails?.isCustom)
    const hasValidDropoff =
      dropoffDetails?.address && (dropoffDetails?.coordinates || dropoffDetails?.isCustom)

    return Boolean(hasValidPickup && hasValidDropoff && pickupDetails?.date && pickupDetails?.time)
  }, [selectedService, pickupDetails, dropoffDetails])

  const handleContinue = useCallback(async () => {
    if (!canProceed()) {
      setError('Please fill in all required fields')
      return
    }

    try {
      // Pass the date as string to avoid timezone issues
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
  }, [canProceed, navigate, pickupDetails])

  // Memoized derived values
  const filteredServices = useMemo(
    () =>
      isAffiliate ? services.filter(s => s.title.toLowerCase().includes('per person')) : services,
    [isAffiliate, services]
  )

  const disableLocationPickers = !selectedService && !isAffiliate

  const pickupAirportOnly = useMemo(
    () => selectedService && isFromAirportService(selectedService),
    [selectedService, isFromAirportService]
  )

  const dropoffAirportOnly = useMemo(
    () => selectedService && isToAirportService(selectedService),
    [selectedService, isToAirportService]
  )

  if (loadingServices) {
    return <div className="loading">Loading services...</div>
  }

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
                      {'$65 per person'}
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
                    {filteredServices.map(service => (
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
                        disableLocationPickers
                          ? 'Select a service first'
                          : pickupAirportOnly
                            ? 'Select airport'
                            : 'Enter pickup location'
                      }
                      selectedService={selectedService}
                      isAffiliate={isAffiliate}
                      airportOnly={pickupAirportOnly}
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
                          : dropoffAirportOnly
                            ? 'Select airport'
                            : 'Enter drop-off location'
                      }
                      selectedService={selectedService}
                      isAffiliate={isAffiliate}
                      airportOnly={dropoffAirportOnly}
                      disabled={disableLocationPickers}
                    />
                  </div>
                </div>
              </div>

              {selectedService && !selectedService.requiresInquiry && (
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
                            key={slot.formattedTime}
                            className={`time-slot ${selectedTime === slot.time ? 'selected' : ''}`}
                            onClick={() => handleTimeSelect(slot.time)}
                          >
                            {slot.formattedTime}
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

            {selectedService && !selectedService.requiresInquiry && (
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

// Wrap the component with memo to prevent unnecessary re-renders
export default memo(BookingTime)
