import Invoice from "@/components/Invoice";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Invoice || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function InvoicePage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<main className="main">
				<Invoice />
			</main>
		</>
	);
}

