import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Login from "@/components/otherPages/Login";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const metadata = {
	title:
		"Login || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
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
		<>
			<MetaComponent meta={metadata} />
			<Header1 />
			<MobailHeader1 />
			<main className="main">
				<Login />
			</main>
			<Footer1 />
		</>
	);
}

