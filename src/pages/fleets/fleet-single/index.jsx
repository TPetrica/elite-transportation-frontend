/* eslint-disable react-hooks/rules-of-hooks */
import BreadCumb from "@/components/fleet-list/BreadCumb";
import BookSection from "@/components/fleet-single/BookSection";
import BusnessClassFleet from "@/components/fleet-single/BusnessClassFleet";
import Details from "@/components/fleet-single/Details";
import Features from "@/components/fleet-single/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MobailHeader1 from "@/components/headers/MobailHeader1";
import { cars } from "@/data/cars";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
	title:
		"Fleet Single || Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
	description:
		"Elite Transportation Park City Chauffeur Limousine Transport and Car Hire",
};
export default function FleetSinglePage() {
	let params = useParams();

	const car = cars.filter((elm) => elm.id == params.id)[0] || cars[0];
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header1 /> <MobailHeader1 />
			<main className="main">
				<BreadCumb />
				<Details />
				<Features />
				<BookSection car={car} />
				<BusnessClassFleet />
			</main>
			<Footer1 />
		</>
	);
}

