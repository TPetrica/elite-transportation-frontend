import apiClient from "@/config/axios";

class ExtraService {
	async getExtras(filters = {}) {
		try {
			const response = await apiClient.get("/extras", { params: filters });
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Failed to fetch extras",
			};
		}
	}

	async calculateExtrasPrice(extras) {
		try {
			const response = await apiClient.post("/extras/calculate-price", {
				extras,
			});
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			return {
				success: false,
				error:
					error.response?.data?.message || "Failed to calculate extras price",
			};
		}
	}

	formatExtrasForApi(extras) {
		return extras.map((extra) => ({
			item: extra.id,
			quantity: extra.quantity || 1,
			price: extra.price,
		}));
	}
}

export default new ExtraService();

