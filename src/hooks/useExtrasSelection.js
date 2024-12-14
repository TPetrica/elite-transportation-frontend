import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import ExtraService from "../services/extra.service";

export const useExtrasSelection = () => {
	const [extras, setExtras] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setSelectedExtras } = useBooking();

	useEffect(() => {
		const fetchExtras = async () => {
			setLoading(true);
			try {
				const result = await ExtraService.getExtras();
				if (result.success) {
					const formattedExtras = result.data.map((extra) => ({
						...extra,
						quantity: 1,
						selected: false,
					}));
					setExtras(formattedExtras);
				} else {
					setError(result.error);
				}
			} catch (err) {
				setError("Failed to fetch extras");
			} finally {
				setLoading(false);
			}
		};

		fetchExtras();
	}, []);

	const handleQuantityChange = async (extraId, quantity) => {
		const updatedExtras = extras.map((extra) =>
			extra.id === extraId ? { ...extra, quantity } : extra
		);
		setExtras(updatedExtras);

		const selectedExtras = updatedExtras.filter(
			(extra) => extra.quantity > 0 || extra.selected
		);

		const result = await ExtraService.calculateExtrasPrice(
			ExtraService.formatExtrasForApi(selectedExtras)
		);

		if (result.success) {
			setSelectedExtras(selectedExtras);
		}
	};

	const handleExtraSelect = async (extraId) => {
		const updatedExtras = extras.map((extra) =>
			extra.id === extraId ? { ...extra, selected: !extra.selected } : extra
		);
		setExtras(updatedExtras);

		const selectedExtras = updatedExtras.filter(
			(extra) => extra.quantity > 0 || extra.selected
		);

		const result = await ExtraService.calculateExtrasPrice(
			ExtraService.formatExtrasForApi(selectedExtras)
		);

		if (result.success) {
			setSelectedExtras(selectedExtras);
		}
	};

	return {
		extras,
		loading,
		error,
		handleQuantityChange,
		handleExtraSelect,
	};
};
