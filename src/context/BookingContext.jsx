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
  affiliate = null
) => {
  if (!service) return 0

  const passengerCount = parseInt(numPassengers) || 1

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
          return effectivePassengers * affiliatePricing.basePrice
        case 'hourly':
          return affiliatePricing.basePrice * hours
        default:
          return affiliatePricing.basePrice
      }
    }
  }

  // If either pickup or dropoff is in Cottonwood Canyons, use Cottonwood pricing
  if (isCottonwood && service.serviceType !== 'canyons') {
    // Find canyons service from context state
    const canyonsService = service.canyonsPrice || 150 // Fallback to 150 if not found
    return canyonsService
  }

  // Calculate price based on service type
  switch (service.serviceType) {
    case 'from-airport':
    case 'to-airport':
      return service.basePrice
    case 'canyons':
      return service.basePrice
    case 'per-person':
      // Get minimum passenger count from service or affiliate config
      const minPersons = service.minPassengers || 2
      const effectivePassengers = Math.max(passengerCount, minPersons)
      return effectivePassengers * service.basePrice
    case 'hourly':
      return service.basePrice * hours
    case 'round-trip':
      return service.basePrice
    case 'group':
      return service.basePrice || 0
    default:
      // Fallback to base price if available
      return service.basePrice || 0
  }
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
        state.affiliate
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
        state.affiliate
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
        state.affiliate
      )

      let gratuity = state.pricing.gratuity
      if (state.pricing.selectedTipPercentage) {
        gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100
      }

      return {
        ...state,
        selectedService: action.payload,
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
        state.affiliate
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
        state.affiliate
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
      
      if (state.selectedService) {
        const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood;
        const basePrice = calculateBasePrice(
          state.selectedService,
          state.passengerDetails.passengers,
          state.pricing.hours,
          isCottonwood,
          true, // isAffiliate
          action.payload.affiliate
        );
        
        let gratuity = state.pricing.gratuity;
        if (state.pricing.selectedTipPercentage) {
          gratuity = (basePrice * state.pricing.selectedTipPercentage) / 100;
        }
        
        newPricing = updatePricingState(state, basePrice, gratuity);
      }
      
      return {
        ...state,
        isAffiliate: true,
        affiliateCode: action.payload.code,
        affiliate: action.payload.affiliate,
        pricing: newPricing,
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
