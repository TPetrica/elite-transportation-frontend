import BookingTab from "@/components/booking/BookingTab";
import BookingTime from "@/components/booking/BookingTime";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "Select Date & Time | Elite Transportation Park City",
	description: "Choose your pickup date and time for SLC Airport to Park City transfer. Real-time availability and instant booking confirmation.",
};

export default function BookingTimePage() {
	return (
		<DefaultLayout metadata={metadata}>
			<section className="section">
				<div className="container-sub">
					<BookingTab />
					<BookingTime />
				</div>
			</section>
		</DefaultLayout>
	);
}

