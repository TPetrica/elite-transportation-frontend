import { createContext, useContext, useReducer } from 'react'

const BookingContext = createContext(null)

const PRICES = {
  SUV: {
    base: 100,
    gasSurcharge: 10,
    winterSurcharge: 10,
  },
  CANYONS: {
    base: 130,
  },
  PER_PERSON: {
    base: 65,
    minPersons: 2,
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
  },
  dropoffDetails: {
    address: '',
    coordinates: null,
    isCustom: false,
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
}

const calculatePrice = {
  standard: isWinter => {
    const price = PRICES.SUV.base + PRICES.SUV.gasSurcharge
    return isWinter ? price + PRICES.SUV.winterSurcharge : price
  },
  canyons: () => PRICES.CANYONS.base,
  perPerson: passengers => {
    const effectivePassengers = Math.max(passengers, PRICES.PER_PERSON.minPersons)
    return effectivePassengers * PRICES.PER_PERSON.base
  },
  hourly: hours => PRICES.HOURLY.base * hours,
  group: () => 0, // Group pricing requires inquiry
}

const calculateBasePrice = (service, numPassengers = 1, hours = 1, isWinter = false) => {
  if (!service) return 0

  const passengerCount = parseInt(numPassengers) || 1

  switch (service.id) {
    case 'from-airport':
    case 'to-airport':
      return calculatePrice.standard(isWinter)
    case 'canyons':
      return calculatePrice.canyons()
    case 'per-person':
      return calculatePrice.perPerson(passengerCount)
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
  return hour >= 23 || hour < 6 ? PRICES.ADDITIONAL_FEES.nightService : 0
}

const calculateTotalPrice = (basePrice = 0, gratuity = 0, extrasTotal = 0, nightFee = 0) => {
  return basePrice + gratuity + extrasTotal + nightFee
}

const updatePricingState = (
  state,
  basePrice,
  gratuity = state.pricing.gratuity,
  extrasTotal = state.pricing.extrasTotal,
  nightFee = state.pricing.nightFee
) => ({
  ...state.pricing,
  basePrice,
  gratuity,
  extrasTotal,
  nightFee,
  totalPrice: calculateTotalPrice(basePrice, gratuity, extrasTotal, nightFee),
})

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PICKUP_DETAILS': {
      const newPickupDetails = { ...state.pickupDetails, ...action.payload }
      const nightFee = calculateNightFee(newPickupDetails.time)
      const isWinter = newPickupDetails.date
        ? new Date(newPickupDetails.date).getMonth() >= 10 ||
          new Date(newPickupDetails.date).getMonth() <= 3
        : state.isWinter

      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        state.pricing.hours,
        isWinter
      )

      return {
        ...state,
        pickupDetails: newPickupDetails,
        isWinter,
        pricing: updatePricingState(state, basePrice, undefined, undefined, nightFee),
      }
    }

    case 'SET_DROPOFF_DETAILS':
      return {
        ...state,
        dropoffDetails: { ...state.dropoffDetails, ...action.payload },
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
      const basePrice = calculateBasePrice(
        action.payload,
        state.passengerDetails.passengers,
        state.pricing.hours,
        state.isWinter
      )

      return {
        ...state,
        selectedService: action.payload,
        pricing: updatePricingState(state, basePrice),
      }
    }

    case 'SET_SERVICE_HOURS': {
      const hours = action.payload
      const basePrice = calculateBasePrice(
        state.selectedService,
        state.passengerDetails.passengers,
        hours,
        state.isWinter
      )

      return {
        ...state,
        pricing: {
          ...updatePricingState(state, basePrice),
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

      const basePrice = calculateBasePrice(
        state.selectedService,
        newPassengerDetails.passengers,
        state.pricing.hours,
        state.isWinter
      )

      return {
        ...state,
        passengerDetails: newPassengerDetails,
        pricing: updatePricingState(state, basePrice),
      }
    }

    case 'UPDATE_PRICING':
    case 'UPDATE_TIP_SETTINGS': {
      const updates =
        action.type === 'UPDATE_TIP_SETTINGS'
          ? { gratuity: action.payload.gratuity }
          : action.payload

      return {
        ...state,
        pricing: {
          ...state.pricing,
          ...updates,
          totalPrice: calculateTotalPrice(
            state.pricing.basePrice,
            updates.gratuity ?? state.pricing.gratuity,
            updates.extrasTotal ?? state.pricing.extrasTotal,
            updates.nightFee ?? state.pricing.nightFee
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
      return initialState

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
