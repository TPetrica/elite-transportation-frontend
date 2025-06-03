import DefaultLayout from "@/layouts/DefaultLayout";
import FeetList2 from "@/components/fleet-list/FeetList2";

const metadata = {
	title: "Vehicle Fleet | Elite Transportation Park City",
	description: "Select from our modern fleet of luxury vehicles. Comfortable SUVs and sedans perfect for airport transfers and mountain transportation.",
};

export default function FleetListPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<FeetList2 />
		</DefaultLayout>
	);
}