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
	title: "Vehicle Details | Elite Transportation Park City",
	description: "Detailed specifications and features of our luxury vehicles. Book the perfect SUV or sedan for your Salt Lake City airport transfer.",
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