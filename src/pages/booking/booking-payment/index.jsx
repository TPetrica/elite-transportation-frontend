import DefaultLayout from "@/layouts/DefaultLayout";
import BookingPayment from "@/components/booking/BookingPayment";
import BookingTab from "@/components/booking/BookingTab";

const metadata = {
	title:
		"Booking Payment || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BookingPaymentPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<section className="section">
				<div className="container-sub">
					<BookingTab />
					<BookingPayment />
				</div>
			</section>
		</DefaultLayout>
	);
}