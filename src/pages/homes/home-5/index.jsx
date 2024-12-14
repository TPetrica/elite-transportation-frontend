import Partners from "@/components/common/partners/Partners";
import Footer5 from "@/components/footers/Footer5";
import Header5 from "@/components/headers/Header5";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/home-5/Blogs";
import Cities from "@/components/homes/home-5/Cities";
import Faq from "@/components/homes/home-5/Faq";
import Feet from "@/components/homes/home-5/Feet";
import Hero from "@/components/homes/home-5/Hero";
import Service from "@/components/homes/home-5/Service";
import Testimonials from "@/components/homes/home-5/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Home 5 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function HomePage5() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header5 /> <MobailHeader1 />
			<main className="main" style={{ maxWidth: "100vw", overflow: "hidden" }}>
				<Hero />
				<Partners />
				<div className="border-bottom"></div>
				<Feet />
				<Service />
				<Faq />
				<Cities />
				<Testimonials />
				<Blogs />
			</main>
			<Footer5 />
		</>
	);
}

