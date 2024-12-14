import BookingPayment from "@/components/booking/BookingPayment";
import BookingTab from "@/components/booking/BookingTab";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Booking Payment || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BookingPaymentPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<section className="section">
					<div className="container-sub">
						<BookingTab />
						<BookingPayment />
					</div>
				</section>
			</main>
			<Footer1 />
		</>
	);
}

