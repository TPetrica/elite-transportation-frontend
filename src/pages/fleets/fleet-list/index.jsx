import FeetList1 from "@/components/fleet-list/FeetList1";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "Our Fleet | Elite Transportation Park City",
	description: "Browse our luxury vehicle fleet: premium SUVs, executive sedans, and spacious SUVs for Salt Lake City and Park City transportation needs.",
};

export default function FleetListPage1() {
	return (
		<DefaultLayout metadata={metadata}>
			<FeetList1 />
		</DefaultLayout>
	);
}