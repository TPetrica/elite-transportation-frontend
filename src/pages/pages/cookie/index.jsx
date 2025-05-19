import DefaultLayout from "@/layouts/DefaultLayout";
import CookiePolicy from "@/components/otherPages/cookie";
import Breadcumb from "@/components/otherPages/cookie/Breadcumb";

const metadata = {
	title:
		"Cookie Policy || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function CookiePolicyPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<Breadcumb />
			{/* <Banner /> */}
			<CookiePolicy />
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