import { GoogleMapsScript } from "@/hooks/googleMapsScript";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WOW from "wow.js";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import AppRoutes from "./routes/AppRoutes";
import "./styles/style.scss";

function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		if (typeof window !== "undefined") {
			import("bootstrap/dist/js/bootstrap.esm").then(() => {
				// Module is imported
			});
		}
	}, []);

	useEffect(() => {
		new WOW({
			live: false,
		}).init();
	}, [pathname]);

	return (
		<AuthProvider>
			<GoogleMapsScript />
			<BookingProvider>
				<AppRoutes />
				<ScrollTopBehaviour />
			</BookingProvider>
		</AuthProvider>
	);
}

export default App;

