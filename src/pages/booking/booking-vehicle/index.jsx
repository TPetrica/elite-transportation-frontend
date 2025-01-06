import BookingTab from "@/components/booking/BookingTab";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import BookingServices from "@/components/booking/BookingServices";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Booking Vehicles || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BookingVehiclePage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<section className="section">
					<div className="container-sub">
						<BookingTab />
						<BookingServices />
					</div>
				</section>
			</main>
			<Footer1 />
		</>
	);
}

