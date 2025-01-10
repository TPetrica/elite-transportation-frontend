import { useEffect, useRef, useState } from "react";

let loadingPromise = null;

function loadGoogleMapsScript(apiKey) {
	if (loadingPromise) {
		return loadingPromise;
	}

	loadingPromise = new Promise((resolve, reject) => {
		if (window.google && window.google.maps) {
			resolve(window.google.maps);
			return;
		}

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
		script.defer = true;
		script.async = true;

		script.onload = () => {
			if (window.google && window.google.maps) {
				resolve(window.google.maps);
			} else {
				reject(new Error("Google Maps failed to load"));
			}
		};

		script.onerror = () => {
			reject(new Error("Google Maps failed to load"));
		};

		document.head.appendChild(script);
	});

	return loadingPromise;
}

export function useGooglePlacesAutocomplete(
	apiKey,
	locationType,
	selectedService
) {
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const autocompleteService = useRef(null);
	const placesService = useRef(null);
	const sessionToken = useRef(null);

	useEffect(() => {
		let mounted = true;

		const initializeServices = async () => {
			try {
				const maps = await loadGoogleMapsScript(apiKey);
				if (!mounted) return;

				if (!autocompleteService.current) {
					autocompleteService.current = new maps.places.AutocompleteService();
				}
				if (!placesService.current) {
					placesService.current = new maps.places.PlacesService(
						document.createElement("div")
					);
				}
				if (!sessionToken.current) {
					sessionToken.current = new maps.places.AutocompleteSessionToken();
				}
			} catch (error) {
				console.error("Error initializing Google Places:", error);
			}
		};

		initializeServices();

		return () => {
			mounted = false;
			sessionToken.current = null;
		};
	}, [apiKey]);

	useEffect(() => {
		if (!searchInput) {
			setSuggestions([]);
			return;
		}

		const searchPlaces = async () => {
			if (!autocompleteService.current) return;

			try {
				setLoading(true);
				const response = await new Promise((resolve) => {
					const request = {
						input: searchInput,
						componentRestrictions: { country: "us" },
						sessionToken: sessionToken.current,
						location: new window.google.maps.LatLng(40.7608, -111.891), // Center of SLC area
						radius: 40000, // ~25 miles
						strictBounds: true,
					};

					// Set types based on service type and location type
					if (
						selectedService?.id === "from-airport" &&
						locationType === "pickup"
					) {
						request.types = ["airport"];
					} else if (
						selectedService?.id === "to-airport" &&
						locationType === "dropoff"
					) {
						request.types = ["airport"];
					} else {
						request.types = ["establishment", "geocode"];
					}

					autocompleteService.current.getPlacePredictions(
						request,
						(results, status) => {
							if (
								status === window.google.maps.places.PlacesServiceStatus.OK &&
								results
							) {
								resolve(results);
							} else {
								resolve([]);
							}
						}
					);
				});

				// Filter results for SLC/Park City area
				const filteredResults = response.filter((place) => {
					const description = place.description.toLowerCase();
					return (
						description.includes("salt lake") ||
						description.includes("park city") ||
						description.includes("slc") ||
						description.includes("ut")
					);
				});

				setSuggestions(filteredResults);
			} catch (error) {
				console.error("Error fetching suggestions:", error);
				setSuggestions([]);
			} finally {
				setLoading(false);
			}
		};

		const debounceTimeout = setTimeout(searchPlaces, 300);

		return () => {
			clearTimeout(debounceTimeout);
		};
	}, [searchInput, locationType, selectedService]);

	const getDetails = async (placeId) => {
		if (!placesService.current) return null;

		try {
			return await new Promise((resolve, reject) => {
				placesService.current.getDetails(
					{
						placeId,
						fields: ["formatted_address", "geometry", "name", "types"],
						sessionToken: sessionToken.current,
					},
					(result, status) => {
						if (status === window.google.maps.places.PlacesServiceStatus.OK) {
							resolve(result);
						} else {
							reject(new Error("Failed to get place details"));
						}
					}
				);
			});
		} catch (error) {
			console.error("Error getting place details:", error);
			return null;
		}
	};

	return {
		suggestions,
		loading,
		getDetails,
		setSearchInput,
	};
}
