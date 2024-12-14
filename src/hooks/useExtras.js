import { useEffect, useState } from "react";
import BookingAPI from "../services/booking.api";

export const useExtras = () => {
	const [quantityItems, setQuantityItems] = useState([]);
	const [selectItems, setSelectItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchExtras = async () => {
			try {
				setLoading(true);
				const response = await BookingAPI.getExtras();
				const extras = response.data.results;

				// Split extras into quantity and selection types
				const quantityExtras = extras
					.filter((extra) => extra.type === "quantity")
					.map((item) => ({ ...item, quantity: 1 }));
				const selectionExtras = extras
					.filter((extra) => extra.type === "selection")
					.map((item) => ({ ...item, selected: false }));

				setQuantityItems(quantityExtras);
				setSelectItems(selectionExtras);
			} catch (err) {
				setError(err.response?.data?.message || "Failed to fetch extras");
			} finally {
				setLoading(false);
			}
		};

		fetchExtras();
	}, []);

	return {
		quantityItems,
		setQuantityItems,
		selectItems,
		setSelectItems,
		loading,
		error,
	};
};
