import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const usePrivateRoute = () => {
	const { user, loading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !user) {
			navigate("/login", { replace: true });
		}
	}, [user, loading, navigate]);

	return { isAuthenticated: !!user, loading };
};

export default usePrivateRoute;
