import ComingSoon from "@/components/ComingSoon";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Coming Soon || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function CommingSoonPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<MobailHeader1 />
			<main className="main">
				<ComingSoon />
			</main>
		</>
	);
}

