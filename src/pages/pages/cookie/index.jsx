import DefaultLayout from "@/layouts/DefaultLayout";
import CookiePolicy from "@/components/otherPages/cookie";
import Breadcumb from "@/components/otherPages/cookie/Breadcumb";

const metadata = {
	title: "Cookie Policy | Elite Transportation Park City",
	description: "Cookie usage policy for Elite Transportation Park City website. Information about how we use cookies to improve your booking experience.",
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