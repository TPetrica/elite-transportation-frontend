import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import BookingService from "../services/booking.service";
import PaymentService from "../services/payment.service";

export const usePayment = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [validationErrors, setValidationErrors] = useState({});
	const booking = useBooking();

	const validatePaymentDetails = (details) => {
		const errors = {};

		// Billing details validation
		if (!details.firstName?.trim()) errors.firstName = "First name is required";
		if (!details.lastName?.trim()) errors.lastName = "Last name is required";
		if (!details.address?.trim()) errors.address = "Address is required";
		if (!details.country?.trim()) errors.country = "Country is required";
		if (!details.city?.trim()) errors.city = "City is required";
		if (!details.zipCode?.trim()) errors.zipCode = "ZIP code is required";

		// Card details validation
		if (!details.cardHolderName?.trim())
			errors.cardHolderName = "Card holder name is required";
		if (!details.cardNumber?.trim())
			errors.cardNumber = "Card number is required";
		if (!details.cardNumber?.trim().match(/^\d{16}$/))
			errors.cardNumber = "Invalid card number";
		if (!details.cvv?.trim().match(/^\d{3,4}$/)) errors.cvv = "Invalid CVV";

		return {
			isValid: Object.keys(errors).length === 0,
			errors,
		};
	};

	const processBookingAndPayment = async (paymentDetails) => {
		setLoading(true);
		setError(null);
		setValidationErrors({});

		try {
			// Validate payment details
			const validation = validatePaymentDetails(paymentDetails);
			if (!validation.isValid) {
				setValidationErrors(validation.errors);
				return { success: false };
			}

			// Format payment data
			const paymentData = PaymentService.formatPaymentData(
				paymentDetails,
				booking.pricing.totalPrice
			);

			// Process payment first
			const paymentResult = await PaymentService.processPayment(paymentData);
			if (!paymentResult.success) {
				setError(paymentResult.error);
				return { success: false };
			}

			// Create booking with payment information
			const bookingData = BookingService.formatBookingData({
				...booking,
				paymentDetails: {
					...paymentDetails,
					stripePaymentIntentId: paymentResult.data.paymentIntentId,
				},
			});

			const bookingResult = await BookingService.createBooking(bookingData);
			if (!bookingResult.success) {
				setError(bookingResult.error);
				return { success: false };
			}

			booking.setBookingNumber(bookingResult.data.bookingNumber);
			return { success: true, bookingNumber: bookingResult.data.bookingNumber };
		} catch (err) {
			setError("Payment processing failed. Please try again.");
			return { success: false };
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		validationErrors,
		processBookingAndPayment,
	};
};
