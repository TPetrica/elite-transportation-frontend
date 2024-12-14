import { createContext, useContext, useReducer } from "react";

const BookingContext = createContext(null);

const initialState = {
	pickupDetails: {
		address: "",
		coordinates: null,
		date: null,
		time: null,
	},
	dropoffDetails: {
		address: "",
		coordinates: null,
	},
	selectedDate: null,
	selectedTime: null,
	selectedVehicle: null,
	selectedExtras: [],
	passengerDetails: null,
	distance: null,
	duration: null,
	pricing: {
		vehiclePrice: 0,
		extrasPrice: 0,
		totalPrice: 0,
	},
};

const bookingReducer = (state, action) => {
	switch (action.type) {
		case "SET_PICKUP_DETAILS":
			return {
				...state,
				pickupDetails: { ...state.pickupDetails, ...action.payload },
			};
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
		case "SET_SELECTED_TIME":
			return {
				...state,
				selectedTime: action.payload,
			};
		case "SET_SELECTED_VEHICLE":
			return {
				...state,
				selectedVehicle: action.payload,
				pricing: {
					...state.pricing,
					vehiclePrice: action.payload.pricing.basePrice,
					totalPrice:
						action.payload.pricing.basePrice + state.pricing.extrasPrice,
				},
			};
		case "SET_SELECTED_EXTRAS":
			const extrasPrice = action.payload.reduce(
				(total, extra) => total + extra.price * (extra.quantity || 1),
				0
			);
			return {
				...state,
				selectedExtras: action.payload,
				pricing: {
					...state.pricing,
					extrasPrice,
					totalPrice: state.pricing.vehiclePrice + extrasPrice,
				},
			};
		case "SET_PASSENGER_DETAILS":
			return { ...state, passengerDetails: action.payload };
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

	const setSelectedVehicle = (vehicle) => {
		dispatch({ type: "SET_SELECTED_VEHICLE", payload: vehicle });
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
		setSelectedVehicle,
		setSelectedExtras,
		setPassengerDetails,
		setDistanceAndDuration,
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

