import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/service/Breadcumb";
import Services2 from "@/components/service/Services2";

const metadata = {
	title: "Our Services | Elite Transportation Park City",
	description: "Explore our premium transportation services: airport transfers, ski resort shuttles, corporate travel, and special events in Park City area.",
};

export default function ServiceGridPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			<Services2 />
		</DefaultLayout>
	);
}