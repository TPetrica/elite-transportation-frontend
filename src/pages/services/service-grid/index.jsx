import Breadcumb from "@/components/service/Breadcumb";
import Services1 from "@/components/service/Services1";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title:
		"Service Grid || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function ServiceGridPage1() {
	return (
		<DefaultLayout metadata={metadata}>
			<main className="main">
				<Breadcumb />
				<Services1 />
			</main>
		</DefaultLayout>
	);
}

