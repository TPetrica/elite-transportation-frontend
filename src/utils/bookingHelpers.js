/**
 * Helper functions for booking-related operations
 */

export const calculateDistance = (origin, destination) => {
	// This is a simplified example. In a real app, you'd use a mapping service like Google Maps
	return {
		km: 311,
		miles: 194,
	};
};

export const calculateDuration = (distance) => {
	// This is a simplified example. In a real app, you'd use a mapping service
	const hours = Math.floor(distance.km / 80); // Assuming average speed of 80 km/h
	const minutes = Math.round(((distance.km % 80) / 80) * 60);
	return `${hours}h ${minutes}m`;
};

export const validateBookingStep = (step, bookingData) => {
	switch (step) {
		case "vehicle":
			return !!(
				bookingData.pickupDetails &&
				bookingData.dropoffDetails &&
				bookingData.selectedVehicle
			);

		case "extra":
			return true; // Extras are optional

		case "passenger":
			return !!(
				bookingData.passengerDetails?.firstName &&
				bookingData.passengerDetails?.lastName &&
				bookingData.passengerDetails?.email &&
				bookingData.passengerDetails?.phone
			);

		case "payment":
			return !!(
				bookingData.selectedVehicle &&
				bookingData.passengerDetails &&
				bookingData.pricing?.totalPrice > 0
			);

		default:
			return false;
	}
};

export const getEstimatedPrice = (vehicle, distance, extras = []) => {
	if (!vehicle || !distance) return 0;

	const basePrice = vehicle.pricing.basePrice;
	const distancePrice = vehicle.pricing.pricePerKm * distance.km;
	const extrasPrice = extras.reduce(
		(total, extra) => total + extra.price * (extra.quantity || 1),
		0
	);

	return basePrice + distancePrice + extrasPrice;
};

export const formatBookingDate = (date) => {
	if (!date) return "";
	return new Date(date).toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "2-digit",
	});
};

export const formatBookingTime = (time) => {
	if (!time) return "";
	return time.replace(/:/g, " : ");
};

export const formatBookingStatus = (status) => {
	const statusMap = {
		pending: "Pending",
		confirmed: "Confirmed",
		cancelled: "Cancelled",
		completed: "Completed",
	};
	return statusMap[status] || status;
};

export const getBookingStatusColor = (status) => {
	const colorMap = {
		pending: "warning",
		confirmed: "primary",
		cancelled: "danger",
		completed: "success",
	};
	return colorMap[status] || "secondary";
};
