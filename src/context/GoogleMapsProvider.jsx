import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export function GoogleMapsProvider({ children }) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (loadError) {
		return <div>Error loading maps</div>;
	}

	if (!isLoaded) {
		return <div>Loading maps...</div>;
	}

	return children;
}
