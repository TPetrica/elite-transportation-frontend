import DefaultLayout from "@/layouts/DefaultLayout";
import FAQ from "@/components/otherPages/faq/FAQ";
import Breadcumb from "./Breadcumb";

const metadata = {
	title: "FAQ | Elite Transportation Park City",
	description: "Frequently asked questions about Salt Lake City airport transfers to Park City. Booking info, pricing, policies, and travel tips.",
};

export default function FAQPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			<FAQ />
		</DefaultLayout>
	);
}