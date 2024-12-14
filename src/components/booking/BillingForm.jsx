import { useFormFocus } from "@/hooks/useFormFocus";
import { useState } from "react";

export default function BillingForm({ onSubmit, loading }) {
	const [errors, setErrors] = useState({});
	const [focused, setFocused] = useState({});
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		company: "",
		address: "",
		country: "",
		city: "",
		zipCode: "",
		email: "",
	});
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

	useFormFocus();

	const handleFocus = (name) => {
		setFocused((prev) => ({ ...prev, [name]: true }));
	};

	const handleBlur = (name) => {
		if (!formData[name]) {
			setFocused((prev) => ({ ...prev, [name]: false }));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};
		if (!formData.firstName) newErrors.firstName = "First name is required";
		if (!formData.lastName) newErrors.lastName = "Last name is required";
		if (!formData.address) newErrors.address = "Address is required";
		if (!formData.country) newErrors.country = "Country is required";
		if (!formData.city) newErrors.city = "City is required";
		if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
		if (!acceptedTerms)
			newErrors.terms = "You must accept the terms and conditions";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		onSubmit({
			...formData,
			newsletter: subscribeNewsletter,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="form-comment">
			<h3 className="heading-24-medium color-text mb-30">Billing Address</h3>

			<div className="row">
				<div className="col-lg-6">
					<div
						className={`form-group ${errors.firstName ? "has-error" : ""} ${
							focused.firstName || formData.firstName ? "focused" : ""
						}`}
					>
						<label className="form-label">First Name *</label>
						<input
							className={`form-control ${formData.firstName ? "filled" : ""}`}
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							onFocus={() => handleFocus("firstName")}
							onBlur={() => handleBlur("firstName")}
						/>
						{errors.firstName && (
							<div className="error-message">{errors.firstName}</div>
						)}
					</div>
				</div>

				<div className="col-lg-6">
					<div
						className={`form-group ${errors.lastName ? "has-error" : ""} ${
							focused.lastName || formData.lastName ? "focused" : ""
						}`}
					>
						<label className="form-label">Last Name *</label>
						<input
							className={`form-control ${formData.lastName ? "filled" : ""}`}
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							onFocus={() => handleFocus("lastName")}
							onBlur={() => handleBlur("lastName")}
						/>
						{errors.lastName && (
							<div className="error-message">{errors.lastName}</div>
						)}
					</div>
				</div>

				<div className="col-lg-12">
					<div
						className={`form-group ${
							focused.company || formData.company ? "focused" : ""
						}`}
					>
						<label className="form-label">Company</label>
						<input
							className={`form-control ${formData.company ? "filled" : ""}`}
							name="company"
							value={formData.company}
							onChange={handleChange}
							onFocus={() => handleFocus("company")}
							onBlur={() => handleBlur("company")}
						/>
					</div>
				</div>

				<div className="col-lg-12">
					<div
						className={`form-group ${errors.address ? "has-error" : ""} ${
							focused.address || formData.address ? "focused" : ""
						}`}
					>
						<label className="form-label">Address *</label>
						<input
							className={`form-control ${formData.address ? "filled" : ""}`}
							name="address"
							value={formData.address}
							onChange={handleChange}
							onFocus={() => handleFocus("address")}
							onBlur={() => handleBlur("address")}
						/>
						{errors.address && (
							<div className="error-message">{errors.address}</div>
						)}
					</div>
				</div>

				<div className="col-lg-4">
					<div
						className={`form-group ${errors.country ? "has-error" : ""} ${
							focused.country || formData.country ? "focused" : ""
						}`}
					>
						<label className="form-label">Country *</label>
						<select
							className={`form-control ${formData.country ? "filled" : ""}`}
							name="country"
							value={formData.country}
							onChange={handleChange}
							onFocus={() => handleFocus("country")}
							onBlur={() => handleBlur("country")}
						>
							<option value="" disabled hidden></option>
							<option value="GB">UK</option>
							<option value="US">USA</option>
							<option value="CA">Canada</option>
							<option value="AU">Australia</option>
						</select>
						{errors.country && (
							<div className="error-message">{errors.country}</div>
						)}
					</div>
				</div>

				<div className="col-lg-4">
					<div
						className={`form-group ${errors.city ? "has-error" : ""} ${
							focused.city || formData.city ? "focused" : ""
						}`}
					>
						<label className="form-label">City *</label>
						<input
							className={`form-control ${formData.city ? "filled" : ""}`}
							name="city"
							value={formData.city}
							onChange={handleChange}
							onFocus={() => handleFocus("city")}
							onBlur={() => handleBlur("city")}
						/>
						{errors.city && <div className="error-message">{errors.city}</div>}
					</div>
				</div>

				<div className="col-lg-4">
					<div
						className={`form-group ${errors.zipCode ? "has-error" : ""} ${
							focused.zipCode || formData.zipCode ? "focused" : ""
						}`}
					>
						<label className="form-label">ZIP Code *</label>
						<input
							className={`form-control ${formData.zipCode ? "filled" : ""}`}
							name="zipCode"
							value={formData.zipCode}
							onChange={handleChange}
							onFocus={() => handleFocus("zipCode")}
							onBlur={() => handleBlur("zipCode")}
						/>
						{errors.zipCode && (
							<div className="error-message">{errors.zipCode}</div>
						)}
					</div>
				</div>
			</div>

			<div className="mt-30">
				<div className="mb-20">
					<img
						src="/assets/imgs/page/booking/payment-card.png"
						alt="Accepted payment cards"
					/>
				</div>

				<div className={`mb-15 ${errors.terms ? "has-error" : ""}`}>
					<label className="checkbox-label">
						<input
							type="checkbox"
							checked={acceptedTerms}
							onChange={(e) => setAcceptedTerms(e.target.checked)}
						/>
						<span>
							I accept the Terms & Conditions - Booking Conditions and Privacy
							Policy *
						</span>
					</label>
					{errors.terms && <div className="error-message">{errors.terms}</div>}
				</div>

				<div className="mb-15">
					<label className="checkbox-label">
						<input
							type="checkbox"
							checked={subscribeNewsletter}
							onChange={(e) => setSubscribeNewsletter(e.target.checked)}
						/>
						<span>Subscribe to newsletter (Travel tips and special deals)</span>
					</label>
				</div>
			</div>

			<div className="mt-30 mb-120">
				<button
					type="submit"
					className="btn btn-primary btn-primary-big w-100"
					disabled={loading}
				>
					{loading ? "Processing..." : "Proceed to Payment"}
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
	);
}
