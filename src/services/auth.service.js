import ApiService from "./api.service";

const AuthService = {
	async login(email, password) {
		try {
			const response = await ApiService.post("/auth/login", {
				email,
				password,
			});
			if (response.data.tokens) {
				this.setTokens(response.data.tokens);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				ApiService.setAuthHeader();
			}
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	async register(userData) {
		try {
			const response = await ApiService.post("/auth/register", userData);
			if (response.data.tokens) {
				this.setTokens(response.data.tokens);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				ApiService.setAuthHeader();
			}
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	async logout() {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			await ApiService.post("/auth/logout", { refreshToken });
		} finally {
			this.clearStorage();
			ApiService.removeAuthHeader();
		}
	},

	async refreshToken() {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			const response = await ApiService.post("/auth/refresh-tokens", {
				refreshToken,
			});
			this.setTokens(response.data);
			ApiService.setAuthHeader();
			return response.data;
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	async forgotPassword(email) {
		try {
			return await ApiService.post("/auth/forgot-password", { email });
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	async resetPassword(token, password) {
		try {
			return await ApiService.post(`/auth/reset-password?token=${token}`, {
				password,
			});
		} catch (error) {
			throw error.response?.data || error;
		}
	},

	getCurrentUser() {
		const userStr = localStorage.getItem("user");
		return userStr ? JSON.parse(userStr) : null;
	},

	setTokens(tokens) {
		localStorage.setItem("accessToken", tokens.access.token);
		localStorage.setItem("refreshToken", tokens.refresh.token);
	},

	clearStorage() {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("user");
	},
};

export default AuthService;
