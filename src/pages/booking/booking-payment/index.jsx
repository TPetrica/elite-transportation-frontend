import BookingPayment from "@/components/booking/BookingPayment";
import BookingTab from "@/components/booking/BookingTab";
import AffiliateLayout from "@/layouts/AffiliateLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useSearchParams } from "react-router-dom";

const metadata = {
	title: "Secure Payment | Elite Transportation Park City",
	description: "Complete your Park City transportation booking with secure payment. Instant confirmation for your SLC airport transfer reservation.",
};

export default function BookingPaymentPage() {
	const [searchParams] = useSearchParams();
	const affiliateCode = searchParams.get('affiliate');
	const isAffiliate = !!affiliateCode;

	const Layout = isAffiliate ? AffiliateLayout : DefaultLayout;

	return (
		<Layout metadata={metadata}>
			<section className="section">
				<div className="container-sub booking-wrapper">
					<BookingTab />
					<BookingPayment />
				</div>
			</section>
		</Layout>
	);
}