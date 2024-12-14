import { useLocation } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

const GuestBookingRoute = ({ children }) => {
	const { bookingComplete } = useBooking();
	const location = useLocation();

	// if (!bookingComplete) {
	// 	return <Navigate to="/booking-time" state={{ from: location }} replace />;
	// }

	return children;
};

export default GuestBookingRoute;

