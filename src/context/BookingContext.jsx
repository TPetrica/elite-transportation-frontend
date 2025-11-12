import serviceAPI from '@/services/service.service'
import moment from 'moment'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'

const BookingContext = createContext(null)

// Initial state for booking
const initialState = {
  pickupDetails: {
    address: '',
    coordinates: null,
    date: null,
    time: null,
    flightNumber: '',
    flightTime: '',
    isCustom: false,
    isCottonwood: false,
  },
  dropoffDetails: {
    address: '',
    coordinates: null,
    isCustom: false,
    isCottonwood: false,
  },
  // Round trip details
  isRoundTrip: false,
  returnDetails: {
    pickupAddress: '',
    pickupCoordinates: null,
    dropoffAddress: '',
    dropoffCoordinates: null,
    date: null,
    time: null,
    isCustom: false,
    isCottonwood: false,
  },
  selectedDate: null,
  selectedTime: null,
  selectedService: null,
  selectedExtras: [],
  bookingNumber: null,
  passengerDetails: {
    passengers: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    flightNumber: '',
    flightTime: '',
    luggage: 0,
    skiBags: 0,
    notes: '',
    specialRequests: '',
  },
  distance: null,
  duration: null,
  pricing: {
    basePrice: 0,
    gratuity: 0,
    extrasTotal: 0,
    nightFee: 0,
    totalPrice: 0,
    hours: 1,
    selectedTipPercentage: null,
    customTipAmount: '',
    isCustomTip: false,
  },
  isWinter: false,
  isAffiliate: false,
  affiliateCode: '',
  affiliate: null,
  services: [], // Added to store services from backend
}

// Calculate base price based on service, passenger count, hours, location
const calculateBasePrice = (
  service,
  numPassengers = 1,
  hours = 1,
  isCottonwood = false,
  isAffiliate = false,
  affiliate = null,
  isRoundTrip = false
) => {
  if (!service) return 0

  const passengerCount = parseInt(numPassengers) || 1
  let price = 0

  // If affiliate has custom pricing for this service type, use it
  if (isAffiliate && affiliate && affiliate.servicePricingList) {
    const affiliatePricing = affiliate.servicePricingList.find(
      sp => sp.serviceType === service.serviceType
    )
    
    if (affiliatePricing && affiliatePricing.basePrice !== undefined) {
      // Use affiliate's custom pricing
      const affiliateMinPassengers = affiliatePricing.minPassengers || 0
      
      switch (service.serviceType) {
        case 'per-person':
          const effectivePassengers = Math.max(passengerCount, affiliateMinPassengers)
          price = effectivePassengers * affiliatePricing.basePrice
          break
        case 'hourly':
          price = affiliatePricing.basePrice * hours
          break
        default:
          price = affiliatePricing.basePrice
      }
    }
  }

  // If no affiliate pricing was found, use standard pricing
  if (price === 0) {
    // If either pickup or dropoff is in Cottonwood Canyons, use Cottonwood pricing
    if (isCottonwood && service.serviceType !== 'canyons') {
      // Find canyons service from context state
      const canyonsService = service.canyonsPrice || 150 // Fallback to 150 if not found
      price = canyonsService
    } else {
      // Calculate price based on service type
      switch (service.serviceType) {
        case 'from-airport':
        case 'to-airport':
          price = service.basePrice
          break
        case 'canyons':
          price = service.basePrice
          break
        case 'per-person':
          // Get minimum passenger count from service or affiliate config
          const minPersons = service.minPassengers || 2
          const effectivePassengers = Math.max(passengerCount, minPersons)
          price = effectivePassengers * service.basePrice
          break
        case 'hourly':
          price = service.basePrice * hours
          break
        case 'round-trip':
          price = service.basePrice
          break
        case 'group':
          price = service.basePrice || 0
          break
        default:
          // Fallback to base price if available
          price = service.basePrice || 0
      }
    }
  }

  // Double price for round trip (except hourly) and apply $10 discount overall
  if (isRoundTrip && service.serviceType !== 'hourly') {
    price = Math.max(price * 2 - 10, 0)
  }

  return price
}

