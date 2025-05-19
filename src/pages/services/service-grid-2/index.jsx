import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/service/Breadcumb";
import Services2 from "@/components/service/Services2";

const metadata = {
	title:
		"Service Grid 2 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function ServiceGridPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			<Services2 />
		</DefaultLayout>
	);
}