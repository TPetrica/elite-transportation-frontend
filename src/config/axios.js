import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://localhost:3000/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Check if error is 401 and we haven't retried yet
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				if (!refreshToken) {
					throw new Error("No refresh token available");
				}

				const response = await axios.post(
					"http://localhost:3000/v1/auth/refresh-tokens",
					{ refreshToken },
					{ skipAuthRefresh: true } // Prevent infinite loop
				);

				const { access, refresh } = response.data;
				localStorage.setItem("accessToken", access.token);
				localStorage.setItem("refreshToken", refresh.token);

				// Update header for future requests
				apiClient.defaults.headers.common[
					"Authorization"
				] = `Bearer ${access.token}`;
				// Update current request
				originalRequest.headers.Authorization = `Bearer ${access.token}`;

				return apiClient(originalRequest);
			} catch (err) {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");
				window.location.href = "/login";
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	}
);

export default apiClient;
