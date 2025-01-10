import TipCalculator from "@/components/booking/TipCalculator";
import { useBooking } from "@/context/BookingContext";
import { format } from "date-fns";

// Utility functions
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

// Sub-components
const RouteDetails = ({ pickupDetails, dropoffDetails }) => (
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
);

const DateTimeInfo = ({ pickupDetails }) => (
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
);

const DistanceInfo = ({ distance, duration }) => (
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
);

const ServiceInfo = ({ selectedService }) => (
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
);

const PassengerInfo = ({ passengerDetails }) => {
	if (
		!passengerDetails ||
		(!passengerDetails.firstName && !passengerDetails.lastName)
	) {
		return null;
	}

	return (
		<>
			<div className="border-bottom mt-30 mb-25"></div>
			<div className="mt-0">
				<span className="text-14 color-grey">Passenger</span>
				<br />
				<span className="text-14-medium color-text">
					{passengerDetails.firstName && passengerDetails.lastName && (
						<>
							{`${passengerDetails.firstName} ${passengerDetails.lastName}`}
							<br />
						</>
					)}
					{passengerDetails.email && (
						<>
							{passengerDetails.email}
							<br />
						</>
					)}
					{passengerDetails.phone && passengerDetails.phone}
				</span>
			</div>
		</>
	);
};

const ExtrasInfo = ({ selectedExtras }) => {
	if (!selectedExtras?.length) return null;

	return (
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
	);
};

const PricingSummary = ({ pricing, selectedService }) => (
	<>
		<ul className="list-prices list-prices-2">
			{selectedService && (
				<li>
					<span className="text">Service Price</span>
					<span className="price">{formatCurrency(pricing.basePrice)}</span>
				</li>
			)}
			{pricing.gratuity > 0 && (
				<li>
					<span className="text">Gratuity</span>
					<span className="price">{formatCurrency(pricing.gratuity)}</span>
				</li>
			)}
			{pricing.nightFee > 0 && (
				<li>
					<span className="text">Night Service Fee</span>
					<span className="price">{formatCurrency(pricing.nightFee)}</span>
				</li>
			)}
			{pricing.extrasTotal > 0 && (
				<li>
					<span className="text">Extras Total</span>
					<span className="price">{formatCurrency(pricing.extrasTotal)}</span>
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
	</>
);

// Main SideBar component
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
		updatePricing,
	} = useBooking();

	const handleTipChange = (value) => {
		const gratuity = parseFloat(value);
		if (!isNaN(gratuity)) {
			updatePricing({
				gratuity: gratuity,
			});
		}
	};

	return (
		<div className="box-tab-right">
			<div className="sidebar">
				{/* Header */}
				<div className="d-flex align-items-center justify-content-between wow fadeInUp">
					<h6 className="text-20-medium color-text">Ride Summary</h6>
				</div>

				{/* Journey Details */}
				<RouteDetails
					pickupDetails={pickupDetails}
					dropoffDetails={dropoffDetails}
				/>
				<DateTimeInfo pickupDetails={pickupDetails} />

				{/* Distance and Duration */}
				{(distance || duration) && (
					<DistanceInfo distance={distance} duration={duration} />
				)}

				{/* Service Details */}
				{selectedService && <ServiceInfo selectedService={selectedService} />}

				{/* Passenger Details */}
				<PassengerInfo passengerDetails={passengerDetails} />

				{/* Extras */}
				<ExtrasInfo selectedExtras={selectedExtras} />

				{/* Pricing Summary */}
				{(selectedService || selectedExtras?.length > 0) && (
					<div className="pricing-summary mt-30">
						{pricing.basePrice > 0 && (
							<div className="mb-30">
								<TipCalculator
									basePrice={pricing.basePrice}
									onTipChange={handleTipChange}
								/>
							</div>
						)}
						<PricingSummary
							pricing={pricing}
							selectedService={selectedService}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
