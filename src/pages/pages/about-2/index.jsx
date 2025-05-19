import Process from "@/components/common/process/Process2";
import Banner2 from "@/components/otherPages/about/Banner2";
import Features2 from "@/components/otherPages/about/Features2";
import Faq from "@/components/otherPages/about/Faq";
import DefaultLayout from "@/layouts/DefaultLayout";

const metadata = {
	title: "About Us || Elite Transportation Park City",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function AboutPage2() {
	return (
		<DefaultLayout metadata={metadata}>
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
		</DefaultLayout>
	);
}

