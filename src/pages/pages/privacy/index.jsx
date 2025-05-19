import DefaultLayout from "@/layouts/DefaultLayout";
import PrivacyPolicy from "@/components/otherPages/privacy";
import Breadcumb from "@/components/otherPages/privacy/Breadcumb";

const metadata = {
	title:
		"Privacy Policy || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function PrivacyPolicyPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			{/* <Banner /> */}
			<PrivacyPolicy />
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