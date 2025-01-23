import Process from "@/components/common/process/Process2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import MobailHeader1 from "@/components/headers/MobailHeader1";
import Banner2 from "@/components/otherPages/about/Banner2";
import Features2 from "@/components/otherPages/about/Features2";

import MetaComponent from "@/components/common/MetaComponent";
import Faq from "@/components/otherPages/about/Faq";
const metadata = {
	title: "About Us || Elite Transportation Park City",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function AboutPage2() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<Banner2 />
				{/* <Process /> */}
				<Features2 />
				{/* <Partners /> */}
				{/* <Features3 /> */}
				{/* <div className="mb-90"></div> */}
				<Faq />
				{/* <Testimonials /> */}
				{/* <Features /> */}
				{/* <DownloadApp /> */}
			</main>
			<Footer1 />
		</>
	);
}

