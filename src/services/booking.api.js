import apiClient from "../config/axios";

const BookingAPI = {
	// Vehicle-related endpoints
	calculateVehiclePrice: (id, distance) =>
		apiClient.get(`/vehicles/${id}/price?distance=${distance}`),

	// Extra items endpoints
	getExtras: (category) => apiClient.get("/extras", { params: { category } }),
	calculateExtrasPrice: (extras) =>
		apiClient.post("/extras/calculate-price", { extras }),

	// Booking process endpoints
	createBooking: (bookingData) => apiClient.post("/bookings", bookingData),
	getBookingByNumber: (bookingNumber) =>
		apiClient.get(`/bookings/number/${bookingNumber}`),
	getUserBookings: () => apiClient.get("/bookings/user/bookings"),
	attachBookingToUser: (bookingNumber) =>
		apiClient.post(`/bookings/attach/${bookingNumber}`),
	cancelBooking: (bookingId) => apiClient.post(`/bookings/${bookingId}/cancel`),

	// Stripe payment intent
	createPaymentIntent: (amount, currency = "usd") =>
		apiClient.post("/payments/create-intent", { amount, currency }),
};

export default BookingAPI;
