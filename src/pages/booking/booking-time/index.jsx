import BookingTab from "@/components/booking/BookingTab";
import BookingTime from "@/components/booking/BookingTime";
import AffiliateLayout from "@/layouts/AffiliateLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useSearchParams } from "react-router-dom";

const metadata = {
	title: "Select Date & Time | Elite Transportation Park City",
	description: "Choose your pickup date and time for SLC Airport to Park City transfer. Real-time availability and instant booking confirmation.",
};

export default function BookingTimePage() {
	const [searchParams] = useSearchParams();
	const affiliateCode = searchParams.get('affiliate');
	const isAffiliate = !!affiliateCode;

	const Layout = isAffiliate ? AffiliateLayout : DefaultLayout;

	return (
		<Layout metadata={metadata}>
			<section className="section">
				<div className="container-sub booking-wrapper">
					<BookingTab />
					<BookingTime />
				</div>
			</section>
		</Layout>
	);
}

