import Pricing from "@/components/otherPages/pricing/Pricing";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "Rates & Pricing | Elite Transportation Park City",
	description: "Get instant quotes and transparent pricing for luxury SUV transportation from SLC Airport to Park City. Fixed rates, no surge pricing.",
};

export default function RatesPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Pricing />
		</DefaultLayout>
	);
}