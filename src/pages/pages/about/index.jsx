import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/otherPages/about/Breadcumb";
import TermsAndConditions from "@/components/otherPages/terms/TermsAndConditions";

const metadata = {
	title:
		"About || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function AboutPage1() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			{/* <Banner /> */}
			<TermsAndConditions />
			{/* <Facts /> */}
			{/* <Features2 /> */}
			{/* <Process />
			<Testimonials />
			<Partners />
			<Faq />
			<DownloadApp /> */}
		</DefaultLayout>
	);
}