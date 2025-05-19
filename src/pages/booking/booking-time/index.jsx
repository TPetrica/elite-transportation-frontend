import BookingTab from "@/components/booking/BookingTab";
import BookingTime from "@/components/booking/BookingTime";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title:
		"Select Date & Time || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description: "Select your preferred date and time for your journey",
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

