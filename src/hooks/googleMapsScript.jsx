import { useEffect } from "react";

export const GoogleMapsScript = () => {
	useEffect(() => {
		// Only add the script if it hasn't been added yet
		if (!window.google) {
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=${
				import.meta.env.VITE_GOOGLE_MAPS_API_KEY
			}&libraries=places,geometry`;
			script.async = true;
			script.defer = true;
			document.head.appendChild(script);

			return () => {
				document.head.removeChild(script);
			};
		}
	}, []);

	return null;
};
