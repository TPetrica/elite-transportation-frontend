import { useBooking } from "@/context/BookingContext";
import VehicleService from "@/services/vehicle.service";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

export default function BookingVehicles() {
	const navigate = useNavigate();
	const { setSelectedVehicle, distance, selectedDate, selectedTime } =
		useBooking();
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!selectedDate || !selectedTime) {
			navigate("/booking-time");
			return;
		}

		const fetchVehicles = async () => {
			try {
				const result = await VehicleService.getVehicles();
				if (result.success && result.data.results) {
					const mappedVehicles = result.data.results.map((vehicle) => ({
						...vehicle,
						imgSrc: vehicle.images[0],
						title: vehicle.title,
						description: vehicle.description,
						passenger: vehicle.capacity.passengers,
						luggage: vehicle.capacity.luggage,
						price: vehicle.pricing.basePrice,
					}));
					setVehicles(mappedVehicles);
				} else {
					setError("No vehicles available");
				}
			} catch (err) {
				console.error("Error fetching vehicles:", err);
				setError("Failed to load vehicles");
			} finally {
				setLoading(false);
			}
		};

		fetchVehicles();
	}, []);

	const handleVehicleSelect = async (vehicle) => {
		try {
			if (distance?.km) {
				const priceResult = await VehicleService.calculatePrice(
					vehicle.id,
					distance.km
				);
				if (priceResult.success) {
					vehicle.pricing.calculatedPrice = priceResult.data.price;
				}
			}
			setSelectedVehicle(vehicle);
			navigate("/booking-passenger");
		} catch (err) {
			console.error("Error selecting vehicle:", err);
			setError("Failed to select vehicle");
		}
	};

	if (loading) {
		return <div className="loading-spinner">Loading vehicles...</div>;
	}

	if (error) {
		return <div className="error-message">Error: {error}</div>;
	}

	return (
		<div className="box-row-tab mt-50 mb-50">
			<div className="box-tab-left">
				<div className="box-content-detail">
					<h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
						Select Your Car
					</h3>
					<div className="list-vehicles wow fadeInUp">
						{vehicles.map((elm) => (
							<div key={elm.id} className="item-vehicle wow fadeInUp">
								<div className="vehicle-left">
									<div className="vehicle-image">
										<img src={elm.imgSrc} alt={elm.title} />
									</div>
									<div className="vehicle-facilities">
										{elm.facilities.meetAndGreet && (
											<div className="text-fact meet-greeting">
												Meet & Greet included
											</div>
										)}
										{elm.facilities.freeCancellation && (
											<div className="text-fact free-cancel">
												Free cancellation
											</div>
										)}
										{elm.facilities.freeWaiting && (
											<div className="text-fact free-waiting">
												Free Waiting time
											</div>
										)}
										{elm.facilities.safeTravel && (
											<div className="text-fact safe-travel">
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
										{elm.title}
									</h5>
									<p className="text-14 color-text mb-20">{elm.description}</p>
									<div className="vehicle-passenger-luggage mb-10">
										<span className="passenger">
											Passengers {elm.passenger}
										</span>
										<span className="luggage">Luggage {elm.luggage}</span>
									</div>
									<div className="vehicle-price">
										<h4 className="heading-30-medium color-text">
											${elm.price}
										</h4>
									</div>
									<div className="price-desc mb-20">
										All prices include VAT, fees & tip.
									</div>
									<button
										className="btn btn-primary w-100"
										onClick={() => handleVehicleSelect(elm)}
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
		</div>
	);
}

