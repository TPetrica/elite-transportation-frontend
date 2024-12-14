import Partners from "@/components/common/partners/Partners";
import Footer4 from "@/components/footers/Footer4";
import Header4 from "@/components/headers/Header4";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/common/blogs/Blogs2";
import Cta from "@/components/homes/common/cta/Cta";
import Features from "@/components/homes/common/features/Features";
import DownloadApp from "@/components/homes/home-4/DownloadApp";
import Feet from "@/components/homes/home-4/Feet";
import Hero from "@/components/homes/home-4/Hero";
import Service from "@/components/homes/home-4/Service";
import Steps from "@/components/homes/home-4/Steps";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Home 4 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function HomePage4() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header4 /> <MobailHeader1 />
			<main className="main">
				<Hero />
				<DownloadApp />
				<Steps />
				<Service />
				<Feet />
				<Features />
				<div className="border-bottom mt-30"></div>
				<Partners />
				<Blogs />
				<Cta />
			</main>
			<Footer4 />
		</>
	);
}

