import FeetList2 from "@/components/fleet-list/FeetList2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Fleet List 2 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function FleetListPage2() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<FeetList2 />
			</main>
			<Footer1 />
		</>
	);
}

