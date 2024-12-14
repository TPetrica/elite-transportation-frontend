import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
	const [formData, setFormData] = useState({
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		userName: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { register } = useAuth();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const validateForm = () => {
		if (
			!formData.email ||
			!formData.password ||
			!formData.userName ||
			!formData.phone
		) {
			setError("All fields are required");
			return false;
		}
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return false;
		}
		if (formData.password.length < 8) {
			setError("Password must be at least 8 characters");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			setError("");
			setLoading(true);

			await register({
				email: formData.email,
				password: formData.password,
				name: formData.userName,
				phone: formData.phone,
			});

			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create account");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="section mt-120 mb-100">
			<div className="container-sub">
				<div className="text-center">
					<h2 className="heading-44-medium wow fadeInUp">Create Account</h2>
					<p className="color-text text-14 wow fadeInUp">
						Create your account to access all features.
					</p>
					{error && <p className="text-danger wow fadeInUp">{error}</p>}
				</div>
				<div className="box-login mt-70">
					<div className="form-contact form-comment wow fadeInUp">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-12">
									<div
										className={`form-group ${
											formData.userName ? "focused" : ""
										}`}
									>
										<label className="form-label" htmlFor="userName">
											Username
										</label>
										<input
											className={`form-control ${
												formData.userName ? "filled" : ""
											}`}
											id="userName"
											type="text"
											value={formData.userName}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div
										className={`form-group ${formData.email ? "focused" : ""}`}
									>
										<label className="form-label" htmlFor="email">
											Email
										</label>
										<input
											className={`form-control ${
												formData.email ? "filled" : ""
											}`}
											id="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div
										className={`form-group ${
											formData.password ? "focused" : ""
										}`}
									>
										<label className="form-label" htmlFor="password">
											Password
										</label>
										<input
											className={`form-control ${
												formData.password ? "filled" : ""
											}`}
											id="password"
											type="password"
											value={formData.password}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div
										className={`form-group ${
											formData.confirmPassword ? "focused" : ""
										}`}
									>
										<label className="form-label" htmlFor="confirmPassword">
											Confirm Password
										</label>
										<input
											className={`form-control ${
												formData.confirmPassword ? "filled" : ""
											}`}
											id="confirmPassword"
											type="password"
											value={formData.confirmPassword}
											onChange={handleChange}
											required
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div
										className={`form-group ${formData.phone ? "focused" : ""}`}
									>
										<label className="form-label" htmlFor="phone">
											Phone
										</label>
										<input
											className={`form-control ${
												formData.phone ? "filled" : ""
											}`}
											id="phone"
											type="tel"
											value={formData.phone}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="col-lg-12">
									<button
										className="btn btn-primary w-100"
										type="submit"
										disabled={loading}
									>
										{loading ? "Creating Account..." : "Create Account"}
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

								<div className="col-lg-12">
									<div className="text-or-box">
										<span className="text-or">OR</span>
									</div>
									<div className="mb-20">
										<button
											className="btn btn-login-google w-100"
											onClick={() => {
												/* Implement Google signup */
											}}
											type="button"
										>
											Continue with Google
										</button>
									</div>
									<div className="mb-20">
										<button
											className="btn btn-login-facebook w-100"
											onClick={() => {
												/* Implement Facebook signup */
											}}
											type="button"
										>
											Continue with Facebook
										</button>
									</div>
									<div className="mb-20">
										<button
											className="btn btn-login-apple w-100"
											onClick={() => {
												/* Implement Apple signup */
											}}
											type="button"
										>
											Continue with Apple
										</button>
									</div>
								</div>
								<div className="mt-0 text-center">
									<span className="text-14-medium color-text">
										Already a Member?{" "}
									</span>
									<Link to="/login" className="text-14-medium color-text">
										Login
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
