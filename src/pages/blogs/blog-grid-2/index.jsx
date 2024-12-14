import Blogs2 from "@/components/blog/Blogs2";
import BreadCumb from "@/components/blog/BreadCumb";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Blog Grid 2 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BlogsGridPage2() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<BreadCumb />
				<Blogs2 />
			</main>
			<Footer1 />
		</>
	);
}

