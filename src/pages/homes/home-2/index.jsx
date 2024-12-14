import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";

import Process from "@/components/common/process/Process2";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Blogs from "@/components/homes/common/blogs/Blogs";
import Partners from "@/components/homes/common/partners/Partners2";
import DownloadApp from "@/components/homes/home-2/DownloadApp";
import Facts from "@/components/homes/home-2/Facts";
import Feet from "@/components/homes/home-2/Feet";
import Hero from "@/components/homes/home-2/Hero";
import Service from "@/components/homes/home-2/Service";
import Testimonials from "@/components/homes/home-2/Testimonials";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Home 2 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function HomePage2() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header2 /> <MobailHeader1 />
			<main className="main">
				<Hero />
				<Process />
				<Service />
				<Feet />
				<Facts />
				<Testimonials />
				<Blogs />
				<Partners />
				<DownloadApp />
			</main>
			<Footer2 />
		</>
	);
}

