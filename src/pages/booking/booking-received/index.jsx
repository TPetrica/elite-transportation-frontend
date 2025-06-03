import DefaultLayout from "@/layouts/DefaultLayout";
import BookingReceived from "@/components/booking/BookingReceived";

const metadata = {
	title: "Booking Confirmed | Elite Transportation Park City",
	description: "Your Park City transportation is confirmed! Check your email for booking details and driver contact information for pickup.",
};

export default function BookingReceivedPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<BookingReceived />
		</DefaultLayout>
	);
}