import DefaultLayout from "@/layouts/DefaultLayout";
import FleetList4 from "@/components/fleet-list/FleetList4";

const metadata = {
	title:
		"Fleet List 4 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function FleetListPage4() {
	return (
		<DefaultLayout metadata={metadata}>
			<FleetList4 />
		</DefaultLayout>
	);
}