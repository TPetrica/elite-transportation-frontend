import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/common/blogs/Blogs2";

import Process from "@/components/common/process/Process";
import Faq from "@/components/homes/home-1/Faq";
import Feet from "@/components/homes/home-1/Feet";
import Hero from "@/components/homes/home-1/Hero";
import Service from "@/components/homes/home-1/Service";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Home || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function Home() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<Hero />
				{/* <Partners /> */}
				<Feet />
				<Process />
				{/* <Features /> */}
				{/* <Facts /> */}
				<Service />
				{/* <Testimonials /> */}
				{/* <Cta /> */}
				<Blogs />
				<Faq />
				{/* <DownloadApp /> */}
			</main>
			<Footer1 />
		</>
	);
}
