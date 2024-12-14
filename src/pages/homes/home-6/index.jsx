import Footer6 from "@/components/footers/Footer6";
import Header6 from "@/components/headers/Header6";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Cities from "@/components/homes/common/cities/Cities";
import Features2 from "@/components/homes/common/features/Features";
import Blogs from "@/components/homes/home-6/Blogs";
import Faq from "@/components/homes/home-6/Faq";
import Features from "@/components/homes/home-6/Features";
import Feet from "@/components/homes/home-6/Feet";
import Hero from "@/components/homes/home-6/Hero";
import Process from "@/components/homes/home-6/Process";
import Testimonials from "@/components/homes/home-6/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Home 6 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function HomePage6() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header6 /> <MobailHeader1 />
			<main className="main">
				<Hero />
				<Process />
				<Feet />
				<Faq />
				<Testimonials />
				<Features />
				<Cities />
				<Blogs />
				<Features2 />
			</main>
			<Footer6 />
		</>
	);
}

