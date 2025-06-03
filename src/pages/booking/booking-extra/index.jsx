import DefaultLayout from "@/layouts/DefaultLayout";
import BookingExtra from "@/components/booking/BookingExtra";
import BookingTab from "@/components/booking/BookingTab";

const metadata = {
	title: "Add Extra Services | Elite Transportation Park City",
	description: "Enhance your ride with additional services: child seats, ski equipment transport, stops, and premium amenities for your Park City trip.",
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