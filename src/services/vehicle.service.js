import apiClient from "@/config/axios";

class VehicleService {
	async getVehicles(filters = {}) {
		try {
			const response = await apiClient.get("/vehicles", { params: filters });
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Failed to fetch vehicles",
			};
		}
	}

	async getVehicleById(vehicleId) {
		try {
			const response = await apiClient.get(`/vehicles/${vehicleId}`);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.message || "Failed to fetch vehicle details",
			};
		}
	}

	async calculatePrice(vehicleId, distance) {
		try {
			const response = await apiClient.get(`/vehicles/${vehicleId}/price`, {
				params: { distance },
			});
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Failed to calculate price",
			};
		}
	}
}

export default new VehicleService();

