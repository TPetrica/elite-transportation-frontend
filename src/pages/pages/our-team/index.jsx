import DefaultLayout from "@/layouts/DefaultLayout";
import DownloadApp from "@/components/common/downloadApp/DownloadApp2";
import BreadCumbs from "@/components/otherPages/team/BreadCumbs";
import TeamMambers from "@/components/otherPages/team/TeamMambers";

const metadata = {
	title: "Our Team | Elite Transportation Park City",
	description: "Meet our professional drivers and staff. Experienced, licensed, and dedicated to providing safe luxury transportation in Park City and SLC.",
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