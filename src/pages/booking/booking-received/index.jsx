import DefaultLayout from "@/layouts/DefaultLayout";
import AffiliateLayout from "@/layouts/AffiliateLayout";
import BookingReceived from "@/components/booking/BookingReceived";
import { useSearchParams } from "react-router-dom";

const metadata = {
	title: "Booking Confirmed | Elite Transportation Park City",
	description: "Your Park City transportation is confirmed! Check your email for booking details and driver contact information for pickup.",
};

export default function BookingReceivedPage() {
	const [searchParams] = useSearchParams();
	const affiliateCode = searchParams.get('affiliate');
	const isAffiliate = !!affiliateCode;

	const Layout = isAffiliate ? AffiliateLayout : DefaultLayout;

	return (
		<Layout metadata={metadata}>
			<BookingReceived />
		</Layout>
	);
}