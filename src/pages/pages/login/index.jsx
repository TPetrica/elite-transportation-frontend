import DefaultLayout from "@/layouts/DefaultLayout";
import Login from "@/components/otherPages/Login";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const metadata = {
	title: "Login | Elite Transportation Park City",
	description: "Sign in to your Elite Transportation Park City account. Access your bookings, manage reservations, and track your transportation history.",
};

export default function LoginPage() {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<DefaultLayout metadata={metadata}>
			<Login />
		</DefaultLayout>
	);
}