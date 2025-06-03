import DefaultLayout from "@/layouts/DefaultLayout";
import PrivacyPolicy from "@/components/otherPages/privacy";
import Breadcumb from "@/components/otherPages/privacy/Breadcumb";

const metadata = {
	title: "Privacy Policy | Elite Transportation Park City",
	description: "Privacy policy for Elite Transportation Park City. Learn how we protect your personal information and booking data with secure practices.",
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