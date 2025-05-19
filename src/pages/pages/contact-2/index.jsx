import ContactForm2 from "@/components/contact/ContactForm2";
import Map2 from "@/components/contact/Map2";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title:
		"Contact Us || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function ContactPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<main className="main">
				<Map2 />
				<ContactForm2 />
			</main>
		</DefaultLayout>
	);
}