// Calculate night service fee
const calculateNightFee = (time, nightFeeAmount = 20) => {
  if (!time) return 0
  const hour = parseInt(time.split(':')[0], 10)
  return hour >= 23 || hour < 7 ? nightFeeAmount : 0
}

// Calculate total price
const calculateTotalPrice = (basePrice = 0, gratuity = 0, extrasTotal = 0, nightFee = 0) => {
  // Ensure all values are numbers
  basePrice = Number(basePrice) || 0
  gratuity = Number(gratuity) || 0
  extrasTotal = Number(extrasTotal) || 0
  nightFee = Number(nightFee) || 0

  return basePrice + gratuity + extrasTotal + nightFee
}

// Update pricing state - made more efficient
const updatePricingState = (
  state,
  basePrice,
  gratuity = state.pricing.gratuity,
  extrasTotal = state.pricing.extrasTotal,
  nightFee = state.pricing.nightFee,
  tipSettings = {
    selectedTipPercentage: state.pricing.selectedTipPercentage,
    customTipAmount: state.pricing.customTipAmount,
    isCustomTip: state.pricing.isCustomTip,
  }
) => {
  // Ensure all values are numbers
  basePrice = Number(basePrice) || 0
  gratuity = Number(gratuity) || 0
  extrasTotal = Number(extrasTotal) || 0
  nightFee = Number(nightFee) || 0

  const totalPrice = calculateTotalPrice(basePrice, gratuity, extrasTotal, nightFee)

  // Only create a new pricing object if something actually changed
  if (
    basePrice === state.pricing.basePrice &&
    gratuity === state.pricing.gratuity &&
    extrasTotal === state.pricing.extrasTotal &&
    nightFee === state.pricing.nightFee &&
    tipSettings.selectedTipPercentage === state.pricing.selectedTipPercentage &&
    tipSettings.customTipAmount === state.pricing.customTipAmount &&
    tipSettings.isCustomTip === state.pricing.isCustomTip &&
    totalPrice === state.pricing.totalPrice
  ) {
    return state.pricing
  }

  return {
    ...state.pricing,
    basePrice,
    gratuity,
    extrasTotal,
    nightFee,
    selectedTipPercentage: tipSettings.selectedTipPercentage,
    customTipAmount: tipSettings.customTipAmount,
    isCustomTip: tipSettings.isCustomTip,
    totalPrice,
  }
}

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SERVICES': {
      return {
        ...state,
        services: action.payload,
      }
    }


    case 'SET_PICKUP_DETAILS': {
      // Only update if there's an actual change
      const newPickupDetails = { ...state.pickupDetails, ...action.payload }

      if (JSON.stringify(newPickupDetails) === JSON.stringify(state.pickupDetails)) {
        return state
      }

      const nightFee = calculateNightFee(newPickupDetails.time)
      const isCottonwood = newPickupDetails.isCottonwood || state.dropoffDetails.isCottonwood

      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate,
        state.affiliate,
        state.isRoundTrip
      )

      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }

      return {
        ...state,
        pickupDetails: newPickupDetails,
        pricing: updatePricingState(state, basePrice, gratuity, undefined, nightFee),
      }
    }

    case 'SET_DROPOFF_DETAILS': {
      // Only update if there's an actual change
      const newDropoffDetails = { ...state.dropoffDetails, ...action.payload }

      if (JSON.stringify(newDropoffDetails) === JSON.stringify(state.dropoffDetails)) {
        return state
      }

      const isCottonwood = newDropoffDetails.isCottonwood || state.pickupDetails.isCottonwood

      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate,
        state.affiliate,
        state.isRoundTrip
      )

      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }

      return {
        ...state,
        dropoffDetails: newDropoffDetails,
        pricing: updatePricingState(state, basePrice, gratuity),
      }
    }

    case 'SET_SELECTED_DATE': {
      if (!action.payload && !state.selectedDate) {
        return state // No change
      } else if (!action.payload) {
        return {
          ...state,
          selectedDate: null,
        }
      }

      const newDate = moment(action.payload)
      // Check if date is the same
      if (state.selectedDate && newDate.isSame(state.selectedDate)) {
        return state
      }

      return {
        ...state,
        selectedDate: newDate,
      }
    }

    case 'SET_SELECTED_TIME': {
      if (action.payload === state.selectedTime) {
        return state
      }

      const nightFee = calculateNightFee(action.payload)
      return {
        ...state,
        selectedTime: action.payload,
        pricing: updatePricingState(state, state.pricing.basePrice, undefined, undefined, nightFee),
      }
    }

    case 'SET_SELECTED_SERVICE': {
      // Check if the service is the same
      if (
        state.selectedService &&
        action.payload &&
        state.selectedService.id === action.payload.id
      ) {
        return state
      }

      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      const basePrice = calculateBasePrice(
        action.payload,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate,
        state.affiliate,
        state.isRoundTrip
      )

      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }

      // Handle service-specific affiliate locations and descriptions
      let newPickupDetails = state.pickupDetails
      let newDropoffDetails = state.dropoffDetails
      let newSelectedService = action.payload
      
      if (state.isAffiliate && state.affiliate && action.payload) {
        // Find affiliate configuration for this service type
        const serviceConfig = state.affiliate.servicePricingList?.find(
          sp => sp.serviceType === action.payload.serviceType
        )
        
        if (serviceConfig) {
          // Override service description with affiliate custom description if available
          if (serviceConfig.customDescription && serviceConfig.customDescription.trim()) {
            newSelectedService = {
              ...action.payload,
              description: serviceConfig.customDescription.trim()
            }
          }
          
          // Set service-specific locations if they exist
          if (serviceConfig.defaultPickupLocation?.address) {
            newPickupDetails = {
              ...state.pickupDetails,
              ...serviceConfig.defaultPickupLocation
            }
          }
          
          if (serviceConfig.defaultDropoffLocation?.address) {
            newDropoffDetails = {
              ...state.dropoffDetails,
              ...serviceConfig.defaultDropoffLocation
            }
          }
        }
      }

      return {
        ...state,
        selectedService: newSelectedService,
        pickupDetails: newPickupDetails,
        dropoffDetails: newDropoffDetails,
        pricing: updatePricingState(state, basePrice, gratuity),
      }
    }

    case 'SET_SERVICE_HOURS': {
      if (action.payload === state.pricing.hours) {
        return state
      }

      const hours = action.payload
      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        hours,
        isCottonwood,
        state.isAffiliate,
        state.affiliate,
        state.isRoundTrip
      )

      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }

      return {
        ...state,
        pricing: {
          ...updatePricingState(state, basePrice, gratuity),
          hours,
        },
      }
    }

    case 'SET_SELECTED_EXTRAS': {
      // Check if the extras are the same
      if (JSON.stringify(action.payload) === JSON.stringify(state.selectedExtras)) {
        return state
      }

      const extrasTotal = action.payload.reduce(
        (total, extra) => total + extra.price * extra.quantity,
        0
      )

      return {
        ...state,
        selectedExtras: action.payload,
        pricing: updatePricingState(state, state.pricing.basePrice, undefined, extrasTotal),
      }
    }

    case 'SET_PASSENGER_DETAILS': {
      // Only update if there's an actual change
      const newPassengerDetails = {
        ...state.passengerDetails,
        ...action.payload,
      }

      if (JSON.stringify(newPassengerDetails) === JSON.stringify(state.passengerDetails)) {
        return state
      }

      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      const basePrice = calculateBasePrice(
        state.selectedService,
        newPassengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate,
        state.affiliate,
        state.isRoundTrip
      )

      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }

      return {
        ...state,
        passengerDetails: newPassengerDetails,
        pricing: updatePricingState(state, basePrice, gratuity),
      }
    }

    case 'UPDATE_TIP_SETTINGS': {
      const gratuity = Number(action.payload.gratuity)
      const percentage = Number(action.payload.percentage)
      const customAmount = action.payload.customAmount
      const isCustom = action.payload.isCustom

      // Check if tip settings are the same
      if (
        gratuity === state.pricing.gratuity &&
        percentage === state.pricing.selectedTipPercentage &&
        customAmount === state.pricing.customTipAmount &&
        isCustom === state.pricing.isCustomTip
      ) {
        return state
      }

      return {
        ...state,
        pricing: {
          ...state.pricing,
          gratuity,
          selectedTipPercentage: percentage,
          customTipAmount: customAmount,
          isCustomTip: isCustom,
          totalPrice: calculateTotalPrice(
            state.pricing.basePrice,
            gratuity,
            state.pricing.extrasTotal,
            state.pricing.nightFee
          ),
        },
      }
    }

    case 'SET_DISTANCE_DURATION': {
      // Check if distance and duration are the same
      if (
        JSON.stringify(action.payload.distance) === JSON.stringify(state.distance) &&
        action.payload.duration === state.duration
      ) {
        return state
      }

      return {
        ...state,
        distance: action.payload.distance,
        duration: action.payload.duration,
      }
    }

    case 'SET_BOOKING_NUMBER':
      if (action.payload === state.bookingNumber) {
        return state
      }

      return {
        ...state,
        bookingNumber: action.payload,
      }

    case 'SET_AFFILIATE_MODE': {
      // When setting affiliate mode, recalculate pricing if a service is already selected
      let newPricing = state.pricing;
      let newPickupDetails = state.pickupDetails;
      let newDropoffDetails = state.dropoffDetails;
      let newSelectedService = state.selectedService;
      
      if (state.selectedService) {
        const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood;
        const basePrice = calculateBasePrice(
          state.selectedService,
          state.passengerDetails.passengers,
          state.pricing.hours,
          isCottonwood,
          true, // isAffiliate
          action.payload.affiliate,
          state.isRoundTrip
        );
        
        let gratuity = state.pricing.gratuity;
        if (state.pricing.selectedTipPercentage) {
          gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100;
        }
        
        newPricing = updatePricingState(state, basePrice, gratuity);
        
        // Apply service-specific configurations if available
        const serviceConfig = action.payload.affiliate.servicePricingList?.find(
          sp => sp.serviceType === state.selectedService.serviceType
        );
        
        if (serviceConfig) {
          // Override service description with affiliate custom description if available
          if (serviceConfig.customDescription && serviceConfig.customDescription.trim()) {
            newSelectedService = {
              ...state.selectedService,
              description: serviceConfig.customDescription.trim()
            };
          }
          
          // Set service-specific locations if they exist and current locations are empty
          if (serviceConfig.defaultPickupLocation?.address && !state.pickupDetails.address) {
            newPickupDetails = {
              ...state.pickupDetails,
              ...serviceConfig.defaultPickupLocation
            };
          }
          
          if (serviceConfig.defaultDropoffLocation?.address && !state.dropoffDetails.address) {
            newDropoffDetails = {
              ...state.dropoffDetails,
              ...serviceConfig.defaultDropoffLocation
            };
          }
        }
      }
      
      return {
        ...state,
        isAffiliate: true,
        affiliateCode: action.payload.code,
        affiliate: action.payload.affiliate,
        selectedService: newSelectedService,
        pickupDetails: newPickupDetails,
        dropoffDetails: newDropoffDetails,
        pricing: newPricing,
      }
    }

    case 'SET_ROUND_TRIP': {
      if (action.payload === state.isRoundTrip) {
        return state
      }
      
      // Recalculate pricing when round trip is toggled
      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      
      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate,
        state.affiliate,
        action.payload // new round trip value
      )
      
      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }
      
      return {
        ...state,
        isRoundTrip: action.payload,
        // Clear return details if disabling round trip
        returnDetails: action.payload ? state.returnDetails : initialState.returnDetails,
        pricing: updatePricingState(state, basePrice, gratuity),
      }
    }

    case 'SET_RETURN_DETAILS': {
      const newReturnDetails = { ...state.returnDetails, ...action.payload }
      
      if (JSON.stringify(newReturnDetails) === JSON.stringify(state.returnDetails)) {
        return state
      }
      
      return {
        ...state,
        returnDetails: newReturnDetails,
      }
    }

    case 'RESET_BOOKING':
      if (
        state.isAffiliate === initialState.isAffiliate &&
        state.affiliateCode === initialState.affiliateCode &&
        JSON.stringify(state.pickupDetails) === JSON.stringify(initialState.pickupDetails) &&
        JSON.stringify(state.dropoffDetails) === JSON.stringify(initialState.dropoffDetails) &&
        state.selectedDate === initialState.selectedDate &&
        state.selectedTime === initialState.selectedTime &&
        state.selectedService === initialState.selectedService
      ) {
        return state // No need to reset if already at initial state
      }

      return {
        ...initialState,
        isAffiliate: state.isAffiliate,
        affiliateCode: state.affiliateCode,
        affiliate: state.affiliate,
        services: state.services, // Keep services from backend
      }

    default:
      return state
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  // Fetch services on initial render
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceAPI.getActiveServices()
        if (response.success) {
          dispatch({ type: 'SET_SERVICES', payload: response.data })
        } else {
          console.error('Failed to load services:', response.error)
        }
      } catch (err) {
        console.error('Error loading services:', err)
      }
    }

    fetchServices()
  }, [])

  // Memoize dispatch actions to prevent recreation on every render
  const setServices = useCallback(payload => dispatch({ type: 'SET_SERVICES', payload }), [])

  const setPickupDetails = useCallback(
    payload => dispatch({ type: 'SET_PICKUP_DETAILS', payload }),
    []
  )

  const setDropoffDetails = useCallback(
    payload => dispatch({ type: 'SET_DROPOFF_DETAILS', payload }),
    []
  )

  const setSelectedDate = useCallback(
    payload => dispatch({ type: 'SET_SELECTED_DATE', payload }),
    []
  )

  const setSelectedTime = useCallback(
    payload => dispatch({ type: 'SET_SELECTED_TIME', payload }),
    []
  )

  const setSelectedService = useCallback(
    payload => dispatch({ type: 'SET_SELECTED_SERVICE', payload }),
    []
  )

  const setServiceHours = useCallback(
    payload => dispatch({ type: 'SET_SERVICE_HOURS', payload }),
    []
  )

  const setSelectedExtras = useCallback(
    payload => dispatch({ type: 'SET_SELECTED_EXTRAS', payload }),
    []
  )

  const setPassengerDetails = useCallback(
    payload => dispatch({ type: 'SET_PASSENGER_DETAILS', payload }),
    []
  )

  const setDistanceAndDuration = useCallback(
    payload => dispatch({ type: 'SET_DISTANCE_DURATION', payload }),
    []
  )

  const updatePricing = useCallback(payload => dispatch({ type: 'UPDATE_PRICING', payload }), [])

  const setBookingNumber = useCallback(
    payload => dispatch({ type: 'SET_BOOKING_NUMBER', payload }),
    []
  )

  const resetBooking = useCallback(() => dispatch({ type: 'RESET_BOOKING' }), [])

  const updateTipSettings = useCallback(
    (gratuity, percentage, customAmount, isCustom) =>
      dispatch({
        type: 'UPDATE_TIP_SETTINGS',
        payload: { gratuity, percentage, customAmount, isCustom },
      }),
    []
  )

  const setAffiliateMode = useCallback(
    payload => dispatch({ type: 'SET_AFFILIATE_MODE', payload }),
    []
  )

  const setRoundTrip = useCallback(
    payload => dispatch({ type: 'SET_ROUND_TRIP', payload }),
    []
  )

  const setReturnDetails = useCallback(
    payload => dispatch({ type: 'SET_RETURN_DETAILS', payload }),
    []
  )

  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      ...state,
      setServices,
      setPickupDetails,
      setDropoffDetails,
      setSelectedDate,
      setSelectedTime,
      setSelectedService,
      setServiceHours,
      setSelectedExtras,
      setPassengerDetails,
      setDistanceAndDuration,
      updatePricing,
      setBookingNumber,
      resetBooking,
      updateTipSettings,
      setAffiliateMode,
      setRoundTrip,
      setReturnDetails,
    }),
    [
      state,
      setServices,
      setPickupDetails,
      setDropoffDetails,
      setSelectedDate,
      setSelectedTime,
      setSelectedService,
      setServiceHours,
      setSelectedExtras,
      setPassengerDetails,
      setDistanceAndDuration,
      updatePricing,
      setBookingNumber,
      resetBooking,
      updateTipSettings,
      setAffiliateMode,
      setRoundTrip,
      setReturnDetails,
    ]
  )

  return <BookingContext.Provider value={contextValue}>{children}</BookingContext.Provider>
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
