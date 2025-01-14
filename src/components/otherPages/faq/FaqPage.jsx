import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import FAQ from "@/components/otherPages/faq/FAQ";
import Breadcumb from "./Breadcumb";

const metadata = {
	title:
		"FAQ || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function FAQPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 />
			<MobailHeader1 />
			<main className="main">
				<Breadcumb />
				<FAQ />
			</main>
			<Footer1 />
		</>
	);
}

