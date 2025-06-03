import DefaultLayout from "@/layouts/DefaultLayout";
import BookingPayment from "@/components/booking/BookingPayment";
import BookingTab from "@/components/booking/BookingTab";

const metadata = {
	title: "Secure Payment | Elite Transportation Park City",
	description: "Complete your Park City transportation booking with secure payment. Instant confirmation for your SLC airport transfer reservation.",
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