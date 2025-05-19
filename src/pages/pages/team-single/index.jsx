import DefaultLayout from "@/layouts/DefaultLayout";
import DownloadApp from "@/components/common/downloadApp/DownloadApp2";
import BreadCumb2 from "@/components/otherPages/team/BreadCumb2";
import TeamDetails from "@/components/otherPages/team/TeamDetails";
import { teamMembers } from "@/data/team";
import { useParams } from "react-router-dom";

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
		<DefaultLayout metadata={metadata}>
			<BreadCumb2 teamMember={teamMember} />
			<TeamDetails teamMember={teamMember} />
			<DownloadApp />
		</DefaultLayout>
	);
}