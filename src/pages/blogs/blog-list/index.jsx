import Blogs3 from "@/components/blog/Blogs3";
import BreadCumb from "@/components/blog/BreadCumb";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Blog List || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BlogsListPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<BreadCumb />
				<Blogs3 />
			</main>
			<Footer1 />
		</>
	);
}

