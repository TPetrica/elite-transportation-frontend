import ApiService from "@/services/api.service";
import moment from "moment";

class CalendarService {
	async getAvailableTimeSlots(date) {
		try {
			// Ensure date is a moment object and format it
			const momentDate = moment.isMoment(date) ? date : moment(date);
			const formattedDate = momentDate.format("YYYY-MM-DD");

			const response = await ApiService.get(
				`/availability/time-slots?date=${formattedDate}`
			);

			return {
				success: true,
				data: response.data.availableSlots,
			};
		} catch (error) {
			console.error("Error fetching slots:", error); // Debug log
			return {
				success: false,
				error:
					error.response?.data?.message ||
					"Failed to fetch available time slots",
			};
		}
	}

	async checkAvailability(date, time) {
		try {
			const momentDate = moment.isMoment(date) ? date : moment(date);
			const formattedDate = momentDate.format("YYYY-MM-DD");

			const response = await ApiService.get(
				`/availability/check?date=${formattedDate}&time=${time}`
			);

			return {
				success: true,
				data: response.data.isAvailable,
			};
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.message ||
					"Failed to check time slot availability",
			};
		}
	}

	formatAvailableSlots(slots) {
		if (!Array.isArray(slots)) {
			console.error("Invalid slots data:", slots); // Debug log
			return [];
		}

		return slots.map((slot) => ({
			time: slot,
			formattedTime: moment(slot, "HH:mm").format("h:mm A"),
		}));
	}
}

export default new CalendarService();

