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

export function useGooglePlacesAutocomplete(apiKey, locationType) {
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
					};

					// Handle different location types
					if (locationType === "pickup") {
						request.types = ["establishment", "geocode"];
					} else {
						request.types = ["geocode"];
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

				const filteredResults =
					locationType === "pickup"
						? response.filter(
								(place) =>
									place.types.includes("airport") ||
									place.types.includes("establishment") ||
									place.types.includes("geocode")
						  )
						: response;

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
	}, [searchInput, locationType]);

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
