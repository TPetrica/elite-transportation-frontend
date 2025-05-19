import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/service/Breadcumb";
import Services3 from "@/components/service/Services3";

const metadata = {
	title:
		"Service Grid 3 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function ServiceGridPage3() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			<Services3 />
		</DefaultLayout>
	);
}