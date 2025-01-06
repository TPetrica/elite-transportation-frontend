import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import Pricing from "@/components/otherPages/pricing/Pricing";

const metadata = {
	title: "Rates || Peak Transportation Park City",
	description: "Peak Transportation Park City Rates and Services",
};

export default function RatesPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 />
			<MobailHeader1 />
			<main className="main">
				<Pricing />
			</main>
			<Footer1 />
		</>
	);
}

