class BookingService {
	async createBooking(bookingData) {
		try {
			const formattedData = {
				...bookingData,
				payment: {
					method: "card",
					amount: bookingData.pricing.totalPrice,
					currency: "USD",
					status: "pending",
				},
				status: "pending",
			};

			const response = await ApiService.post("/bookings", formattedData);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Failed to create booking",
			};
		}
	}

	async getBookingByNumber(bookingNumber) {
		try {
			const response = await ApiService.get(
				`/bookings/number/${bookingNumber}`
			);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Failed to fetch booking",
			};
		}
	}

	formatBookingData(bookingState) {
		const {
			pickupDetails,
			dropoffDetails,
			selectedVehicle,
			selectedExtras,
			passengerDetails,
			distance,
			duration,
			paymentDetails,
			user,
		} = bookingState;

		return {
			user: user || null,
			email: passengerDetails.email,
			status: "pending",
			pickup: {
				address: pickupDetails.address,
				date: pickupDetails.date,
				time: pickupDetails.time,
				flightNumber: pickupDetails.flightNumber || null,
			},
			dropoff: {
				address: dropoffDetails.address,
			},
			distance: {
				km: distance.km,
				miles: distance.miles,
			},
			duration: duration,
			vehicle: selectedVehicle.id,
			passengerDetails: {
				firstName: passengerDetails.firstName,
				lastName: passengerDetails.lastName,
				phone: passengerDetails.phone,
				passengers: passengerDetails.passengers,
				luggage: passengerDetails.luggage,
				specialRequirements: passengerDetails.notes || null,
			},
			extras: selectedExtras,
			payment: {
				method: paymentDetails.method,
				status: "pending",
				amount: bookingState.pricing.totalPrice,
				currency: "USD",
			},
			billingDetails: {
				firstName: paymentDetails.firstName,
				lastName: paymentDetails.lastName,
				company: paymentDetails.company || null,
				address: paymentDetails.address,
				country: paymentDetails.country,
				city: paymentDetails.city,
				zipCode: paymentDetails.zipCode,
			},
		};
	}
}

export default new BookingService();

