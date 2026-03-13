import ApiService from "./api.service";

const PaymentService = {
	async createCheckoutSession(paymentData) {
		try {
			const response = await ApiService.post(
				"/payment/create-checkout-session",
				paymentData
			);
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error("Payment error:", error);
			return {
				success: false,
				error:
					error.response?.data?.message || "Failed to create checkout session",
			};
		}
	},

	async getSession(sessionId, accessToken) {
		try {
			const response = await ApiService.get(`/payment/session/${sessionId}`, {
				params: accessToken ? { accessToken } : undefined,
			});
			return {
				success: true,
				data: response.data,
			};
		} catch (error) {
			console.error("Session error:", error);
			return {
				success: false,
				error: error.response?.data?.message || "Failed to retrieve session",
			};
		}
	},
};

export default PaymentService;
