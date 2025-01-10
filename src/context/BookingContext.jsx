import { createContext, useContext, useReducer } from "react";

const BookingContext = createContext(null);

const PRICES = {
	SUV_1_2: {
		summer: 150,
		winter: 160,
	},
	SUV_3_5: {
		summer: 180,
		winter: 190,
	},
	GROUP: {
		summer: 365,
		winter: 385,
	},
	HOURLY: {
		baseRate: 100,
	},
	ADDITIONAL_FEES: {
		nightService: 20,
		meetAndGreet: 30,
	},
};

const initialState = {
	pickupDetails: {
		address: "",
		coordinates: null,
		date: null,
		time: null,
		flightNumber: "",
		flightTime: "",
		isCustom: false,
	},
	dropoffDetails: {
		address: "",
		coordinates: null,
		isCustom: false,
	},
	selectedDate: null,
	selectedTime: null,
	selectedService: null,
	selectedVehicle: null,
	selectedExtras: [],
	bookingNumber: null,
	passengerDetails: {
		passengers: 1,
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		specialRequests: "",
	},
	distance: null,
	duration: null,
	pricing: {
		basePrice: 0,
		gratuity: 0,
		extrasTotal: 0,
		nightFee: 0,
		totalPrice: 0,
		hours: 2,
	},
	isWinter: false,
};

const calculateNightFee = (time) => {
	if (!time) return 0;
	const hour = parseInt(time.split(":")[0], 10);
	return hour >= 23 || hour < 6 ? PRICES.ADDITIONAL_FEES.nightService : 0;
};

const calculateBasePrice = (
	service,
	numPassengers = 1,
	hours = 2,
	isWinter = false
) => {
	if (!service) return 0;

	const passengerCount = parseInt(numPassengers) || 1;

	switch (service.id) {
		case "from-airport":
		case "to-airport":
			return passengerCount <= 2
				? isWinter
					? PRICES.SUV_1_2.winter
					: PRICES.SUV_1_2.summer
				: isWinter
				? PRICES.SUV_3_5.winter
				: PRICES.SUV_3_5.summer;

		case "round-trip": {
			const singleTripPrice =
				passengerCount <= 2
					? isWinter
						? PRICES.SUV_1_2.winter
						: PRICES.SUV_1_2.summer
					: isWinter
					? PRICES.SUV_3_5.winter
					: PRICES.SUV_3_5.summer;
			return singleTripPrice * 2;
		}

		case "hourly":
			return PRICES.HOURLY.baseRate * Math.max(2, hours);

		case "group":
			return isWinter ? PRICES.GROUP.winter : PRICES.GROUP.summer;

		default:
			return 0;
	}
};

const calculateTotalPrice = (
	basePrice = 0,
	gratuity = 0,
	extrasTotal = 0,
	nightFee = 0
) => {
	return basePrice + gratuity + extrasTotal + nightFee;
};

