import BookingExtra from "@/components/booking/BookingExtra";
import BookingTab from "@/components/booking/BookingTab";
import AffiliateLayout from "@/layouts/AffiliateLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useSearchParams } from "react-router-dom";

const metadata = {
	title: "Add Extra Services | Elite Transportation Park City",
	description: "Enhance your ride with additional services: child seats, ski equipment transport, stops, and premium amenities for your Park City trip.",
};

export default function BookingExtraPage() {
	const [searchParams] = useSearchParams();
	const affiliateCode = searchParams.get('affiliate');
	const isAffiliate = !!affiliateCode;

	const Layout = isAffiliate ? AffiliateLayout : DefaultLayout;

	return (
		<Layout metadata={metadata}>
			<section className="section">
				<div className="container-sub booking-wrapper">
					<BookingTab />
					<BookingExtra />
				</div>
			</section>
		</Layout>
	);
}