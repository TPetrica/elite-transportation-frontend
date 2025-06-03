import DefaultLayout from "@/layouts/DefaultLayout";
import Register from "@/components/otherPages/Register";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const metadata = {
	title: "Create Account | Elite Transportation Park City",
	description: "Register for Elite Transportation Park City. Create your account for faster bookings, reservation management, and exclusive member benefits.",
};

export default function RegisterPage() {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<DefaultLayout metadata={metadata}>
			<Register />
		</DefaultLayout>
	);
}