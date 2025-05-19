import DefaultLayout from "@/layouts/DefaultLayout";
import FAQ from "@/components/otherPages/faq/FAQ";
import Breadcumb from "./Breadcumb";

const metadata = {
	title:
		"FAQ || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function FAQPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			<FAQ />
		</DefaultLayout>
	);
}