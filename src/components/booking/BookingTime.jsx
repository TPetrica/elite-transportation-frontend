import PlacePicker from "@/components/common/PlacePicker";
import { useBooking } from "@/context/BookingContext";
import calendarService from "@/services/calendar.service";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const services = [
	{
		id: "from-airport",
		title: "From Airport",
		description: "Airport pickup with flight tracking",
	},
	{
		id: "to-airport",
		title: "To Airport",
		description: "Airport dropoff service",
	},
	{
		id: "round-trip",
		title: "Round Trip",
		description: "Two-way transportation service",
	},
	{
		id: "hourly",
		title: "Hourly Service",
		description: "2 hour minimum - $100/h",
	},
	{
		id: "group",
		title: "Group Transportation",
		description: "Up to 7 passengers",
	},
];

export default function BookingTime() {
	const navigate = useNavigate();
	const {
		setPickupDetails,
		setDropoffDetails,
		pickupDetails,
		dropoffDetails,
		selectedDate,
		selectedTime,
		setSelectedDate,
		setSelectedTime,
		setDistanceAndDuration,
		setSelectedService,
		selectedService,
	} = useBooking();

	const [error, setError] = useState("");
	const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [flightNumber, setFlightNumber] = useState("");
	const [flightTime, setFlightTime] = useState("");

	useEffect(() => {
		const calculateDistance = async () => {
			if (
				pickupDetails?.coordinates &&
				dropoffDetails?.coordinates &&
				window.google
			) {
				const service = new window.google.maps.DistanceMatrixService();

				try {
					const response = await service.getDistanceMatrix({
						origins: [pickupDetails.coordinates],
						destinations: [dropoffDetails.coordinates],
						travelMode: "DRIVING",
						unitSystem: window.google.maps.UnitSystem.METRIC,
					});

					if (response.rows[0]?.elements[0]?.status === "OK") {
						const distanceValue = response.rows[0].elements[0].distance;
						const durationValue = response.rows[0].elements[0].duration;

						setDistanceAndDuration({
							distance: {
								km: Math.round(distanceValue.value / 1000),
								miles: Math.round(distanceValue.value / 1609.34),
							},
							duration: durationValue.text,
						});
					}
				} catch (error) {
					console.error("Error calculating distance:", error);
					setError("Error calculating distance. Please try again.");
				}
			}
		};

		calculateDistance();
	}, [pickupDetails?.coordinates, dropoffDetails?.coordinates]);

	useEffect(() => {
		const fetchAvailableTimeSlots = async () => {
			if (!selectedDate) return;

			setIsLoading(true);
			setError("");

			const result = await calendarService.getAvailableTimeSlots(selectedDate);

			if (result.success) {
				const formattedSlots = calendarService.formatAvailableSlots(
					result.data
				);
				setAvailableTimeSlots(formattedSlots);
			} else {
				setError(result.error || "Error fetching available times");
			}

			setIsLoading(false);
		};

		fetchAvailableTimeSlots();
	}, [selectedDate]);

	const handleServiceSelect = (event) => {
		const service = services.find((s) => s.id === event.target.value);
		setSelectedService(service);
	};

	const handleDateSelect = (date) => {
		const momentDate = moment(date.toDate());
		setSelectedDate(momentDate);
		setSelectedTime(null);
		setPickupDetails({
			...pickupDetails,
			date: momentDate.format("YYYY-MM-DD"),
		});
	};

	const handleTimeSelect = async (time) => {
		setError("");

		try {
			const result = await calendarService.checkAvailability(
				selectedDate,
				time
			);

			if (result.success && result.data) {
				setSelectedTime(time);
				setPickupDetails({
					...pickupDetails,
					time: time,
				});
			} else {
				setError("This time slot is no longer available");
				const slotsResult = await calendarService.getAvailableTimeSlots(
					selectedDate
				);
				if (slotsResult.success) {
					setAvailableTimeSlots(
						calendarService.formatAvailableSlots(slotsResult.data)
					);
				}
			}
		} catch (error) {
			console.error("Error selecting time:", error);
			setError("Failed to verify time slot availability");
		}
	};

	const handleFromLocationChange = (location) => {
		setPickupDetails({
			...pickupDetails,
			address: location.address,
			coordinates: location.coordinates,
		});
	};

	const handleToLocationChange = (location) => {
		setDropoffDetails({
			...dropoffDetails,
			address: location.address,
			coordinates: location.coordinates,
		});
	};

	const canProceed = () => {
		if (!selectedService) {
			return false;
		}

		return Boolean(
			pickupDetails?.address &&
				dropoffDetails?.address &&
				pickupDetails?.date &&
				pickupDetails?.time
		);
	};

	const handleContinue = async () => {
		if (!canProceed()) {
			setError("Please fill in all required fields");
			return;
		}

		try {
			const result = await calendarService.checkAvailability(
				pickupDetails.date,
				pickupDetails.time
			);

			if (!result.success || !result.data) {
				setError(
					"Selected time slot is no longer available. Please choose another time."
				);
				return;
			}

			navigate("/booking-extra");
		} catch (error) {
			console.error("Error proceeding to next step:", error);
			setError("Failed to verify time slot availability");
		}
	};

	return (
		<div className="box-row-tab mt-50 mb-50 booking-page">
			<div className="box-tab-left">
				<div className="box-content-detail">
					<div className="box-booking-form">
						<div className="booking-grid">
							{/* Service Type Selection */}
							<div className="form-field">
								<span className="field-label">Select Service Type</span>
								<select
									className="form-control"
									value={selectedService?.id || ""}
									onChange={handleServiceSelect}
								>
									<option value="">Select a service</option>
									{services.map((service) => (
										<option key={service.id} value={service.id}>
											{service.title}
										</option>
									))}
								</select>
							</div>

							<div className="location-section">
								<div className="form-field">
									<span className="field-label">Pickup Location</span>
									<div className="input-with-icon">
										<i className="icon-from"></i>
										<PlacePicker
											value={pickupDetails?.address}
											onChange={handleFromLocationChange}
											type="pickup"
											placeholder="Enter pickup location"
										/>
									</div>
								</div>
								<div className="form-field">
									<span className="field-label">Drop-off Location</span>
									<div className="input-with-icon">
										<i className="icon-to"></i>
										<PlacePicker
											value={dropoffDetails?.address}
											onChange={handleToLocationChange}
											type="dropoff"
											placeholder="Enter drop-off location"
										/>
									</div>
								</div>
							</div>

							<div className="datetime-section">
								<div className="calendar-section">
									<span className="field-label">Select Date</span>
									<DatePicker
										value={selectedDate ? selectedDate.toDate() : null}
										onChange={handleDateSelect}
										format="MMMM DD YYYY"
										minDate={new Date()}
										className="custom-datepicker"
										placeholder="Select the date"
									/>
								</div>

								<div className="time-slots">
									<h5>Available Times</h5>
									{isLoading ? (
										<div className="loading">Loading available times...</div>
									) : availableTimeSlots.length > 0 ? (
										<div className="slots-grid">
											{availableTimeSlots.map((slot) => (
												<button
													key={slot.time}
													className={`time-slot ${
														selectedTime === slot.time ? "selected" : ""
													}`}
													onClick={() => handleTimeSelect(slot.time)}
												>
													{slot.formattedTime}
												</button>
											))}
										</div>
									) : (
										<div className="no-slots">
											No available time slots for this date
										</div>
									)}
								</div>
							</div>
						</div>

						{error && (
							<div className="error-message">
								<span>{error}</span>
							</div>
						)}

						<button
							className="continue-btn"
							onClick={handleContinue}
							disabled={!canProceed()}
						>
							Continue to Vehicle Selection
						</button>
					</div>
				</div>
			</div>
			<SideBar />
		</div>
	);
}

