import { useBooking } from "@/context/BookingContext";
import PaymentService from "@/services/payment.service";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function BookingReceived() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { setBookingNumber } = useBooking();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sessionData, setSessionData] = useState(null);

	useEffect(() => {
		const sessionId = searchParams.get("session_id");
		if (!sessionId) {
			setError("No session ID found");
			setLoading(false);
			return;
		}

		const verifySession = async () => {
			try {
				const result = await PaymentService.getSession(sessionId);
				if (result.success) {
					setSessionData(result.data);
					if (result.data.bookingDetails?.bookingNumber) {
						setBookingNumber(result.data.bookingDetails.bookingNumber);
					}
				} else {
					throw new Error(result.error);
				}
			} catch (err) {
				setError(err.message);
				setTimeout(() => navigate("/booking-payment"), 3000);
			} finally {
				setLoading(false);
			}
		};

		verifySession();
	}, [searchParams, navigate]);

	if (loading) return <div className="spinner" />;
	if (error) return <div className="error">{error}</div>;
	if (!sessionData?.bookingDetails) return <div>No booking details found</div>;

	const { bookingDetails } = sessionData;

	return (
		<section className="section">
			<div className="container-sub">
				<div className="box-completed-booking">
					{/* Header */}
					<div className="text-center wow fadeInUp">
						<img
							className="mb-20"
							src="/assets/imgs/page/booking/completed.png"
							alt="luxride"
						/>
						<h4 className="heading-24-medium color-text mb-10">
							Your booking was submitted successfully!
						</h4>
						<p className="text-14 color-grey mb-40">
							Booking details has been sent to: {sessionData.email}
						</p>
					</div>

					{/* Booking Info */}
					<div className="box-info-book-border wow fadeInUp">
						<div className="info-1">
							<span className="color-text text-14">Booking Number</span>
							<br />
							<span className="color-text text-14-medium">
								{bookingDetails.bookingNumber}
							</span>
						</div>
						<div className="info-1">
							<span className="color-text text-14">Total Amount</span>
							<br />
							<span className="color-text text-14-medium">
								${sessionData.amount.toFixed(2)}
							</span>
						</div>
						<div className="info-1">
							<span className="color-text text-14">Date</span>
							<br />
							<span className="color-text text-14-medium">
								{new Date().toLocaleDateString()}
							</span>
						</div>
						<div className="info-1">
							<span className="color-text text-14">Payment Method</span>
							<br />
							<span className="color-text text-14-medium">Credit Card</span>
						</div>
					</div>

					{/* Reservation Details */}
					<div className="box-booking-border wow fadeInUp">
						<h6 className="heading-20-medium color-text">
							Reservation Information
						</h6>
						<ul className="list-prices">
							<li>
								<span className="text-top">Pick Up Address</span>
								<span className="text-bottom">
									{bookingDetails.pickupAddress}
								</span>
							</li>
							<li>
								<span className="text-top">Drop Off Address</span>
								<span className="text-bottom">
									{bookingDetails.dropoffAddress}
								</span>
							</li>
							<li>
								<span className="text-top">Pick Up Date</span>
								<span className="text-bottom">
									{new Date(bookingDetails.pickupDate).toLocaleDateString()}
								</span>
							</li>
							<li>
								<span className="text-top">Pick Up Time</span>
								<span className="text-bottom">{bookingDetails.pickupTime}</span>
							</li>
							<li>
								<span className="text-top">Distance</span>
								<span className="text-bottom">{bookingDetails.distance}</span>
							</li>
							<li>
								<span className="text-top">Duration</span>
								<span className="text-bottom">{bookingDetails.duration}</span>
							</li>
						</ul>
					</div>

					{/* Vehicle Details */}
					{bookingDetails.vehicle && (
						<div className="box-booking-border wow fadeInUp">
							<h6 className="heading-20-medium color-text">Selected Vehicle</h6>
							<div className="mt-20 mb-20 text-center">
								<img
									src={bookingDetails.vehicle.image}
									alt={bookingDetails.vehicle.name}
								/>
							</div>
							<ul className="list-prices">
								<li>
									<span className="text-top">Class</span>
									<span className="text-bottom">
										{bookingDetails.vehicle.class}
									</span>
								</li>
								<li>
									<span className="text-top">Vehicle</span>
									<span className="text-bottom">
										{bookingDetails.vehicle.name}
									</span>
								</li>
							</ul>
						</div>
					)}

					{/* Passenger Details */}
					{bookingDetails.passengerDetails && (
						<div className="box-booking-border wow fadeInUp">
							<h6 className="heading-20-medium color-text">
								Passenger Information
							</h6>
							<ul className="list-prices">
								<li>
									<span className="text-top">Name</span>
									<span className="text-bottom">
										{bookingDetails.passengerDetails.firstName}{" "}
										{bookingDetails.passengerDetails.lastName}
									</span>
								</li>
								<li>
									<span className="text-top">Phone</span>
									<span className="text-bottom">
										{bookingDetails.passengerDetails.phone}
									</span>
								</li>
								<li>
									<span className="text-top">Passengers</span>
									<span className="text-bottom">
										{bookingDetails.passengerDetails.passengers}
									</span>
								</li>
								<li>
									<span className="text-top">Luggage</span>
									<span className="text-bottom">
										{bookingDetails.passengerDetails.luggage}
									</span>
								</li>
								{bookingDetails.passengerDetails.specialRequirements && (
									<li>
										<span className="text-top">Special Requirements</span>
										<span className="text-bottom">
											{bookingDetails.passengerDetails.specialRequirements}
										</span>
									</li>
								)}
							</ul>
						</div>
					)}

					{/* Return Home Button */}
					<div className="text-center mt-30">
						<button onClick={() => navigate("/")} className="btn btn-primary">
							Return to Home
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

