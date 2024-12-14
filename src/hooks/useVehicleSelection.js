import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import VehicleService from "../services/vehicle.service";

export const useVehicleSelection = () => {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { distance, setSelectedVehicle } = useBooking();

	useEffect(() => {
		const fetchVehicles = async () => {
			setLoading(true);
			try {
				const result = await VehicleService.getVehicles();
				if (result.success) {
					setVehicles(result.data);
				} else {
					setError(result.error);
				}
			} catch (err) {
				setError("Failed to fetch vehicles");
			} finally {
				setLoading(false);
			}
		};

		fetchVehicles();
	}, []);

	const calculatePrice = async (vehicleId) => {
		if (!distance?.km) return null;

		const result = await VehicleService.calculatePrice(vehicleId, distance.km);
		return result.success ? result.data.price : null;
	};

	const handleVehicleSelect = async (vehicle) => {
		const price = await calculatePrice(vehicle.id);
		if (price) {
			setSelectedVehicle({
				...vehicle,
				pricing: {
					...vehicle.pricing,
					calculatedPrice: price,
				},
			});
		}
	};

	return {
		vehicles,
		loading,
		error,
		handleVehicleSelect,
	};
};
