import DefaultLayout from "@/layouts/DefaultLayout";
import FeetList3 from "@/components/fleet-list/FeetList3";

const metadata = {
	title: "Luxury Vehicles | Elite Transportation Park City",
	description: "Premium SUV and sedan options for your Park City travel. All vehicles feature AWD, leather seats, and ample luggage space for ski gear.",
};

export default function FleetListPage3() {
	return (
		<DefaultLayout metadata={metadata}>
			<FeetList3 />
		</DefaultLayout>
	);
}