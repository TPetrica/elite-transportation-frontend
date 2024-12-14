import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Breadcumb from "@/components/otherPages/terms/Breadcumb";

import MetaComponent from "@/components/common/MetaComponent";
import TermsAndConditions from "@/components/otherPages/terms/TermsAndConditions";
const metadata = {
	title:
		"Terms & Conditions || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function TermsAndConditionsPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
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
			</main>
			<Footer1 />
		</>
	);
}

