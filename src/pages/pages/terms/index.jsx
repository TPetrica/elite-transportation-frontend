import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcumb from "@/components/otherPages/terms/Breadcumb";
import TermsAndConditions from "@/components/otherPages/terms/TermsAndConditions";

const metadata = {
	title: "Terms & Conditions | Elite Transportation Park City",
	description: "Terms of service and conditions for Elite Transportation Park City luxury transportation services. Read our booking and service policies.",
};

export default function TermsAndConditionsPage() {
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