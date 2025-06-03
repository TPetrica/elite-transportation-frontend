import DefaultLayout from "@/layouts/DefaultLayout";
import DownloadApp from "@/components/common/downloadApp/DownloadApp2";
import BreadCumb2 from "@/components/otherPages/team/BreadCumb2";
import TeamDetails from "@/components/otherPages/team/TeamDetails";
import { teamMembers } from "@/data/team";
import { useParams } from "react-router-dom";

const metadata = {
	title: "Team Member Profile | Elite Transportation Park City",
	description: "Learn about our experienced chauffeurs and team members. Professional drivers committed to luxury service in Salt Lake City and Park City.",
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