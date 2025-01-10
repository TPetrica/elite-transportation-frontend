import { useBooking } from "@/context/BookingContext";
import { useFormFocus } from "@/hooks/useFormFocus";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

export default function PassengerDetails() {
	const navigate = useNavigate();
	const {
		setPassengerDetails,
		passengerDetails: existingDetails,
		selectedService,
		selectedDate,
		selectedTime,
		updatePricing,
	} = useBooking();

	const [formData, setFormData] = useState({
		firstName: existingDetails?.firstName || "",
		lastName: existingDetails?.lastName || "",
		email: existingDetails?.email || "",
		phone: existingDetails?.phone || "",
		passengers: existingDetails?.passengers || "3",
		luggage: existingDetails?.luggage || "4",
		skiBags: existingDetails?.skiBags || "0",
		flightNumber: existingDetails?.flightNumber || "",
		flightTime: existingDetails?.flightTime || "",
		notes: existingDetails?.notes || "",
	});

	const [focused, setFocused] = useState({});
	const [errors, setErrors] = useState({});

	useFormFocus();

	const getMaxValues = () => {
		if (selectedService?.id === "group") {
			return {
				passengers: 7,
				luggage: 4,
				skiBags: 2,
			};
		}
		return {
			passengers: 4,
			luggage: 8,
			skiBags: 4,
		};
	};

	useEffect(() => {
		// Initial price calculation based on existing passenger count
		if (selectedService) {
			updatePricing({
				numPassengers: parseInt(formData.passengers) || 1,
				hours: selectedService?.id === "hourly" ? 2 : undefined,
			});
		}
	}, [selectedService]); // Run when selectedService changes

	useEffect(() => {
		if (!selectedService) {
			navigate("/booking-time");
			return;
		}

		if (!selectedDate || !selectedTime) {
			navigate("/booking-time");
			return;
		}

		// Initial price calculation
		updatePricing({
			numPassengers: parseInt(formData.passengers),
			hours: selectedService?.id === "hourly" ? 2 : undefined,
		});
	}, [selectedService, selectedDate, selectedTime, navigate]);

	const validateForm = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^\+?[\d\s-]{8,}$/;

		if (!formData.firstName.trim())
			newErrors.firstName = "First name is required";
		if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!emailRegex.test(formData.email))
			newErrors.email = "Invalid email format";
		if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
		else if (!phoneRegex.test(formData.phone))
			newErrors.phone = "Invalid phone format";

		if (
			selectedService?.id === "from-airport" ||
			selectedService?.id === "to-airport"
		) {
			if (!formData.flightNumber.trim()) {
				newErrors.flightNumber = "Flight number is required";
			}
			if (!formData.flightTime.trim()) {
				newErrors.flightTime = "Flight time is required";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleQuantityChange = (field, change) => {
		const currentValue = parseInt(formData[field]) || 0;
		const maxValues = getMaxValues();

		const newValue = Math.max(
			0,
			Math.min(currentValue + change, maxValues[field])
		);

		setFormData((prev) => ({
			...prev,
			[field]: String(newValue),
		}));

		// Update pricing when passenger count changes
		if (field === "passengers") {
			// First update the passenger details in the context
			setPassengerDetails({
				...formData,
				[field]: String(newValue),
			});

			// Then update the pricing based on the new passenger count
			updatePricing({
				numPassengers: newValue,
				hours: selectedService?.id === "hourly" ? 2 : undefined,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			setPassengerDetails(formData);
			navigate("/booking-payment");
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<div className="box-row-tab mt-50 mb-50">
			<div className="box-tab-left">
				<div className="box-content-detail">
					<h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
						Passenger Details
					</h3>
					<div className="form-contact form-comment wow fadeInUp">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-6">
									<div
										className={`form-group ${
											errors.firstName ? "has-error" : ""
										}`}
									>
										<label className="form-label" htmlFor="firstName">
											First Name *
										</label>
										<input
											className="form-control"
											id="firstName"
											name="firstName"
											type="text"
											value={formData.firstName}
											onChange={handleChange}
										/>
										{errors.firstName && (
											<div className="error-message">{errors.firstName}</div>
										)}
									</div>
								</div>

								<div className="col-lg-6">
									<div
										className={`form-group ${
											errors.lastName ? "has-error" : ""
										}`}
									>
										<label className="form-label" htmlFor="lastName">
											Last Name *
										</label>
										<input
											className="form-control"
											id="lastName"
											name="lastName"
											type="text"
											value={formData.lastName}
											onChange={handleChange}
										/>
										{errors.lastName && (
											<div className="error-message">{errors.lastName}</div>
										)}
									</div>
								</div>

								<div className="col-lg-6">
									<div
										className={`form-group ${errors.email ? "has-error" : ""}`}
									>
										<label className="form-label" htmlFor="email">
											Email Address *
										</label>
										<input
											className="form-control"
											id="email"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
										/>
										{errors.email && (
											<div className="error-message">{errors.email}</div>
										)}
									</div>
								</div>

								<div className="col-lg-6">
									<div
										className={`form-group ${errors.phone ? "has-error" : ""}`}
									>
										<label className="form-label" htmlFor="phone">
											Phone Number *
										</label>
										<input
											className="form-control"
											id="phone"
											name="phone"
											type="tel"
											value={formData.phone}
											onChange={handleChange}
										/>
										{errors.phone && (
											<div className="error-message">{errors.phone}</div>
										)}
									</div>
								</div>

								{(selectedService?.id === "from-airport" ||
									selectedService?.id === "to-airport") && (
									<>
										<div className="col-lg-6">
											<div
												className={`form-group ${
													errors.flightNumber ? "has-error" : ""
												}`}
											>
												<label className="form-label" htmlFor="flightNumber">
													Flight Number *
												</label>
												<input
													className="form-control"
													id="flightNumber"
													name="flightNumber"
													type="text"
													value={formData.flightNumber}
													onChange={handleChange}
												/>
												{errors.flightNumber && (
													<div className="error-message">
														{errors.flightNumber}
													</div>
												)}
											</div>
										</div>
										<div className="col-lg-6">
											<div
												className={`form-group ${
													errors.flightTime ? "has-error" : ""
												}`}
											>
												<label className="form-label" htmlFor="flightTime">
													{selectedService?.id === "from-airport"
														? "Arrival Time *"
														: "Departure Time *"}
												</label>
												<input
													className="form-control"
													id="flightTime"
													name="flightTime"
													type="time"
													value={formData.flightTime}
													onChange={handleChange}
												/>
												{errors.flightTime && (
													<div className="error-message">
														{errors.flightTime}
													</div>
												)}
											</div>
										</div>
									</>
								)}

								<div className="col-lg-12">
									<div className="row">
										<div className="col-lg-4">
											<div className="form-group">
												<label className="form-label">
													Number of Passengers (Max: {getMaxValues().passengers}
													)
												</label>
												<div className="quantity-section">
													<button
														type="button"
														className="quantity-button"
														onClick={() =>
															handleQuantityChange("passengers", -1)
														}
													>
														-
													</button>
													<input
														type="text"
														className="quantity-input"
														value={formData.passengers}
														readOnly
													/>
													<button
														type="button"
														className="quantity-button"
														onClick={() =>
															handleQuantityChange("passengers", 1)
														}
													>
														+
													</button>
												</div>
											</div>
										</div>

										<div className="col-lg-4">
											<div className="form-group">
												<label className="form-label">
													Luggage Count (Max: {getMaxValues().luggage})
												</label>
												<div className="quantity-section">
													<button
														type="button"
														className="quantity-button"
														onClick={() => handleQuantityChange("luggage", -1)}
													>
														-
													</button>
													<input
														type="text"
														className="quantity-input"
														value={formData.luggage}
														readOnly
													/>
													<button
														type="button"
														className="quantity-button"
														onClick={() => handleQuantityChange("luggage", 1)}
													>
														+
													</button>
												</div>
											</div>
										</div>

										<div className="col-lg-4">
											<div className="form-group">
												<label className="form-label">
													Ski/Snowboard Bags (Max: {getMaxValues().skiBags})
												</label>
												<div className="quantity-section">
													<button
														type="button"
														className="quantity-button"
														onClick={() => handleQuantityChange("skiBags", -1)}
													>
														-
													</button>
													<input
														type="text"
														className="quantity-input"
														value={formData.skiBags}
														readOnly
													/>
													<button
														type="button"
														className="quantity-button"
														onClick={() => handleQuantityChange("skiBags", 1)}
													>
														+
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-lg-12">
									<div className="form-group">
										<label className="form-label" htmlFor="notes">
											Notes to driver
										</label>
										<textarea
											className="form-control"
											id="notes"
											name="notes"
											rows="5"
											value={formData.notes}
											onChange={handleChange}
										></textarea>
									</div>
								</div>
							</div>

							<div className="mt-30 mb-120 wow fadeInUp">
								<button
									type="submit"
									className="btn btn-primary btn-primary-big w-100"
								>
									Continue
									<svg
										className="icon-16 ml-5"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
										/>
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<SideBar />
		</div>
	);
}

