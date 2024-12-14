import { AuthContext } from "@/context/AuthContext";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export const useAuth = () => {
	const context = useContext(AuthContext);
	const navigate = useNavigate();

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	const { user, setUser, setLoading } = context;

	const login = useCallback(
		async (email, password) => {
			setLoading(true);
			try {
				const response = await AuthService.login(email, password);
				setUser(response.user);
				return response;
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[setUser, setLoading]
	);

	const register = useCallback(
		async (userData) => {
			setLoading(true);
			try {
				const response = await AuthService.register(userData);
				setUser(response.user);
				return response;
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[setUser, setLoading]
	);

	const logout = useCallback(async () => {
		setLoading(true);
		try {
			await AuthService.logout();
			setUser(null);
			navigate("/login");
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setLoading(false);
		}
	}, [setUser, navigate, setLoading]);

	const forgotPassword = useCallback(
		async (email) => {
			setLoading(true);
			try {
				return await AuthService.forgotPassword(email);
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[setLoading]
	);

	const resetPassword = useCallback(
		async (token, password) => {
			setLoading(true);
			try {
				return await AuthService.resetPassword(token, password);
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[setLoading]
	);

	const checkAuth = useCallback(() => {
		const currentUser = AuthService.getCurrentUser();
		if (currentUser && !user) {
			setUser(currentUser);
		}
	}, [user, setUser]);

	return {
		user,
		loading: context.loading,
		login,
		register,
		logout,
		forgotPassword,
		resetPassword,
		checkAuth,
	};
};

