import { createContext, useContext, useReducer } from 'react'

const BookingContext = createContext(null)

const PRICES = {
  SUV: {
    base: 120,
    gasSurcharge: 0,
    winterSurcharge: 0,
  },
  CANYONS: {
    base: 150,
  },
  PER_PERSON: {
    base: 65,
    minPersons: 2,
    affiliateMinPersons: 1, // New: Minimum persons for affiliate bookings
  },
  HOURLY: {
    base: 100,
  },
  ADDITIONAL_FEES: {
    nightService: 20,
    meetAndGreet: 30,
  },
}

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
  isAffiliate: false, // New: Flag to track if this is an affiliate booking
}

const calculatePrice = {
  standard: () => {
    return PRICES.SUV.base
  },
  canyons: () => PRICES.CANYONS.base,
  perPerson: (passengers, isAffiliate = false) => {
    const minPersons = isAffiliate
      ? PRICES.PER_PERSON.affiliateMinPersons
      : PRICES.PER_PERSON.minPersons
    const effectivePassengers = Math.max(passengers, minPersons)
    return effectivePassengers * PRICES.PER_PERSON.base
  },
  hourly: hours => PRICES.HOURLY.base * hours,
  group: () => 0, // Group pricing requires inquiry
}

const calculateBasePrice = (
  service,
  numPassengers = 1,
  hours = 1,
  isCottonwood = false,
  isAffiliate = false
) => {
  if (!service) return 0

  const passengerCount = parseInt(numPassengers) || 1

  // If either pickup or dropoff is in Cottonwood area, use Canyons pricing
  if (isCottonwood) {
    return calculatePrice.canyons()
  }

  switch (service.id) {
    case 'from-airport':
    case 'to-airport':
      return calculatePrice.standard()
    case 'canyons':
      return calculatePrice.canyons()
    case 'per-person':
      return calculatePrice.perPerson(passengerCount, isAffiliate)
    case 'hourly':
      return calculatePrice.hourly(hours)
    case 'group':
      return calculatePrice.group()
    default:
      return 0
  }
}

const calculateNightFee = time => {
  if (!time) return 0
  const hour = parseInt(time.split(':')[0], 10)
  return hour >= 23 || hour < 7 ? PRICES.ADDITIONAL_FEES.nightService : 0
}

const calculateTotalPrice = (basePrice = 0, gratuity = 0, extrasTotal = 0, nightFee = 0) => {
  return basePrice + gratuity + extrasTotal + nightFee
}

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
) => ({
  ...state.pricing,
  basePrice,
  gratuity,
  extrasTotal,
  nightFee,
  selectedTipPercentage: tipSettings.selectedTipPercentage,
  customTipAmount: tipSettings.customTipAmount,
  isCustomTip: tipSettings.isCustomTip,
  totalPrice: calculateTotalPrice(basePrice, gratuity, extrasTotal, nightFee),
})

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AFFILIATE_MODE': {
      return {
        ...state,
        isAffiliate: action.payload,
      }
    }

    case 'SET_PICKUP_DETAILS': {
      const newPickupDetails = { ...state.pickupDetails, ...action.payload }
      const nightFee = calculateNightFee(newPickupDetails.time)
      const isCottonwood = newPickupDetails.isCottonwood || state.dropoffDetails.isCottonwood

      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate
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
      const newDropoffDetails = { ...state.dropoffDetails, ...action.payload }
      const isCottonwood = newDropoffDetails.isCottonwood || state.pickupDetails.isCottonwood

      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate
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

    case 'SET_SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      }

    case 'SET_SELECTED_TIME': {
      const nightFee = calculateNightFee(action.payload)
      return {
        ...state,
        selectedTime: action.payload,
        pricing: updatePricingState(state, state.pricing.basePrice, undefined, undefined, nightFee),
      }
    }

    case 'SET_SELECTED_SERVICE': {
      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      const basePrice = calculateBasePrice(
        action.payload,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate
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
      const hours = action.payload
      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        hours,
        isCottonwood,
        state.isAffiliate
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
      const newPassengerDetails = {
        ...state.passengerDetails,
        ...action.payload,
      }

      const isCottonwood = state.pickupDetails.isCottonwood || state.dropoffDetails.isCottonwood
      const basePrice = calculateBasePrice(
        state.selectedService,
        newPassengerDetails.passengers,
        state.pricing.hours,
        isCottonwood,
        state.isAffiliate
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
      const { gratuity, percentage, customAmount, isCustom } = action.payload

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

    case 'SET_DISTANCE_DURATION':
      return {
        ...state,
        distance: action.payload.distance,
        duration: action.payload.duration,
      }

    case 'SET_BOOKING_NUMBER':
      return {
        ...state,
        bookingNumber: action.payload,
      }

    case 'RESET_BOOKING':
      return {
        ...initialState,
        isAffiliate: state.isAffiliate, // Preserve affiliate status on reset
      }

    default:
      return state
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const dispatchAction = type => payload => dispatch({ type, payload })

  const value = {
    ...state,
    setPickupDetails: dispatchAction('SET_PICKUP_DETAILS'),
    setDropoffDetails: dispatchAction('SET_DROPOFF_DETAILS'),
    setSelectedDate: dispatchAction('SET_SELECTED_DATE'),
    setSelectedTime: dispatchAction('SET_SELECTED_TIME'),
    setSelectedService: dispatchAction('SET_SELECTED_SERVICE'),
    setServiceHours: dispatchAction('SET_SERVICE_HOURS'),
    setSelectedExtras: dispatchAction('SET_SELECTED_EXTRAS'),
    setPassengerDetails: dispatchAction('SET_PASSENGER_DETAILS'),
    setDistanceAndDuration: dispatchAction('SET_DISTANCE_DURATION'),
    updatePricing: dispatchAction('UPDATE_PRICING'),
    setBookingNumber: dispatchAction('SET_BOOKING_NUMBER'),
    resetBooking: () => dispatch({ type: 'RESET_BOOKING' }),
    updateTipSettings: dispatchAction('UPDATE_TIP_SETTINGS'),
    setAffiliateMode: dispatchAction('SET_AFFILIATE_MODE'),
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
