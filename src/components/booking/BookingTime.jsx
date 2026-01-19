import { Alert, Checkbox } from 'antd'
import moment from 'moment'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import DatePicker from 'react-multi-date-picker'
import { useLocation, useNavigate } from 'react-router-dom'

import PlacePicker from '@/components/common/PlacePicker'
import { useBooking } from '@/context/BookingContext'
import { useTimeSlots } from '@/hooks/useQueryHooks'
import calendarService from '@/services/calendar.service'
import CustomTimePicker from './CustomTimePicker'
// import { createSaltLakeDate, formatSaltLakeDate } from '@/utils/timezone'
import SideBar from './SideBar'

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
    affiliate,
    affiliateCode,
    resetBooking,
    services, // Get services from context
    isRoundTrip,
    returnDetails,
    setRoundTrip,
    setReturnDetails,
    setServiceHours,
    pricing,
  } = useBooking()

  const [error, setError] = useState('')
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPassengerWarning, setShowPassengerWarning] = useState(false)
  const [loadingServices, setLoadingServices] = useState(true)
  const [returnAvailableTimeSlots, setReturnAvailableTimeSlots] = useState([])
  const [isReturnLoading, setIsReturnLoading] = useState(false)

  // Use ref to prevent infinite loops with affiliate mode
  const hasSetAffiliateService = useRef(false)
  const previousPickupCoordinates = useRef(null)
  const previousDropoffCoordinates = useRef(null)

  // Check if services are loaded and set default service for affiliate
  useEffect(() => {
    if (services && services.length > 0) {
      setLoadingServices(false)

      // If affiliate and no service selected yet, set the preferred service
      if (isAffiliate && !selectedService && !hasSetAffiliateService.current && affiliate) {
        // First check if affiliate has a preferredService
        if (affiliate.preferredService) {
          const preferredService = services.find(s => s.serviceType === affiliate.preferredService)
          if (preferredService) {
            setSelectedService(preferredService)
            hasSetAffiliateService.current = true
          }
        } else {
          // Fall back to per-person service
          const perPersonService = services.find(s => s.serviceType === 'per-person' || s.title.toLowerCase().includes('per person'))
          if (perPersonService) {
            setSelectedService(perPersonService)
            hasSetAffiliateService.current = true
          }
        }
      }

      // Show passenger warning if needed
      if (selectedService && selectedService.maxPassengers) {
        setShowPassengerWarning(true)
      }
    }
  }, [services, selectedService, isAffiliate, affiliate, setSelectedService])

  // Force pricing recalculation when affiliate data changes
  useEffect(() => {
    if (isAffiliate && affiliate && selectedService) {
      // Force a re-selection of the service to trigger pricing recalculation
      setSelectedService(selectedService)
    }
  }, [affiliate])

  // Affiliate setup is now handled by AffiliateHandler component

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

  // Use cached time slots query when date changes
  const dateString = selectedDate && selectedDate.isValid() ? selectedDate.format('YYYY-MM-DD') : undefined
  const {
    data: timeSlots,
    isLoading: isSlotsLoading,
    error: slotsError
  } = useTimeSlots(dateString)
  
  // Return trip time slots
  const returnDateString = returnDetails?.date && moment(returnDetails.date).isValid() ? moment(returnDetails.date).format('YYYY-MM-DD') : undefined
  const {
    data: returnTimeSlots,
    isLoading: isReturnSlotsLoading,
    error: returnSlotsError
  } = useTimeSlots(returnDateString)

  // Update available time slots when query returns data
  useEffect(() => {
    // Update loading state
    setIsLoading(isSlotsLoading);

    // Process response when available
    if (timeSlots) {
      if (timeSlots.success && timeSlots.data) {
        const formattedSlots = calendarService.formatAvailableSlots(timeSlots.data);
        setAvailableTimeSlots(formattedSlots);
        setError(''); // Clear any previous errors
      } else if (timeSlots.error) {
        setError(timeSlots.error || 'Failed to load available time slots');
        console.error('Error in time slots response:', timeSlots.error);
      }
    } else if (slotsError) {
      setError('Failed to load available time slots');
      console.error('Error fetching time slots:', slotsError);
    }
  }, [timeSlots, isSlotsLoading, slotsError])
  
  // Update return trip time slots
  useEffect(() => {
    setIsReturnLoading(isReturnSlotsLoading);
    
    if (returnTimeSlots) {
      if (returnTimeSlots.success && returnTimeSlots.data) {
        const formattedSlots = calendarService.formatAvailableSlots(returnTimeSlots.data);
        setReturnAvailableTimeSlots(formattedSlots);
      } else if (returnTimeSlots.error) {
        console.error('Error in return time slots response:', returnTimeSlots.error);
      }
    } else if (returnSlotsError) {
      console.error('Error fetching return time slots:', returnSlotsError);
    }
  }, [returnTimeSlots, isReturnSlotsLoading, returnSlotsError])

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

      // If switching to from-airport, clear the pickup location only if it's not already set
      if (
        isFromAirport &&
        !wasFromAirport &&
        (!pickupDetails?.address || !pickupDetails?.coordinates)
      ) {
        setPickupDetails({
          ...pickupDetails,
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
      }

      // If switching to to-airport, clear the dropoff location only if it's not already set
      if (
        isToAirport &&
        !wasToAirport &&
        (!dropoffDetails?.address || !dropoffDetails?.coordinates)
      ) {
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
        // Only update if service is different from current
        if (!selectedService || selectedService.id !== service.id) {
          setSelectedService(service)
          setShowPassengerWarning(!!service.maxPassengers)
          
          // Reset round trip checkbox when changing service
          setRoundTrip(false)

          // Clear locations when switching between airport and non-airport services
          handleServiceTypeChange(service, selectedService)
        }
      }
    },
    [services, setSelectedService, handleServiceTypeChange, selectedService, setRoundTrip]
  )

  const handleDateSelect = useCallback(
    date => {
      if (!date) return

      // Check if date is null or undefined
      if (!date.year || !date.month || !date.day) return

      // Create a consistent date
      const momentDate = moment({
        year: date.year,
        month: date.month.number - 1,
        day: date.day,
      })

      // Only update if the date has actually changed
      if (selectedDate && momentDate.format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')) {
        return
      }

      setSelectedDate(momentDate)

      // Only reset time if date changed
      setSelectedTime(null)

      setPickupDetails({
        ...pickupDetails,
        date: momentDate.format('YYYY-MM-DD'),
      })
    },
    [setSelectedDate, setSelectedTime, pickupDetails, setPickupDetails, selectedDate]
  )

  const handleTimeSelect = useCallback(
    time => {
      // If time is already selected, don't do anything
      if (selectedTime === time) {
        return
      }

      setError('')

      // Immediately set the selected time without checking with backend
      // Since we're only showing available time slots anyway
      setSelectedTime(time)
      setPickupDetails({
        ...pickupDetails,
        time: time,
      })

      // Check if it's a night service (11 PM - 6 AM)
      const hour = parseInt(time.split(':')[0], 10)
      if (hour >= 23 || hour < 6) {
        setError('Night service fee will be applied for services between 11 PM and 6 AM')
      }
    },
    [selectedDate, setSelectedTime, pickupDetails, setPickupDetails, selectedTime]
  )
  
  const handleReturnDateSelect = useCallback(
    date => {
      if (!date) return

      // Create a consistent date format
      const momentDate = moment({
        year: date.year,
        month: date.month.number - 1,
        day: date.day,
      })

      setReturnDetails({
        ...returnDetails,
        date: momentDate.format('YYYY-MM-DD'),
        time: null, // Reset time when date changes
      })
    },
    [returnDetails, setReturnDetails]
  )
  
  const handleReturnTimeSelect = useCallback(
    time => {
      setReturnDetails({
        ...returnDetails,
        time: time,
      })
    },
    [returnDetails, setReturnDetails]
  )
  
  const handleRoundTripChange = useCallback(
    (e) => {
      const checked = e.target.checked
      setRoundTrip(checked)
      
      if (checked) {
        // Auto-populate return trip details with swapped pickup/dropoff
        setReturnDetails({
          pickupAddress: dropoffDetails?.address || '',
          pickupCoordinates: dropoffDetails?.coordinates || null,
          dropoffAddress: pickupDetails?.address || '',
          dropoffCoordinates: pickupDetails?.coordinates || null,
          date: null,
          time: null,
          isCustom: false,
          isCottonwood: dropoffDetails?.isCottonwood || pickupDetails?.isCottonwood || false,
        })
      }
    },
    [setRoundTrip, setReturnDetails, pickupDetails, dropoffDetails]
  )

  // Remove this function - we don't need it anymore since affiliate locations are handled by AffiliateHandler

  const handleFromLocationChange = useCallback(
    location => {
      const isCottonwoodService = location.isCottonwood || dropoffDetails?.isCottonwood

      // Update pickup details
      setPickupDetails({
        ...pickupDetails,
        address: location.address,
        coordinates: location.coordinates,
        isCustom: location.isCustom,
        isCottonwood: location.isCottonwood,
      })

      // Update return dropoff if round trip is selected (pickup location becomes return dropoff)
      if (isRoundTrip) {
        setReturnDetails(prev => ({
          ...prev,
          dropoffAddress: location.address,
          dropoffCoordinates: location.coordinates,
        }))
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
    },
    [
      dropoffDetails,
      isAffiliate,
      services,
      selectedService,
      setSelectedService,
      pickupDetails,
      setPickupDetails,
      isRoundTrip,
      setReturnDetails,
    ]
  )

  const handleToLocationChange = useCallback(
    location => {
      const isCottonwoodService = location.isCottonwood || pickupDetails?.isCottonwood

      // Update dropoff details
      setDropoffDetails({
        ...dropoffDetails,
        address: location.address,
        coordinates: location.coordinates,
        isCustom: location.isCustom,
        isCottonwood: location.isCottonwood,
      })

      // Update return pickup if round trip is selected (dropoff location becomes return pickup)
      if (isRoundTrip) {
        setReturnDetails(prev => ({
          ...prev,
          pickupAddress: location.address,
          pickupCoordinates: location.coordinates,
        }))
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
    },
    [
      pickupDetails,
      isAffiliate,
      services,
      selectedService,
      setSelectedService,
      dropoffDetails,
      setDropoffDetails,
      isRoundTrip,
      setReturnDetails,
    ]
  )

  const canProceed = useCallback(() => {
    if (!selectedService) return false
    if (selectedService.requiresInquiry) return false

    const hasValidPickup =
      pickupDetails?.address && (pickupDetails?.coordinates || pickupDetails?.isCustom)
    const hasValidDropoff =
      dropoffDetails?.address && (dropoffDetails?.coordinates || dropoffDetails?.isCustom)
    
    const hasValidOutbound = Boolean(hasValidPickup && hasValidDropoff && pickupDetails?.date && pickupDetails?.time)
    
    if (!isRoundTrip) {
      return hasValidOutbound
    }
    
    // For round trip, also check return details
    const hasValidReturn = Boolean(
      returnDetails?.pickupAddress && returnDetails?.dropoffAddress &&
      returnDetails?.date && returnDetails?.time
    )
    
    return hasValidOutbound && hasValidReturn
  }, [selectedService, pickupDetails, dropoffDetails, isRoundTrip, returnDetails])

  const handleContinue = useCallback(() => {
    if (!canProceed()) {
      setError('Please fill in all required fields')
      return
    }

    // We already know the time slot is available, as we're only showing available time slots
    // No need to check availability again, just proceed to the next step

    // Preserve affiliate parameter in navigation
    const searchParams = new URLSearchParams(location.search)
    const affiliateParam = searchParams.get('affiliate')
    const nextUrl = affiliateParam ? `/booking-extra?affiliate=${affiliateParam}` : '/booking-extra'

    // Pass state to preserve booking data
    navigate(nextUrl, { state: { preserveBookingData: true } })
  }, [canProceed, navigate, setError, location.search])

  // Memoized derived values
  const filteredServices = useMemo(
    () => {
      if (!services || services.length === 0) return [];
      
      // For affiliates, show services they have pricing for
      if (isAffiliate && affiliate?.servicePricingList && affiliate.servicePricingList.length > 0) {
        const configuredServiceTypes = affiliate.servicePricingList.map(sp => sp.serviceType);
        return services.filter(s => configuredServiceTypes.includes(s.serviceType));
      }
      
      // For affiliates without specific pricing list, show all services
      // This allows affiliates to use all services even without custom pricing
      return services;
    },
    [isAffiliate, affiliate, services]
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
                      onChange={handleServiceSelect}
                      disabled={filteredServices.length <= 1}
                    >
                      {filteredServices.length === 0 ? (
                        <option value="">No services configured</option>
                      ) : selectedService ? (
                        <>
                          {filteredServices.length > 1 && <option value="">Select a service</option>}
                          {filteredServices.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                        </>
                      ) : (
                        <>
                          <option value="">Select a service</option>
                          {filteredServices.map(service => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
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
                      value={pickupDetails}
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
                      affiliateLocations={
                        isAffiliate && (affiliate || (affiliateCode && affiliateCode.affiliate))
                          ? {
                              pickup: (affiliate || affiliateCode.affiliate)?.defaultPickupLocation,
                              dropoff: (affiliate || affiliateCode.affiliate)?.defaultDropoffLocation,
                            }
                          : null
                      }
                      disabled={disableLocationPickers}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <span className="field-label">Drop-off Location</span>
                  <div className="input-with-icon">
                    <i className="icon-to"></i>
                    <PlacePicker
                      value={dropoffDetails}
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
                      affiliateLocations={
                        isAffiliate && (affiliate || (affiliateCode && affiliateCode.affiliate))
                          ? {
                              pickup: (affiliate || affiliateCode.affiliate)?.defaultPickupLocation,
                              dropoff: (affiliate || affiliateCode.affiliate)?.defaultDropoffLocation,
                            }
                          : null
                      }
                      disabled={disableLocationPickers}
                    />
                  </div>
                </div>
              </div>

              {selectedService && !selectedService.requiresInquiry && (
                <div className="datetime-section">
                  <div className="date-time-section">
                    <div className="date-time-row" style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <span className="field-label">Select Date</span>
                        <DatePicker
                          onChange={handleDateSelect}
                          format="MMMM DD YYYY"
                          minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                          maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
                          className="custom-datepicker"
                          placeholder="Select the date"
                          editable={false}
                          calendarPosition="bottom-center"
                          value={pickupDetails?.date ? new Date(pickupDetails.date) : null}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <span className="field-label">Select Time</span>
                        {isLoading ? (
                          <div className="loading" style={{ padding: '10px', textAlign: 'center' }}>Loading times...</div>
                        ) : (
                          <CustomTimePicker
                            value={selectedTime}
                            onChange={handleTimeSelect}
                            availableTimeSlots={availableTimeSlots}
                            disabled={!selectedDate || availableTimeSlots.length === 0}
                            placeholder={
                              !selectedDate ? 'Select a date first' : 
                              availableTimeSlots.length === 0 ? 'No available times' : 
                              'Select a time'
                            }
                            className="tw-w-full"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Round Trip Checkbox - Only show for non-hourly services */}
                  {selectedService && selectedService.serviceType !== 'hourly' && (
                    <div className="mt-6">
                      <Checkbox 
                        checked={isRoundTrip} 
                        onChange={handleRoundTripChange}
                        className="text-16"
                      >
                        Round Trip
                      </Checkbox>
                    </div>
                  )}
                  
                  {/* Hours selection for hourly service */}
                  {selectedService && selectedService.serviceType === 'hourly' && (
                    <div className="mt-6">
                      <span className="field-label">Number of Hours</span>
                      <select 
                        className="form-control mt-2"
                        value={pricing.hours || 1}
                        onChange={(e) => setServiceHours(parseInt(e.target.value))}
                      >
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(hour => (
                          <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {/* Return Trip Section */}
                  {isRoundTrip && (
                    <div className="return-trip-section mt-6">
                      <h5 className="mb-4">Return Trip Details</h5>
                      
                      <div className="mb-4">
                        <span className="field-label">Return Date & Time</span>
                        <div className="date-time-row" style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <DatePicker
                              onChange={handleReturnDateSelect}
                              format="MMMM DD YYYY"
                              minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                              maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
                              className="custom-datepicker"
                              placeholder="Select return date"
                              editable={false}
                              calendarPosition="bottom-center"
                              value={returnDetails?.date ? new Date(returnDetails.date) : null}
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            {returnDetails?.date && (
                              isReturnLoading ? (
                                <div className="loading" style={{ padding: '10px', textAlign: 'center' }}>Loading times...</div>
                              ) : (
                                <CustomTimePicker
                                  value={returnDetails?.time}
                                  onChange={handleReturnTimeSelect}
                                  availableTimeSlots={returnAvailableTimeSlots}
                                  disabled={returnAvailableTimeSlots.length === 0}
                                  placeholder={
                                    returnAvailableTimeSlots.length === 0 ? 'No available times' : 'Select return time'
                                  }
                                  className="tw-w-full"
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="return-locations mt-4">
                        <div className="text-sm text-gray-600">
                          <strong>Return Pickup:</strong> {dropoffDetails?.address || 'Select dropoff location first'}<br/>
                          <strong>Return Dropoff:</strong> {pickupDetails?.address || 'Select pickup location first'}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Return locations are automatically set as the reverse of your outbound trip
                        </div>
                      </div>
                    </div>
                  )}
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
Continue
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
