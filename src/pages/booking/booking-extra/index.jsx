import DefaultLayout from "@/layouts/DefaultLayout";
import BookingExtra from "@/components/booking/BookingExtra";
import BookingTab from "@/components/booking/BookingTab";

const metadata = {
	title:
		"Booking Extra || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BookingExtraPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<section className="section">
				<div className="container-sub">
					<BookingTab />
					<BookingExtra />
				</div>
			</section>
		</DefaultLayout>
	);
}