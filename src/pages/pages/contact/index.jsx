import BreadCumb from "@/components/contact/BreadCumb";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Offices from "@/components/contact/Offices";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Contact || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function ContactPage1() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 />
			<MobailHeader1 />
			<main className="main">
				<BreadCumb />
				<Offices />
				<Map />
				<ContactForm />
			</main>
			<Footer1 />
		</>
	);
}

