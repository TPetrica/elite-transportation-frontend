import DefaultLayout from "@/layouts/DefaultLayout";
import DownloadApp from "@/components/common/downloadApp/DownloadApp2";
import BreadCumbs from "@/components/otherPages/team/BreadCumbs";
import TeamMambers from "@/components/otherPages/team/TeamMambers";

const metadata = {
	title:
		"Our Team || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function OurTeamPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<BreadCumbs />
			<TeamMambers />
			<DownloadApp />
		</DefaultLayout>
	);
}