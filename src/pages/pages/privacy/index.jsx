import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
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
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
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
			</main>
			<Footer1 />
		</>
	);
}

