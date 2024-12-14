import BookingTab from "@/components/booking/BookingTab";
import BookingTime from "@/components/booking/BookingTime";
import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

const metadata = {
	title:
		"Select Date & Time || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description: "Select your preferred date and time for your journey",
};

export default function BookingTimePage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 />
			<MobailHeader1 />
			<main className="main">
				<section className="section">
					<div className="container-sub">
						<BookingTab />
						<BookingTime />
					</div>
				</section>
			</main>
			<Footer1 />
		</>
	);
}

