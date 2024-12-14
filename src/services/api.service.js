import apiClient from "../config/axios";

const ApiService = {
	setAuthHeader() {
		const token = localStorage.getItem("accessToken");
		if (token) {
			apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	},

	removeAuthHeader() {
		delete apiClient.defaults.headers.common["Authorization"];
	},

	get(resource) {
		return apiClient.get(resource);
	},

	post(resource, data) {
		return apiClient.post(resource, data);
	},

	put(resource, data) {
		return apiClient.put(resource, data);
	},

	delete(resource) {
		return apiClient.delete(resource);
	},

	customRequest(config) {
		return apiClient(config);
	},
};

export default ApiService;
