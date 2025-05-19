import DefaultLayout from "@/layouts/DefaultLayout";
import FeetList3 from "@/components/fleet-list/FeetList3";

const metadata = {
	title:
		"Fleet List 3 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function FleetListPage3() {
	return (
		<DefaultLayout metadata={metadata}>
			<FeetList3 />
		</DefaultLayout>
	);
}