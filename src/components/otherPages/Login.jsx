import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
	const [emailValue, setEmailValue] = useState("");
	const [passwordValue, setPasswordValue] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!emailValue || !passwordValue) {
			setError("Please fill in all fields");
			return;
		}

		try {
			setError("");
			setLoading(true);
			await login(emailValue, passwordValue);
			navigate("/");
		} catch (err) {
			setError(err.response?.data?.message || "Failed to login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="section mt-120 mb-100">
			<div className="container-sub">
				<div className="text-center">
					<h2 className="heading-44-medium wow fadeInUp">Sign in</h2>
					<p className="color-text text-14 wow fadeInUp">
						Sign in with this account across the following sites.
					</p>
					{error && <p className="text-danger wow fadeInUp">{error}</p>}
				</div>
				<div className="box-login mt-70">
					<div className="form-contact form-comment wow fadeInUp">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-lg-12">
									<div className={`form-group ${emailValue ? "focused" : ""}`}>
										<label className="form-label" htmlFor="email">
											Email
										</label>
										<input
											className={`form-control ${emailValue ? "filled" : ""}`}
											id="email"
											type="email"
											value={emailValue}
											onChange={(e) => setEmailValue(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div
										className={`form-group ${passwordValue ? "focused" : ""}`}
									>
										<label className="form-label" htmlFor="password">
											Password
										</label>
										<input
											className={`form-control ${
												passwordValue ? "filled" : ""
											}`}
											id="password"
											type="password"
											value={passwordValue}
											onChange={(e) => setPasswordValue(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="mb-20">
										<div className="d-flex justify-content-between">
											<label className="text-14 color-text">
												<input
													className="cb-rememberme"
													type="checkbox"
													checked={rememberMe}
													onChange={(e) => setRememberMe(e.target.checked)}
												/>
												Remember me{" "}
											</label>
											<Link
												to="/forgot-password"
												className="text-14 color-text"
											>
												Lost your password?
											</Link>
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<button
										className="btn btn-primary w-100"
										type="submit"
										disabled={loading}
									>
										{loading ? "Signing in..." : "Sign in"}
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
									{/* <div className="mb-20">
										<button
											className="btn btn-login-google w-100"
											onClick={() => {
											}}
										>
											Continue with Google
										</button>
									</div>
									<div className="mb-20">
										<button
											className="btn btn-login-facebook w-100"
											onClick={() => {
											}}
										>
											Continue with Facebook
										</button>
									</div>
									<div className="mb-20">
										<button
											className="btn btn-login-apple w-100"
											onClick={() => {
											}}
										>
											Continue with Apple
										</button>
									</div> */}
								</div>
								<div className="mt-0 text-center">
									<span className="text-14-medium color-text">
										Not signed up?{" "}
									</span>
									<Link to="/register" className="text-14-medium color-text">
										Create an account
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

