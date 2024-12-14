import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import BookingService from "../services/booking.service";

export const useBookingForm = (step) => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const booking = useBooking();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleVehicleSelect = async (vehicle) => {
		try {
			booking.setSelectedVehicle(vehicle);
			navigate("/booking-passenger");
		} catch (err) {
			setError(err.message);
		}
	};

	const handlePassengerDetailsSubmit = async (passengerDetails) => {
		try {
			booking.setPassengerDetails(passengerDetails);
			navigate("/booking-payment");
		} catch (err) {
			setError(err.message);
		}
	};

	const handlePaymentSubmit = async (paymentDetails) => {
		try {
			setLoading(true);
			const bookingData = BookingService.formatBookingData({
				...booking,
				paymentDetails,
				user: user?.id,
			});

			const result = await BookingService.createBooking(bookingData);
			if (result.success) {
				booking.setBookingNumber(result.data.bookingNumber);
				navigate("/booking-receved");
			} else {
				setError(result.error);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const validateStep = () => {
		switch (step) {
			case "vehicle":
				return !!booking.selectedVehicle;
			case "passenger":
				return !!(
					booking.passengerDetails?.firstName &&
					booking.passengerDetails?.lastName &&
					booking.passengerDetails?.email &&
					booking.passengerDetails?.phone
				);
			case "payment":
				return !!(booking.selectedVehicle && booking.passengerDetails);
			default:
				return false;
		}
	};

	return {
		booking,
		loading,
		error,
		isValid: validateStep(),
		handleVehicleSelect,
		handlePassengerDetailsSubmit,
		handlePaymentSubmit,
		setError,
	};
};
