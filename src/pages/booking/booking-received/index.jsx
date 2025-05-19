import DefaultLayout from "@/layouts/DefaultLayout";
import BookingReceived from "@/components/booking/BookingReceived";

const metadata = {
	title:
		"Booking Received || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BookingReceivedPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<BookingReceived />
		</DefaultLayout>
	);
}