import DefaultLayout from "@/layouts/DefaultLayout";
import Register from "@/components/otherPages/Register";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const metadata = {
	title:
		"Register || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
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