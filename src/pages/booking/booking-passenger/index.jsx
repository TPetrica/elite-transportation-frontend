import BookingTab from "@/components/booking/BookingTab";
import PassengerDetails from "@/components/booking/PassengerDetails";
import AffiliateLayout from "@/layouts/AffiliateLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useSearchParams } from "react-router-dom";

const metadata = {
	title: "Passenger Details | Elite Transportation Park City",
	description: "Enter passenger information for your SLC to Park City transfer. Quick checkout process with secure booking and instant confirmation.",
};

export default function BookingPassengerPage() {
	const [searchParams] = useSearchParams();
	const affiliateCode = searchParams.get('affiliate');
	const isAffiliate = !!affiliateCode;

	const Layout = isAffiliate ? AffiliateLayout : DefaultLayout;

	return (
		<Layout metadata={metadata}>
			<section className="section">
				<div className="container-sub booking-wrapper">
					<BookingTab />
					<PassengerDetails />
				</div>
			</section>
		</Layout>
	);
}