const bookingReducer = (state, action) => {
	switch (action.type) {
		case "SET_PICKUP_DETAILS": {
			const newPickupDetails = { ...state.pickupDetails, ...action.payload };
			const nightFee = calculateNightFee(newPickupDetails.time);

			let isWinter = state.isWinter;
			if (newPickupDetails.date) {
				const month = new Date(newPickupDetails.date).getMonth();
				isWinter = month >= 10 || month <= 3;
			}

			const basePrice = calculateBasePrice(
				state.selectedService,
				state.passengerDetails.passengers,
				state.pricing.hours,
				isWinter
			);

			const totalPrice = calculateTotalPrice(
				basePrice,
				state.pricing.gratuity,
				state.pricing.extrasTotal,
				nightFee
			);

			return {
				...state,
				pickupDetails: newPickupDetails,
				isWinter,
				pricing: {
					...state.pricing,
					basePrice,
					nightFee,
					totalPrice,
				},
			};
		}

		case "SET_DROPOFF_DETAILS":
			return {
				...state,
				dropoffDetails: { ...state.dropoffDetails, ...action.payload },
			};

		case "SET_SELECTED_DATE":
			return {
				...state,
				selectedDate: action.payload,
			};

		case "SET_SELECTED_TIME": {
			const nightFee = calculateNightFee(action.payload);
			const totalPrice = calculateTotalPrice(
				state.pricing.basePrice,
				state.pricing.gratuity,
				state.pricing.extrasTotal,
				nightFee
			);

			return {
				...state,
				selectedTime: action.payload,
				pricing: {
					...state.pricing,
					nightFee,
					totalPrice,
				},
			};
		}

		case "SET_SELECTED_SERVICE": {
			const basePrice = calculateBasePrice(
				action.payload,
				state.passengerDetails.passengers,
				state.pricing.hours,
				state.isWinter
			);

			const totalPrice = calculateTotalPrice(
				basePrice,
				state.pricing.gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				selectedService: action.payload,
				pricing: {
					...state.pricing,
					basePrice,
					totalPrice,
				},
			};
		}

		case "SET_SERVICE_HOURS": {
			const hours = Math.max(2, action.payload);
			const basePrice = calculateBasePrice(
				state.selectedService,
				state.passengerDetails.passengers,
				hours,
				state.isWinter
			);

			const totalPrice = calculateTotalPrice(
				basePrice,
				state.pricing.gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				pricing: {
					...state.pricing,
					hours,
					basePrice,
					totalPrice,
				},
			};
		}

		case "SET_SELECTED_EXTRAS": {
			const extrasTotal = action.payload.reduce(
				(total, extra) => total + extra.price * extra.quantity,
				0
			);

			const totalPrice = calculateTotalPrice(
				state.pricing.basePrice,
				state.pricing.gratuity,
				extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				selectedExtras: action.payload,
				pricing: {
					...state.pricing,
					extrasTotal,
					totalPrice,
				},
			};
		}

		case "SET_PASSENGER_DETAILS": {
			const newPassengerDetails = {
				...state.passengerDetails,
				...action.payload,
			};

			// Recalculate base price when passenger count changes
			const basePrice = calculateBasePrice(
				state.selectedService,
				newPassengerDetails.passengers,
				state.pricing.hours,
				state.isWinter
			);

			const totalPrice = calculateTotalPrice(
				basePrice,
				state.pricing.gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				passengerDetails: newPassengerDetails,
				pricing: {
					...state.pricing,
					basePrice,
					totalPrice,
				},
			};
		}

		case "UPDATE_PRICING": {
			const newPricing = { ...state.pricing };

			if ("gratuity" in action.payload) {
				newPricing.gratuity = action.payload.gratuity;
			}
			if ("extrasTotal" in action.payload) {
				newPricing.extrasTotal = action.payload.extrasTotal;
			}
			if ("nightFee" in action.payload) {
				newPricing.nightFee = action.payload.nightFee;
			}

			newPricing.totalPrice = calculateTotalPrice(
				newPricing.basePrice,
				newPricing.gratuity,
				newPricing.extrasTotal,
				newPricing.nightFee
			);

			return {
				...state,
				pricing: newPricing,
			};
		}

		case "SET_DISTANCE_DURATION":
			return {
				...state,
				distance: action.payload.distance,
				duration: action.payload.duration,
			};

		case "SET_BOOKING_NUMBER":
			return {
				...state,
				bookingNumber: action.payload,
			};

		case "RESET_BOOKING":
			return initialState;

		default:
			return state;
	}
};

export const BookingProvider = ({ children }) => {
	const [state, dispatch] = useReducer(bookingReducer, initialState);

	const setPickupDetails = (details) => {
		dispatch({ type: "SET_PICKUP_DETAILS", payload: details });
	};

	const setDropoffDetails = (details) => {
		dispatch({ type: "SET_DROPOFF_DETAILS", payload: details });
	};

	const setSelectedDate = (date) => {
		dispatch({ type: "SET_SELECTED_DATE", payload: date });
	};

	const setSelectedTime = (time) => {
		dispatch({ type: "SET_SELECTED_TIME", payload: time });
	};

	const setSelectedService = (service) => {
		dispatch({ type: "SET_SELECTED_SERVICE", payload: service });
	};

	const setServiceHours = (hours) => {
		dispatch({ type: "SET_SERVICE_HOURS", payload: hours });
	};

	const setSelectedExtras = (extras) => {
		dispatch({ type: "SET_SELECTED_EXTRAS", payload: extras });
	};

	const setPassengerDetails = (details) => {
		dispatch({ type: "SET_PASSENGER_DETAILS", payload: details });
	};

	const setDistanceAndDuration = (data) => {
		dispatch({ type: "SET_DISTANCE_DURATION", payload: data });
	};

	const updatePricing = (details) => {
		dispatch({ type: "UPDATE_PRICING", payload: details });
	};

	const setBookingNumber = (number) => {
		dispatch({ type: "SET_BOOKING_NUMBER", payload: number });
	};

	const resetBooking = () => {
		dispatch({ type: "RESET_BOOKING" });
	};

	const value = {
		...state,
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
	};

	return (
		<BookingContext.Provider value={value}>{children}</BookingContext.Provider>
	);
};

export const useBooking = () => {
	const context = useContext(BookingContext);
	if (!context) {
		throw new Error("useBooking must be used within a BookingProvider");
	}
	return context;
};

