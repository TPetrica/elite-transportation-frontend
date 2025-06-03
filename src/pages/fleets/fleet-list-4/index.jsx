import DefaultLayout from "@/layouts/DefaultLayout";
import FleetList4 from "@/components/fleet-list/FleetList4";

const metadata = {
	title: "Transportation Fleet | Elite Transportation Park City",
	description: "View our complete vehicle lineup. Safe, reliable luxury transportation for groups of all sizes traveling between SLC and Park City.",
};

export default function FleetListPage4() {
	return (
		<DefaultLayout metadata={metadata}>
			<FleetList4 />
		</DefaultLayout>
	);
}