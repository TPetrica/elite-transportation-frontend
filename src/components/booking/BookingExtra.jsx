import { useBooking } from "@/context/BookingContext";
import { useFormFocus } from "@/hooks/useFormFocus";
import ExtraService from "@/services/extra.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

export default function BookingExtra() {
	const navigate = useNavigate();
	const {
		selectedService,
		setSelectedExtras,
		setPickupDetails,
		selectedExtras,
	} = useBooking();

	const [quantityItems, setQuantityItems] = useState([]);
	const [selectItems, setSelectItems] = useState([]);
	const [flightNumber, setFlightNumber] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useFormFocus();

	useEffect(() => {
		if (!selectedService) {
			navigate("/booking-time");
			return;
		}
	}, [selectedService, navigate]);

	const updateContextExtras = (newQuantityItems, newSelectItems) => {
		const selectedQuantityItems = newQuantityItems.filter(
			(item) => item.quantity > 0
		);
		const selectedSelectionItems = newSelectItems.filter(
			(item) => item.selected
		);

		const formattedExtras = [
			...selectedQuantityItems.map((item) => ({
				item: item.id,
				quantity: item.quantity,
				price: item.price,
				name: item.name,
			})),
			...selectedSelectionItems.map((item) => ({
				item: item.id,
				quantity: 1,
				price: item.price,
				name: item.name,
			})),
		];

		setSelectedExtras(formattedExtras);
	};

	useEffect(() => {
		const fetchExtras = async () => {
			try {
				const result = await ExtraService.getExtras();
				if (result.success && result.data) {
					const quantity = result.data
						.filter((extra) => extra.maxQuantity > 1)
						.map((item) => {
							const previousSelection = selectedExtras.find(
								(selected) => selected.item === item.id
							);
							return {
								id: item.id,
								name: item.name,
								price: item.price,
								description: item.description,
								quantity: previousSelection?.quantity || 0,
								maxQuantity: item.maxQuantity,
								type: "quantity",
							};
						});

					const selection = result.data
						.filter((extra) => extra.maxQuantity === 1)
						.map((item) => {
							const previousSelection = selectedExtras.find(
								(selected) => selected.item === item.id
							);
							return {
								id: item.id,
								name: item.name,
								price: item.price,
								description: item.description,
								selected: !!previousSelection,
								type: "selection",
							};
						});

					if (selectedService?.id.includes("airport-transfer")) {
						setFlightNumber("");
					}

					setQuantityItems(quantity);
					setSelectItems(selection);
				} else {
					setError("No extras available");
				}
			} catch (err) {
				console.error("Error fetching extras:", err);
				setError("Failed to load extras");
			} finally {
				setLoading(false);
			}
		};

		fetchExtras();
	}, [selectedService, selectedExtras]);

	const handleQuantity = (qty, i) => {
		if (qty < 0 || qty > quantityItems[i].maxQuantity) return;

		const items = [...quantityItems];
		const item = items[i];
		item.quantity = parseInt(qty);
		items[i] = item;
		setQuantityItems(items);

		updateContextExtras(items, selectItems);
	};

	const handleSelect = (i) => {
		const items = [...selectItems];
		const item = items[i];
		item.selected = !item.selected;
		items[i] = item;
		setSelectItems(items);

		updateContextExtras(quantityItems, items);
	};

	const handleContinue = async () => {
		try {
			if (selectedService?.id.includes("airport-transfer")) {
				setPickupDetails((prev) => ({
					...prev,
					flightNumber: flightNumber.trim(),
				}));
			}

			navigate("/booking-passenger");
		} catch (err) {
			setError("Failed to process extras");
		}
	};

	if (loading) {
		return <div className="loading-spinner">Loading extras...</div>;
	}

	if (error) {
		return <div className="error-message">Error: {error}</div>;
	}

	return (
		<div className="box-row-tab mt-50">
			<div className="box-tab-left">
				<div className="box-content-detail">
					<h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
						Extra Options
					</h3>

					{selectedService?.id.includes("airport-transfer") && (
						<div
							className="form-contact form-comment wow fadeInUp"
							key="flight-form"
						>
							<form onSubmit={(e) => e.preventDefault()}>
								<div className="row">
									<div className="col-lg-12">
										<div className="form-group">
											<label className="form-label" htmlFor="flightNumber">
												Flight number
											</label>
											<input
												className="form-control"
												id="flightNumber"
												name="flightNumber"
												type="text"
												value={flightNumber}
												onChange={(e) => setFlightNumber(e.target.value)}
												placeholder="Enter your flight number"
											/>
										</div>
									</div>
								</div>
							</form>
						</div>
					)}

					<div className="list-extras wow fadeInUp">
						{quantityItems.map((elm) => (
							<div key={`quantity-${elm.id}`} className="item-extra">
								<div className="extra-info">
									<h5 className="text-20-medium color-text mb-5">
										{elm.name} <span className="price">${elm.price}</span>
									</h5>
									<p className="text-14 color-grey">{elm.description}</p>
								</div>
								<div className="extra-quantity">
									<span
										onClick={() =>
											handleQuantity(
												elm.quantity - 1,
												quantityItems.indexOf(elm)
											)
										}
										className="minus"
									>
										{" "}
									</span>
									<input
										className="form-control"
										onChange={(e) =>
											handleQuantity(e.target.value, quantityItems.indexOf(elm))
										}
										type="text"
										value={elm.quantity}
									/>
									<span
										onClick={() =>
											handleQuantity(
												elm.quantity + 1,
												quantityItems.indexOf(elm)
											)
										}
										className="plus"
									></span>
								</div>
							</div>
						))}

						{selectItems.map((elm) => (
							<div key={`selection-${elm.id}`} className="item-extra">
								<div className="extra-info">
									<h5 className="text-20-medium color-text mb-5">
										{elm.name} <span className="price">${elm.price}</span>
									</h5>
									<p className="text-14 color-grey">{elm.description}</p>
								</div>
								<div className="extra-quantity">
									<button
										onClick={() => handleSelect(selectItems.indexOf(elm))}
										className={`btn ${
											elm.selected ? "btn-primary" : "btn-grey"
										} w-100`}
									>
										{elm.selected ? "Selected" : "Select"}
										<svg
											className="icon-16 ml-5"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
											></path>
										</svg>
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="mt-30 mb-120 wow fadeInUp">
						<button
							className="btn btn-primary btn-primary-big w-100"
							onClick={handleContinue}
						>
							Continue
							<svg
								className="icon-16 ml-5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<SideBar />
		</div>
	);
}

