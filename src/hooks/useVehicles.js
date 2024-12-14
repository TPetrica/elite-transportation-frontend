import { useEffect, useState } from "react";
import BookingAPI from "../services/booking.api";

export const useVehicles = () => {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		totalPages: 1,
		totalResults: 0,
	});

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				setLoading(true);
				const response = await BookingAPI.getVehicles();
				setVehicles(response.data.results);
				setPagination({
					page: response.data.page,
					limit: response.data.limit,
					totalPages: response.data.totalPages,
					totalResults: response.data.totalResults,
				});
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch vehicles");
			} finally {
				setLoading(false);
			}
		};

		fetchVehicles();
	}, []);

	const calculatePrice = async (vehicleId, distance) => {
		try {
			const response = await BookingAPI.calculateVehiclePrice(
				vehicleId,
				distance
			);
			return response.data.price;
		} catch (err) {
			throw new Error(
				err.response?.data?.message || "Failed to calculate price"
			);
		}
	};

	return { vehicles, loading, error, calculatePrice, pagination };
};
