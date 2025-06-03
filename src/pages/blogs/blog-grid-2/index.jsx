import DefaultLayout from "@/layouts/DefaultLayout";
import Blogs2 from "@/components/blog/Blogs2";
import BreadCumb from "@/components/blog/BreadCumb";

const metadata = {
	title: "Travel Blog | Elite Transportation Park City",
	description: "Latest news, travel guides, and tips for visiting Park City and Salt Lake City. Ski resort info, local events, and transportation updates.",
};

export default function BlogsGridPage2() {
	return (
		<DefaultLayout metadata={metadata}>
			<BreadCumb />
			<Blogs2 />
		</DefaultLayout>
	);
}