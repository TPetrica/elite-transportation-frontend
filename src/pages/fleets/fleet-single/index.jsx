/* eslint-disable react-hooks/rules-of-hooks */
import DefaultLayout from "@/layouts/DefaultLayout";
import BreadCumb from "@/components/fleet-list/BreadCumb";
import BookSection from "@/components/fleet-single/BookSection";
import BusnessClassFleet from "@/components/fleet-single/BusnessClassFleet";
import Details from "@/components/fleet-single/Details";
import Features from "@/components/fleet-single/Features";
import { cars } from "@/data/cars";
import { useParams } from "react-router-dom";

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
		<DefaultLayout metadata={metadata}>
			<BreadCumb />
			<Details />
			<Features />
			<BookSection car={car} />
			<BusnessClassFleet />
		</DefaultLayout>
	);
}