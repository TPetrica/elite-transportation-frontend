import { useAuth } from "@/context/AuthContext";
import { Modal, Tabs } from "antd";
import { useState } from "react";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

const AuthModal = ({ open, onClose }) => {
	const [activeTab, setActiveTab] = useState("1");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { login, register } = useAuth();

	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	const [registerForm, setRegisterForm] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		userName: "",
		phone: "",
	});

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!loginForm.email || !loginForm.password) {
			setError("Please fill in all fields");
			return;
		}

		try {
			setError("");
			setLoading(true);
			await login(loginForm.email, loginForm.password);
			onClose();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to login");
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		if (
			!registerForm.email ||
			!registerForm.password ||
			!registerForm.userName ||
			!registerForm.phone
		) {
			setError("All fields are required");
			return;
		}
		if (registerForm.password !== registerForm.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			setError("");
			setLoading(true);
			await register({
				email: registerForm.email,
				password: registerForm.password,
				name: registerForm.userName,
				phone: registerForm.phone,
			});
			onClose();
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create account");
		} finally {
			setLoading(false);
		}
	};

	const items = [
		{
			key: "1",
			label: "Sign In",
			children: (
				<form onSubmit={handleLogin} className="form-contact">
					<div className="form-group">
						<label className="form-label" htmlFor="loginEmail">
							Email
						</label>
						<input
							className="form-control"
							id="loginEmail"
							type="email"
							value={loginForm.email}
							onChange={(e) =>
								setLoginForm({ ...loginForm, email: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="loginPassword">
							Password
						</label>
						<input
							className="form-control"
							id="loginPassword"
							type="password"
							value={loginForm.password}
							onChange={(e) =>
								setLoginForm({ ...loginForm, password: e.target.value })
							}
							required
						/>
					</div>
					<div className="d-flex justify-content-between align-items-center mb-4">
						<label className="text-14 color-text">
							<input
								type="checkbox"
								checked={loginForm.rememberMe}
								onChange={(e) =>
									setLoginForm({ ...loginForm, rememberMe: e.target.checked })
								}
							/>
							Remember me
						</label>
						<button type="button" className="btn btn-link" onClick={() => {}}>
							Forgot password?
						</button>
					</div>
					<button
						className="btn btn-primary w-100 mb-4"
						type="submit"
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign in"}
					</button>
					<div className="social-auth-buttons">
						<div className="d-flex justify-content-center gap-3">
							<button type="button" className="btn btn-icon">
								<FaGoogle />
							</button>
							<button type="button" className="btn btn-icon">
								<FaFacebook />
							</button>
							<button type="button" className="btn btn-icon">
								<FaApple />
							</button>
						</div>
					</div>
				</form>
			),
		},
		{
			key: "2",
			label: "Sign Up",
			children: (
				<form onSubmit={handleRegister} className="form-contact">
					<div className="form-group">
						<label className="form-label" htmlFor="registerUsername">
							Username
						</label>
						<input
							className="form-control"
							id="registerUsername"
							type="text"
							value={registerForm.userName}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, userName: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="registerEmail">
							Email
						</label>
						<input
							className="form-control"
							id="registerEmail"
							type="email"
							value={registerForm.email}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, email: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="registerPhone">
							Phone
						</label>
						<input
							className="form-control"
							id="registerPhone"
							type="tel"
							value={registerForm.phone}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, phone: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="registerPassword">
							Password
						</label>
						<input
							className="form-control"
							id="registerPassword"
							type="password"
							value={registerForm.password}
							onChange={(e) =>
								setRegisterForm({ ...registerForm, password: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group">
						<label className="form-label" htmlFor="registerConfirmPassword">
							Confirm Password
						</label>
						<input
							className="form-control"
							id="registerConfirmPassword"
							type="password"
							value={registerForm.confirmPassword}
							onChange={(e) =>
								setRegisterForm({
									...registerForm,
									confirmPassword: e.target.value,
								})
							}
							required
						/>
					</div>
					<button
						className="btn btn-primary w-100 mb-4"
						type="submit"
						disabled={loading}
					>
						{loading ? "Creating Account..." : "Create Account"}
					</button>
					<div className="social-auth-buttons">
						<div className="d-flex justify-content-center gap-3">
							<button type="button" className="btn btn-icon">
								<FaGoogle />
							</button>
							<button type="button" className="btn btn-icon">
								<FaFacebook />
							</button>
							<button type="button" className="btn btn-icon">
								<FaApple />
							</button>
						</div>
					</div>
				</form>
			),
		},
	];

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={null}
			width={500}
			className="auth-modal"
			centered
		>
			{error && <div className="alert alert-danger mb-4">{error}</div>}
			<Tabs
				activeKey={activeTab}
				onChange={setActiveTab}
				items={items}
				centered
			/>
		</Modal>
	);
};

export default AuthModal;
