import { useEffect, useRef, useState } from 'react'

const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'

let loadingPromise = null

function loadGoogleMapsScript(apiKey) {
  if (loadingPromise) {
    return loadingPromise
  }

  loadingPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.getElementById(GOOGLE_MAPS_SCRIPT_ID)) {
      if (window.google && window.google.maps) {
        resolve(window.google.maps)
      } else {
        // Wait for existing script to load
        window.initMap = () => resolve(window.google.maps)
      }
      return
    }

    // Create new script if one doesn't exist
    const script = document.createElement('script')
    script.id = GOOGLE_MAPS_SCRIPT_ID

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initMap`
    script.async = true
    script.defer = true

    // Define callback
    window.initMap = () => {
      resolve(window.google.maps)
    }

    script.onerror = () => {
      reject(new Error('Google Maps failed to load'))
    }

    document.head.appendChild(script)
  })

  return loadingPromise
}

export function useGooglePlacesAutocomplete(apiKey, locationType, selectedService) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  const autocompleteService = useRef(null)
  const placesService = useRef(null)
  const sessionToken = useRef(null)

  // Initialize Google Maps services
  useEffect(() => {
    let mounted = true

    const initializeServices = async () => {
      try {
        const maps = await loadGoogleMapsScript(apiKey)
        if (!mounted) return

        if (!autocompleteService.current) {
          autocompleteService.current = new maps.places.AutocompleteService()
        }

        if (!placesService.current) {
          const mapDiv = document.createElement('div')
          const map = new maps.Map(mapDiv)
          placesService.current = new maps.places.PlacesService(map)
        }

        if (!sessionToken.current) {
          sessionToken.current = new maps.places.AutocompleteSessionToken()
        }

        setIsInitialized(true)
      } catch (error) {
        console.error('Error initializing Google Places:', error)
        setIsInitialized(false)
      }
    }

    if (!isInitialized) {
      initializeServices()
    }

    return () => {
      mounted = false
    }
  }, [apiKey, isInitialized])

  // Handle place search
  useEffect(() => {
    if (!searchInput || !isInitialized || !autocompleteService.current) {
      setSuggestions([])
      return
    }

    const searchPlaces = async () => {
      try {
        setLoading(true)
        const request = {
          input: searchInput,
          componentRestrictions: { country: 'us' },
          sessionToken: sessionToken.current,
          location: new window.google.maps.LatLng(40.7608, -111.891),
          radius: 40000,
          strictBounds: true,
        }

        if (selectedService?.id === 'from-airport' && locationType === 'pickup') {
          request.types = ['airport']
        } else if (selectedService?.id === 'to-airport' && locationType === 'dropoff') {
          request.types = ['airport']
        } else {
          request.types = ['establishment', 'geocode']
        }

        const results = await new Promise((resolve, reject) => {
          autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              resolve(predictions)
            } else {
              resolve([])
            }
          })
        })

        if (!results) {
          setSuggestions([])
          return
        }

        // Filter results for SLC/Park City area
        const filteredResults = results.filter(place => {
          const description = place.description.toLowerCase()
          return (
            description.includes('salt lake') ||
            description.includes('park city') ||
            description.includes('slc') ||
            description.includes('ut')
          )
        })

        setSuggestions(filteredResults)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimeout = setTimeout(searchPlaces, 300)

    return () => clearTimeout(debounceTimeout)
  }, [searchInput, locationType, selectedService, isInitialized])

  const getDetails = async placeId => {
    if (!placesService.current || !isInitialized) return null

    try {
      return await new Promise((resolve, reject) => {
        placesService.current.getDetails(
          {
            placeId,
            fields: ['formatted_address', 'geometry', 'name', 'types'],
            sessionToken: sessionToken.current,
          },
          (result, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              resolve(result)
            } else {
              reject(new Error('Failed to get place details'))
            }
          }
        )
      })
    } catch (error) {
      console.error('Error getting place details:', error)
      return null
    }
  }

  return {
    suggestions,
    loading,
    getDetails,
    setSearchInput,
    isInitialized,
  }
}
