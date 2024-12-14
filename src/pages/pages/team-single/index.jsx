import DownloadApp from "@/components/common/downloadApp/DownloadApp2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import BreadCumb2 from "@/components/otherPages/team/BreadCumb2";
import TeamDetails from "@/components/otherPages/team/TeamDetails";
import { teamMembers } from "@/data/team";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Team Single || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function TeamSinglePage() {
	let params = useParams();

	const teamMember =
		teamMembers.filter((elm) => elm.id == params.id)[0] || teamMembers[0];
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<BreadCumb2 teamMember={teamMember} />
				<TeamDetails teamMember={teamMember} />
				<DownloadApp />
			</main>
			<Footer1 />
		</>
	);
}

