import { useCallback, useState } from "react";

export const useDistanceMatrix = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const calculateDistance = useCallback(async (origin, destination) => {
		if (!window.google || !origin?.coordinates || !destination?.coordinates) {
			return null;
		}

		setLoading(true);
		setError(null);

		try {
			const service = new window.google.maps.DistanceMatrixService();

			const response = await service.getDistanceMatrix({
				origins: [
					{
						lat: origin.coordinates.lat,
						lng: origin.coordinates.lng,
					},
				],
				destinations: [
					{
						lat: destination.coordinates.lat,
						lng: destination.coordinates.lng,
					},
				],
				travelMode: "DRIVING",
				unitSystem: window.google.maps.UnitSystem.METRIC,
			});

			if (response.rows[0]?.elements[0]?.status === "OK") {
				const distanceValue = response.rows[0].elements[0].distance;
				const durationValue = response.rows[0].elements[0].duration;

				return {
					distance: {
						km: Math.round(distanceValue.value / 1000),
						miles: Math.round(distanceValue.value / 1609.34),
					},
					duration: durationValue.text,
				};
			}

			return null;
		} catch (err) {
			setError(err);
			return null;
		} finally {
			setLoading(false);
		}
	}, []);

	return { calculateDistance, loading, error };
};
