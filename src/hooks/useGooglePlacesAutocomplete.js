import { useEffect, useRef, useState } from 'react'
import { useGoogleMaps } from './useGoogleMaps'

export function useGooglePlacesAutocomplete(locationType, selectedService, isGoogleLoaded = false) {
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const { isLoaded: mapsLoaded } = useGoogleMaps()
  const isApiLoaded = isGoogleLoaded || mapsLoaded

  const autocompleteService = useRef(null)
  const placesService = useRef(null)
  const sessionToken = useRef(null)

  useEffect(() => {
    if (!isApiLoaded) return

    try {
      if (!autocompleteService.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService()
      }

      if (!placesService.current) {
        const mapDiv = document.createElement('div')
        const map = new window.google.maps.Map(mapDiv)
        placesService.current = new window.google.maps.places.PlacesService(map)
      }

      if (!sessionToken.current) {
        sessionToken.current = new window.google.maps.places.AutocompleteSessionToken()
      }
    } catch (error) {
      console.error('Error initializing services:', error)
    }
  }, [isApiLoaded])

  useEffect(() => {
    if (!searchInput || !isApiLoaded || !autocompleteService.current) {
      setSuggestions([])
      return
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true)
      try {
        const request = {
          input: searchInput,
          componentRestrictions: { country: 'us' },
          sessionToken: sessionToken.current,
          // Restrict to Salt Lake City / Park City area
          location: new window.google.maps.LatLng(40.7608, -111.891),
          radius: 40000, // 40km radius - covers Salt Lake City and Park City
          strictBounds: true,
        }

        // For "from-airport" pickup, restrict to only airports
        if (selectedService?.id === 'from-airport' && locationType === 'pickup') {
          request.types = ['airport']
        }
        // For "to-airport" dropoff, restrict to only airports
        else if (selectedService?.id === 'to-airport' && locationType === 'dropoff') {
          request.types = ['airport']
        }
        // Otherwise, allow establishments and addresses
        else {
          request.types = ['establishment', 'geocode']
        }

        const results = await new Promise(resolve => {
          autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              resolve(predictions)
            } else {
              resolve([])
            }
          })
        })

        if (results) {
          // Further restrict to SLC/Park City area even if Google returned other places
          const filteredResults = results.filter(place => {
            const description = place.description.toLowerCase()
            return (
              description.includes('salt lake') ||
              description.includes('park city') ||
              description.includes('slc') ||
              description.includes('cottonwood') ||
              description.includes('snowbird') ||
              description.includes('alta') ||
              description.includes('solitude') ||
              description.includes('brighton') ||
              description.includes('sundance') ||
              (description.includes('ut') &&
                (description.includes('salt lake') || description.includes('park city')))
            )
          })
          setSuggestions(filteredResults)
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchInput, locationType, selectedService, isApiLoaded])

  const getDetails = async placeId => {
    if (!placesService.current || !isApiLoaded) return null

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
    isLoaded: isApiLoaded,
  }
}
