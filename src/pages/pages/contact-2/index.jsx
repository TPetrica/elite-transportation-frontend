import ContactForm2 from "@/components/contact/ContactForm2";
import Map2 from "@/components/contact/Map2";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "Get in Touch | Elite Transportation Park City",
	description: "Reach out for Park City and SLC airport transportation services. Easy booking, competitive rates, and exceptional customer support available.",
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

