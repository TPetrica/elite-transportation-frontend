import HeaderOnlyLayout from "@/layouts/HeaderOnlyLayout";
import ComingSoon from "@/components/ComingSoon";

const metadata = {
	title: "Coming Soon | Elite Transportation Park City",
	description: "This page is under construction. Elite Transportation Park City is working on new features to enhance your luxury travel experience.",
};

export default function CommingSoonPage() {
	return (
		<HeaderOnlyLayout metadata={metadata}>
			<ComingSoon />
		</HeaderOnlyLayout>
	);
}