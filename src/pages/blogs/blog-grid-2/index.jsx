import DefaultLayout from "@/layouts/DefaultLayout";
import Blogs2 from "@/components/blog/Blogs2";
import BreadCumb from "@/components/blog/BreadCumb";

const metadata = {
	title:
		"Blog Grid 2 || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BlogsGridPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<BreadCumb />
			<Blogs2 />
		</DefaultLayout>
	);
}