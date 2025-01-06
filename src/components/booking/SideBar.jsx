import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

export default function SideBar() {
	const {
		pickupDetails,
		dropoffDetails,
		selectedService,
		selectedExtras,
		distance,
		duration,
		pricing,
		passengerDetails,
	} = useBooking();

	const { pathname } = useLocation();

	const formatDateTime = (date, time) => {
		if (!date) return "";
		try {
			return (
				format(new Date(date), "EEE, MMM dd, yyyy") + (time ? ` ${time}` : "")
			);
		} catch (err) {
			return "";
		}
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatCapacity = (capacity) => {
		if (!capacity) return "";

		let result = "";
		if (capacity.passengers) {
			result += `${capacity.passengers} passengers`;
		}
		if (capacity.luggage) {
			result +=
				capacity.luggage === "number"
					? `, ${capacity.luggage} luggage`
					: `, ${capacity.luggage}`;
		}
		return result;
	};

	return (
		<div className="box-tab-right">
			<div className="sidebar">
				<div className="d-flex align-items-center justify-content-between wow fadeInUp">
					<h6 className="text-20-medium color-text">Ride Summary</h6>
				</div>

				{/* Journey Details */}
				<div className="mt-20 wow fadeInUp">
					<ul className="list-routes">
						<li>
							<span className="location-item">A</span>
							<span className="info-location text-14-medium">
								{pickupDetails?.address || "Pickup location not selected"}
							</span>
						</li>
						<li>
							<span className="location-item">B</span>
							<span className="info-location text-14-medium">
								{dropoffDetails?.address || "Dropoff location not selected"}
							</span>
						</li>
					</ul>
				</div>

				<div className="mt-20 wow fadeInUp">
					<ul className="list-icons">
						<li>
							<span className="icon-item icon-plan"></span>
							<span className="info-location text-14-medium">
								{formatDateTime(pickupDetails?.date) || "Date not selected"}
							</span>
						</li>
						<li>
							<span className="icon-item icon-time"></span>
							<span className="info-location text-14-medium">
								{pickupDetails?.time || "Time not selected"}
							</span>
						</li>
					</ul>
				</div>

				{/* Distance and Duration */}
				{(distance || duration) && (
					<div className="mt-20 wow fadeInUp">
						<div className="box-info-route">
							<div className="info-route-left">
								<span className="text-14 color-grey">Total Distance</span>
								<span className="text-14-medium color-text">
									{distance
										? `${distance.km} km / ${distance.miles} miles`
										: "Not calculated"}
								</span>
							</div>
							<div className="info-route-left">
								<span className="text-14 color-grey">Total Time</span>
								<span className="text-14-medium color-text">
									{duration || "Not calculated"}
								</span>
							</div>
						</div>
					</div>
				)}

				{/* Service Details */}
				{selectedService && (
					<>
						<div className="border-bottom mt-30 mb-25"></div>
						<div className="mt-0">
							<span className="text-14 color-grey">Service</span>
							<br />
							<span className="text-14-medium color-text">
								{selectedService.title}
								<br />
								{formatCapacity(selectedService.capacity)}
							</span>
						</div>
					</>
				)}

				{/* Passenger Details */}
				{passengerDetails && (
					<>
						<div className="border-bottom mt-30 mb-25"></div>
						<div className="mt-0">
							<span className="text-14 color-grey">Passenger</span>
							<br />
							<span className="text-14-medium color-text">
								{`${passengerDetails.firstName} ${passengerDetails.lastName}`}
								<br />
								{passengerDetails.email}
								<br />
								{passengerDetails.phone}
							</span>
						</div>
					</>
				)}

				{/* Extras */}
				{selectedExtras && selectedExtras.length > 0 && (
					<>
						<div className="border-bottom mt-30 mb-25"></div>
						<div className="mt-0">
							<span className="text-14 color-grey">Extra Options</span>
							<br />
							{selectedExtras.map((extra, index) => (
								<span key={index} className="text-14-medium color-text">
									{extra.quantity} x {extra.name} -{" "}
									{formatCurrency(extra.price * extra.quantity)}
									<br />
								</span>
							))}
						</div>
					</>
				)}

				{/* Pricing Summary */}
				{(selectedService || selectedExtras?.length > 0) && (
					<div className="pricing-summary mt-30">
						<ul className="list-prices list-prices-2">
							{/* Base Price */}
							{selectedService && (
								<li>
									<span className="text">Service Price</span>
									<span className="price">
										{formatCurrency(pricing.basePrice)}
									</span>
								</li>
							)}

							{/* Gratuity */}
							{pricing.gratuity > 0 && (
								<li>
									<span className="text">Gratuity (20%)</span>
									<span className="price">
										{formatCurrency(pricing.gratuity)}
									</span>
								</li>
							)}

							{/* Night Fee */}
							{pricing.nightFee > 0 && (
								<li>
									<span className="text">Night Service Fee</span>
									<span className="price">
										{formatCurrency(pricing.nightFee)}
									</span>
								</li>
							)}

							{/* Extras Total */}
							{pricing.extrasPrice > 0 && (
								<li>
									<span className="text">Extras Total</span>
									<span className="price">
										{formatCurrency(pricing.extrasPrice)}
									</span>
								</li>
							)}
						</ul>

						<div className="border-bottom mt-30 mb-15"></div>
						<ul className="list-prices">
							<li>
								<span className="text text-20-medium">Total</span>
								<span className="price text-20-medium">
									{formatCurrency(pricing.totalPrice)}
								</span>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

