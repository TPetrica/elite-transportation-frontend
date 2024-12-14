import { useState } from "react";
import { useBooking } from "../context/BookingContext";

export const usePassengerDetails = () => {
	const { passengerDetails, setPassengerDetails } = useBooking();
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validatePhone = (phone) => {
		const re = /^\+?[\d\s-]{8,}$/;
		return re.test(phone);
	};

	const validateFields = (fields) => {
		const newErrors = {};

		if (!fields.firstName) newErrors.firstName = "First name is required";
		if (!fields.lastName) newErrors.lastName = "Last name is required";
		if (!fields.email) newErrors.email = "Email is required";
		else if (!validateEmail(fields.email))
			newErrors.email = "Invalid email format";
		if (!fields.phone) newErrors.phone = "Phone number is required";
		else if (!validatePhone(fields.phone))
			newErrors.phone = "Invalid phone format";
		if (!fields.passengers)
			newErrors.passengers = "Number of passengers is required";
		if (!fields.luggage)
			newErrors.luggage = "Number of luggage items is required";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (formData) => {
		if (validateFields(formData)) {
			setPassengerDetails(formData);
			return true;
		}
		return false;
	};

	return {
		passengerDetails,
		errors,
		handleSubmit,
	};
};
