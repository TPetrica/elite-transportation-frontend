import DefaultLayout from "@/layouts/DefaultLayout";
import FeetList2 from "@/components/fleet-list/FeetList2";

const metadata = {
	title:
		"Fleet List 2 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function FleetListPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<FeetList2 />
		</DefaultLayout>
	);
}