import DefaultLayout from "@/layouts/DefaultLayout";
import BreadCumb from "@/components/contact/BreadCumb";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Offices from "@/components/contact/Offices";

const metadata = {
	title:
		"Contact || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function ContactPage1() {
	return (
		<DefaultLayout metadata={metadata}>
			<BreadCumb />
			<Offices />
			<Map />
			<ContactForm />
		</DefaultLayout>
	);
}