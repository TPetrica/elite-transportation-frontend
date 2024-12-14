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
		selectedVehicle,
		selectedDate,
		selectedTime,
	} = useBooking();

	const [formData, setFormData] = useState({
		firstName: existingDetails?.firstName || "",
		lastName: existingDetails?.lastName || "",
		email: existingDetails?.email || "",
		phone: existingDetails?.phone || "",
		passengers: existingDetails?.passengers || "",
		luggage: existingDetails?.luggage || "",
		notes: existingDetails?.notes || "",
	});
	const [focused, setFocused] = useState({});
	const [errors, setErrors] = useState({});

	useFormFocus();

	useEffect(() => {
		if (!selectedVehicle) {
			navigate("/booking-vehicle");
			return;
		}

		if (!selectedDate || !selectedTime) {
			navigate("/booking-time");
			return;
		}
	}, []);

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
		if (!formData.passengers)
			newErrors.passengers = "Please select number of passengers";
		if (!formData.luggage)
			newErrors.luggage = "Please select number of luggage items";

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

	const handleFocus = (name) => {
		setFocused((prev) => ({
			...prev,
			[name]: true,
		}));
	};

	const handleBlur = (name) => {
		if (!formData[name]) {
			setFocused((prev) => ({
				...prev,
				[name]: false,
			}));
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

								<div className="col-lg-6">
									<div
										className={`form-group ${
											errors.passengers ? "has-error" : ""
										}`}
									>
										<label className="form-label" htmlFor="passengers">
											Passengers *
										</label>
										<select
											className="form-control"
											id="passengers"
											name="passengers"
											value={formData.passengers}
											onChange={handleChange}
											onFocus={() => handleFocus("passengers")}
											onBlur={() => handleBlur("passengers")}
										>
											<option value="" disabled hidden></option>
											{[...Array(10)].map((_, i) => (
												<option key={i + 1} value={i + 1}>
													{i + 1}
												</option>
											))}
										</select>
										{errors.passengers && (
											<div className="error-message">{errors.passengers}</div>
										)}
									</div>
								</div>

								<div className="col-lg-6">
									<div
										className={`form-group ${
											errors.luggage ? "has-error" : ""
										}`}
									>
										<label className="form-label" htmlFor="luggage">
											Luggage *
										</label>
										<select
											className="form-control"
											id="luggage"
											name="luggage"
											value={formData.luggage}
											onChange={handleChange}
											onFocus={() => handleFocus("luggage")}
											onBlur={() => handleBlur("luggage")}
										>
											<option value="" disabled hidden></option>
											{[...Array(10)].map((_, i) => (
												<option key={i + 1} value={i + 1}>
													{i + 1}
												</option>
											))}
										</select>
										{errors.luggage && (
											<div className="error-message">{errors.luggage}</div>
										)}
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
										aria-hidden="true"
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

