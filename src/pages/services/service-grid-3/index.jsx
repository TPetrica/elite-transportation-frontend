import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/service/Breadcumb";
import Services3 from "@/components/service/Services3";

const metadata = {
	title: "Transportation Services | Elite Transportation Park City",
	description: "Full range of luxury SUV services from SLC Airport to Park City ski resorts. Business travel, wedding transport, and hourly chauffeur service.",
};

export default function ServiceGridPage3() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			<Services3 />
		</DefaultLayout>
	);
}