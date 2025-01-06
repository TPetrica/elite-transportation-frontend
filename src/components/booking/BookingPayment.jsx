import AuthModal from "@/components/auth/AuthModal";
import SideBar from "@/components/booking/SideBar";
import { useAuth } from "@/context/AuthContext";
import { useBooking } from "@/context/BookingContext";
import PaymentService from "@/services/payment.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BillingForm from "./BillingForm";

export default function BookingPayment() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const {
		pricing,
		pickupDetails,
		dropoffDetails,
		selectedService,
		passengerDetails,
		distance,
		duration,
	} = useBooking();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showAuthModal, setShowAuthModal] = useState(false);

	useEffect(() => {
		if (!passengerDetails) {
			navigate("/booking-passenger");
			return;
		}
	}, []);

	const handlePayment = async (billingDetails) => {
		try {
			setLoading(true);
			setError(null);

			if (!selectedService?.id) {
				throw new Error("Please select a service");
			}

			const cleanPassengerDetails = {
				firstName: passengerDetails.firstName,
				lastName: passengerDetails.lastName,
				phone: passengerDetails.phone,
				passengers: passengerDetails.passengers.toString(),
				luggage: passengerDetails.luggage.toString(),
				email: passengerDetails.email || "",
				notes: passengerDetails.notes || "",
				specialRequirements: passengerDetails.specialRequirements || "",
			};

			const payload = {
				amount: pricing.totalPrice,
				billingDetails,
				bookingData: {
					pickup: {
						...pickupDetails,
						flightNumber: pickupDetails.flightNumber || "",
					},
					dropoff: dropoffDetails,
					distance: {
						km: parseInt(distance.km),
						miles: parseInt(distance.miles),
					},
					duration,
					vehicle: selectedService.id,
					passengerDetails: cleanPassengerDetails,
					email: passengerDetails.email || "",
				},
			};

			const result = await PaymentService.createCheckoutSession(payload);

			if (!result.success) {
				throw new Error(result.error);
			}

			if (result.data.url) {
				window.location.href = result.data.url;
			}
		} catch (err) {
			setError(err.message);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="box-row-tab mt-50 mb-50">
			<div className="box-tab-left">
				<div className="box-content-detail">
					{error && <div className="alert alert-danger mb-30">{error}</div>}

					{!user && (
						<div className="alert alert-info mb-30">
							<p>Want to save your booking details and access them later?</p>
							<div className="mt-3">
								<button
									className="btn btn-primary mr-3"
									onClick={() => setShowAuthModal(true)}
								>
									Sign Up or Log In
								</button>
							</div>
							<p className="mt-2 text-sm">
								You can continue as a guest - your booking details will be sent
								to your email
							</p>
						</div>
					)}

					<BillingForm onSubmit={handlePayment} loading={loading} />
				</div>
			</div>
			<SideBar />

			<AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
		</div>
	);
}

