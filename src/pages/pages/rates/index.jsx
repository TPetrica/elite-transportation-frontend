import Pricing from "@/components/otherPages/pricing/Pricing";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "Rates || Elite Transportation Park City",
	description: "Elite Transportation Park City Rates and Services",
};

export default function RatesPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Pricing />
		</DefaultLayout>
	);
}