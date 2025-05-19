import DefaultLayout from "@/layouts/DefaultLayout";
import Blogs3 from "@/components/blog/Blogs3";
import BreadCumb from "@/components/blog/BreadCumb";

const metadata = {
	title:
		"Blog List || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function BlogsListPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<BreadCumb />
			<Blogs3 />
		</DefaultLayout>
	);
}