import DefaultLayout from "@/layouts/DefaultLayout";
import BookingTab from "@/components/booking/BookingTab";
import PassengerDetails from "@/components/booking/PassengerDetails";

const metadata = {
	title:
		"Booking Passenger || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BookingPassengerPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<section className="section">
				<div className="container-sub">
					<BookingTab />
					<PassengerDetails />
				</div>
			</section>
		</DefaultLayout>
	);
}