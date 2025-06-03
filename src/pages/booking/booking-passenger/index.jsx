import DefaultLayout from "@/layouts/DefaultLayout";
import BookingTab from "@/components/booking/BookingTab";
import PassengerDetails from "@/components/booking/PassengerDetails";

const metadata = {
	title: "Passenger Details | Elite Transportation Park City",
	description: "Enter passenger information for your SLC to Park City transfer. Quick checkout process with secure booking and instant confirmation.",
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