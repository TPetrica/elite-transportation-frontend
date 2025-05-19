import DefaultLayout from "@/layouts/DefaultLayout";
import Pricing from "@/components/otherPages/pricing/Pricing";

const metadata = {
	title: "Rates || Peak Transportation Park City",
	description: "Peak Transportation Park City Rates and Services",
};

export default function RatesPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Pricing />
		</DefaultLayout>
	);
}