import { useBooking } from "@/context/BookingContext";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import TipCalculator from "./TipCalculator";

const services = [
	{
		id: "airport-transfer-1-2",
		title: "Airport Transfer (1-2 Passengers)",
		description: "Private SUV service perfect for individuals or couples",
		pricing: {
			summer: 150,
			winter: 160,
		},
		capacity: {
			passengers: 2,
			luggage: 4,
		},
		features: [
			"Free waiting time (60 min for airport pickup)",
			"Flight tracking included",
			"Professional chauffeur",
			"Door-to-door service",
			"Free car seats upon request",
		],
		facilities: {
			meetAndGreet: true,
			freeCancellation: true,
			freeWaiting: true,
			safeTravel: true,
		},
		imgSrc: "/assets/imgs/page/homepage1/e-class.png",
	},
	{
		id: "airport-transfer-3-4",
		title: "Airport Transfer (3-4 Passengers)",
		description: "Private SUV service ideal for small groups and families",
		pricing: {
			summer: 180,
			winter: 190,
		},
		capacity: {
			passengers: 4,
			luggage: 4,
		},
		features: [
			"Free waiting time (60 min for airport pickup)",
			"Flight tracking included",
			"Professional chauffeur",
			"Door-to-door service",
			"Free car seats upon request",
		],
		facilities: {
			meetAndGreet: true,
			freeCancellation: true,
			freeWaiting: true,
			safeTravel: true,
		},
		imgSrc: "/assets/imgs/page/homepage1/e-class.png",
	},
	{
		id: "hourly-service",
		title: "Hourly Service",
		description: "Flexible hourly service for any occasion, 2-hour minimum",
		pricing: {
			basePrice: 100,
			minimumHours: 1,
		},
		capacity: {
			passengers: 4,
			luggage: 4,
		},
		features: [
			"2 hour minimum",
			"Professional chauffeur",
			"Luxury vehicle included",
			"Complimentary water",
			"Flexible schedule",
		],
		facilities: {
			meetAndGreet: true,
			freeCancellation: true,
			freeWaiting: true,
			safeTravel: true,
		},
		imgSrc: "/assets/imgs/page/homepage1/e-class.png",
	},
	{
		id: "group-transport",
		title: "Group Transportation",
		description:
			"Ideal for groups up to 7 passengers with separate luggage vehicle",
		pricing: {
			summer: 365,
			winter: 385,
		},
		capacity: {
			passengers: 7,
			luggage: "Separate vehicle for luggage",
		},
		features: [
			"Separate luggage vehicle included",
			"Professional chauffeur",
			"Group coordination",
			"Flexible pickup times",
			"Perfect for large groups",
		],
		facilities: {
			meetAndGreet: true,
			freeCancellation: true,
			freeWaiting: true,
			safeTravel: true,
		},
		imgSrc: "/assets/imgs/page/homepage1/van.png",
	},
];

export default function BookingServices() {
	const navigate = useNavigate();
	const {
		setSelectedService,
		distance,
		selectedDate,
		selectedTime,
		pricing,
		updatePricing,
	} = useBooking();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedServiceData, setSelectedServiceData] = useState(null);
	const [isWinter, setIsWinter] = useState(() => {
		const month = new Date().getMonth();
		return month >= 10 || month <= 3;
	});

	useEffect(() => {
		if (!selectedDate || !selectedTime) {
			navigate("/booking-time");
			return;
		}

		const month = new Date(selectedDate).getMonth();
		setIsWinter(month >= 10 || month <= 3);
	}, [selectedDate, selectedTime, navigate]);

	const getServicePrice = (service) => {
		if (service.id === "hourly-service") {
			return `$${service.pricing.basePrice}/hr`;
		} else if (service.pricing.summer && service.pricing.winter) {
			return isWinter
				? `$${service.pricing.winter}`
				: `$${service.pricing.summer}`;
		} else {
			return `$${service.pricing.basePrice}`;
		}
	};

	const handleTipChange = (tipAmount) => {
		updatePricing({
			...pricing,
			gratuity: tipAmount,
			totalPrice:
				pricing.basePrice + tipAmount + pricing.extrasTotal + pricing.nightFee,
		});
	};

	const handleServiceSelect = async (service) => {
		try {
			setSelectedServiceData(service);
			setSelectedService(service);
			setIsModalVisible(true);
		} catch (err) {
			console.error("Error selecting service:", err);
			setError("Failed to select service");
		}
	};

	const handleModalOk = () => {
		setIsModalVisible(false);
		navigate("/booking-extra");
	};

	const handleModalCancel = () => {
		setIsModalVisible(false);
	};

	if (loading) {
		return <div className="loading-spinner">Loading services...</div>;
	}

	if (error) {
		return <div className="error-message">Error: {error}</div>;
	}

	return (
		<div className="box-row-tab mt-50 mb-50">
			<div className="box-tab-left">
				<div className="box-content-detail">
					<h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
						Select Your Service
					</h3>
					<div className="list-vehicles wow fadeInUp">
						{services.map((service) => (
							<div
								key={`service-${service.id}`}
								className="item-vehicle wow fadeInUp"
							>
								<div className="vehicle-left">
									<div className="vehicle-image">
										<img src={service.imgSrc} alt={service.title} />
									</div>
									<div className="vehicle-facilities">
										{service.facilities.meetAndGreet && (
											<div
												key={`facility-meet-${service.id}`}
												className="text-fact meet-greeting"
											>
												Meet & Greet included
											</div>
										)}
										{service.facilities.freeCancellation && (
											<div
												key={`facility-cancel-${service.id}`}
												className="text-fact free-cancel"
											>
												Free cancellation
											</div>
										)}
										{service.facilities.freeWaiting && (
											<div
												key={`facility-wait-${service.id}`}
												className="text-fact free-waiting"
											>
												Free Waiting time
											</div>
										)}
										{service.facilities.safeTravel && (
											<div
												key={`facility-safe-${service.id}`}
												className="text-fact safe-travel"
											>
												Safe and secure travel
											</div>
										)}
									</div>
									<div className="mt-10">
										<Link className="link text-14-medium" to="#">
											Show more information
										</Link>
									</div>
								</div>
								<div className="vehicle-right">
									<h5 className="text-20-medium color-text mb-10">
										{service.title}
									</h5>
									<p className="text-14 color-text mb-20">
										{service.description}
									</p>
									<div className="vehicle-passenger-luggage mb-10">
										<span className="passenger">
											Passengers {service.capacity.passengers}
										</span>
										<span className="luggage">
											{typeof service.capacity.luggage === "number"
												? `Luggage ${service.capacity.luggage}`
												: service.capacity.luggage}
										</span>
									</div>
									<div className="vehicle-price">
										<h4 className="heading-30-medium color-text">
											{getServicePrice(service)}
										</h4>
									</div>
									<div className="price-desc mb-20">
										All prices include VAT and fees. Gratuity is optional but
										appreciated.
									</div>
									<button
										className="btn btn-primary w-100"
										onClick={() => handleServiceSelect(service)}
									>
										Select
										<svg
											className="icon-16 ml-5"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
											></path>
										</svg>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<SideBar />

			<Modal
				title="Add Gratuity"
				visible={isModalVisible}
				onOk={handleModalOk}
				onCancel={handleModalCancel}
				width={600}
				okText="Continue Booking"
				cancelText="Skip"
			>
				{selectedServiceData && (
					<TipCalculator
						basePrice={
							isWinter
								? selectedServiceData.pricing.winter
								: selectedServiceData.pricing.summer
						}
						onTipChange={handleTipChange}
					/>
				)}
			</Modal>
		</div>
	);
}
