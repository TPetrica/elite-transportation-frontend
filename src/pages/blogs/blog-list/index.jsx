import DefaultLayout from "@/layouts/DefaultLayout";
import Blogs3 from "@/components/blog/Blogs3";
import BreadCumb from "@/components/blog/BreadCumb";

const metadata = {
	title: "Blog | Elite Transportation Park City",
	description: "Travel tips, Park City guides, and SLC airport updates. Expert advice for your Utah mountain transportation and ski resort transfers.",
};

export default function BlogsListPage() {
	return (
		<DefaultLayout metadata={metadata}>
			<BreadCumb />
			<Blogs3 />
		</DefaultLayout>
	);
}