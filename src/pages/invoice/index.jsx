import Invoice from "@/components/Invoice";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title: "Invoice & Receipt | Elite Transportation Park City",
	description: "View and download your booking invoice and receipt. Complete trip details and payment confirmation for your Park City transportation.",
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

