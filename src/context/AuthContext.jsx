import { createContext, useCallback, useContext, useState } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [loading, setLoading] = useState(false);

	const login = useCallback(async (email, password) => {
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
	}, []);

	const register = useCallback(async (userData) => {
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
	}, []);

	const logout = useCallback(async () => {
		setLoading(true);
		try {
			await AuthService.logout();
			setUser(null);
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	const forgotPassword = useCallback(async (email) => {
		setLoading(true);
		try {
			return await AuthService.forgotPassword(email);
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	}, []);

	const resetPassword = useCallback(async (token, password) => {
		setLoading(true);
		try {
			return await AuthService.resetPassword(token, password);
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	}, []);

	const checkAuth = useCallback(() => {
		const currentUser = AuthService.getCurrentUser();
		if (currentUser && !user) {
			setUser(currentUser);
		}
	}, [user]);

	const value = {
		user,
		loading,
		login,
		register,
		logout,
		forgotPassword,
		resetPassword,
		checkAuth,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
