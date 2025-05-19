import HeaderOnlyLayout from "@/layouts/HeaderOnlyLayout";
import ComingSoon from "@/components/ComingSoon";

const metadata = {
	title:
		"Coming Soon || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};

export default function CommingSoonPage() {
	return (
		<HeaderOnlyLayout metadata={metadata}>
			<ComingSoon />
		</HeaderOnlyLayout>
	);
}