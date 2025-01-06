import { createContext, useContext, useReducer } from "react";

const BookingContext = createContext(null);

// Price constants
const PRICES = {
	SUV_1_2: {
		summer: 175,
		winter: 185,
	},
	SUV_3_4: {
		summer: 190,
		winter: 200,
	},
	GROUP: {
		basePrice: 300,
	},
	HOURLY: {
		baseRate: 100, // per hour, 2 hour minimum
	},
};

const initialState = {
	pickupDetails: {
		address: "",
		coordinates: null,
		date: null,
		time: null,
		flightNumber: null,
		flightTime: null,
	},
	dropoffDetails: {
		address: "",
		coordinates: null,
	},
	selectedDate: null,
	selectedTime: null,
	selectedService: null,
	selectedVehicle: null,
	selectedExtras: [],
	passengerDetails: null,
	distance: null,
	duration: null,
	pricing: {
		basePrice: 0,
		gratuity: 0,
		extrasTotal: 0,
		nightFee: 0,
		totalPrice: 0,
		hours: 2, // Default minimum hours for hourly service
	},
	isWinter: false, // You'll need to set this based on the date
};

const calculateGratuity = (basePrice) => basePrice * 0.2;

const calculateNightFee = (time) => {
	if (!time) return 0;
	const hour = parseInt(time.split(":")[0], 10);
	return hour >= 23 || hour < 7 ? 20 : 0;
};

const calculateBasePrice = (
	service,
	numPassengers,
	hours = 2,
	isWinter = false
) => {
	if (!service) return 0;

	switch (service.id) {
		case "group":
			return PRICES.GROUP.basePrice;

		case "hourly":
			return PRICES.HOURLY.baseRate * Math.max(2, hours); // Minimum 2 hours

		case "round-trip":
			// For round trip, calculate normal fare and double it
			const singleTripPrice =
				numPassengers <= 2
					? isWinter
						? PRICES.SUV_1_2.winter
						: PRICES.SUV_1_2.summer
					: isWinter
					? PRICES.SUV_3_4.winter
					: PRICES.SUV_3_4.summer;
			return singleTripPrice * 2;

		case "from-airport":
		case "to-airport":
			return numPassengers <= 2
				? isWinter
					? PRICES.SUV_1_2.winter
					: PRICES.SUV_1_2.summer
				: isWinter
				? PRICES.SUV_3_4.winter
				: PRICES.SUV_3_4.summer;

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

			// If date is changing, check if it's winter or summer
			let isWinter = state.isWinter;
			if (newPickupDetails.date) {
				const month = new Date(newPickupDetails.date).getMonth();
				isWinter = month >= 10 || month <= 3; // Winter: November through April
			}

			const basePrice = calculateBasePrice(
				state.selectedService,
				state.passengerDetails?.passengers || 1,
				state.pricing.hours,
				isWinter
			);
			const gratuity = calculateGratuity(basePrice);
			const totalPrice = calculateTotalPrice(
				basePrice,
				gratuity,
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
					gratuity,
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
				state.passengerDetails?.passengers || 1,
				state.pricing.hours,
				state.isWinter
			);
			const gratuity = calculateGratuity(basePrice);
			const totalPrice = calculateTotalPrice(
				basePrice,
				gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				selectedService: action.payload,
				pricing: {
					...state.pricing,
					basePrice,
					gratuity,
					totalPrice,
				},
			};
		}

		case "SET_SERVICE_HOURS": {
			const hours = Math.max(2, action.payload); // Ensure minimum 2 hours
			const basePrice = calculateBasePrice(
				state.selectedService,
				state.passengerDetails?.passengers || 1,
				hours,
				state.isWinter
			);
			const gratuity = calculateGratuity(basePrice);
			const totalPrice = calculateTotalPrice(
				basePrice,
				gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				pricing: {
					...state.pricing,
					hours,
					basePrice,
					gratuity,
					totalPrice,
				},
			};
		}

		case "UPDATE_PRICING": {
			const { numPassengers, hours } = action.payload;
			const basePrice = calculateBasePrice(
				state.selectedService,
				numPassengers,
				hours || state.pricing.hours,
				state.isWinter
			);
			const gratuity = calculateGratuity(basePrice);
			const totalPrice = calculateTotalPrice(
				basePrice,
				gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				pricing: {
					...state.pricing,
					basePrice,
					gratuity,
					totalPrice,
				},
			};
		}

		case "SET_SELECTED_EXTRAS": {
			const extrasTotal = action.payload.reduce(
				(total, extra) => total + extra.price * (extra.quantity || 1),
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
			const basePrice = calculateBasePrice(
				state.selectedService,
				parseInt(action.payload.passengers) || 1,
				state.pricing.hours,
				state.isWinter
			);
			const gratuity = calculateGratuity(basePrice);
			const totalPrice = calculateTotalPrice(
				basePrice,
				gratuity,
				state.pricing.extrasTotal,
				state.pricing.nightFee
			);

			return {
				...state,
				passengerDetails: action.payload,
				pricing: {
					...state.pricing,
					basePrice,
					gratuity,
					totalPrice,
				},
			};
		}

		case "SET_DISTANCE_DURATION":
			return {
				...state,
				distance: action.payload.distance,
				duration: action.payload.duration,
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
