import DefaultLayout from "@/layouts/DefaultLayout";
import BreadCumb from "@/components/contact/BreadCumb";
import ContactForm from "@/components/contact/ContactForm";
import Map from "@/components/contact/Map";
import Offices from "@/components/contact/Offices";

const metadata = {
	title: "Contact Us | Elite Transportation Park City",
	description: "Book your Salt Lake City to Park City airport transfer. 24/7 customer service, instant quotes, and professional drivers. Contact us today!",
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