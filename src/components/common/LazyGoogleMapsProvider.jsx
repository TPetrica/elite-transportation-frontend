import { useState, useEffect, createContext, useContext } from 'react'

// Create a context for Google Maps
const GoogleMapsContext = createContext({
  isLoaded: false,
  error: null,
  mapsInstance: null,
})

// Hook for using the Google Maps context
export const useGoogleMaps = () => useContext(GoogleMapsContext)

// Intersection Observer function to detect when map is needed
const useIntersectionObserver = (elementId, options = {}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = document.getElementById(elementId)
    if (!element) {
      // If element not found, wait and try to find it on next render
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementId, options])

  return isVisible
}

const LazyGoogleMapsProvider = ({ children }) => {
  const [mapsState, setMapsState] = useState({
    isLoaded: false,
    error: null,
    mapsInstance: null,
  })

  // Load Google Maps only when needed - when user scrolls near a map container
  // or when user navigates to a page that needs maps
  const shouldLoadMaps = useIntersectionObserver('map-trigger', { 
    rootMargin: '200px', // Load maps when within 200px
  })

  useEffect(() => {
    if (!shouldLoadMaps || mapsState.isLoaded || mapsState.error) return

    const loadGoogleMaps = () => {
      // Check if Google Maps API is already loaded
      if (window.google && window.google.maps) {
        setMapsState({
          isLoaded: true,
          error: null,
          mapsInstance: window.google.maps,
        })
        return
      }

      // Create script element
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`
      script.async = true
      script.defer = true

      // Handle script load success
      script.onload = () => {
        setMapsState({
          isLoaded: true,
          error: null,
          mapsInstance: window.google.maps,
        })
      }

      // Handle script load error
      script.onerror = () => {
        setMapsState({
          isLoaded: false,
          error: new Error('Failed to load Google Maps API'),
          mapsInstance: null,
        })
      }

      // Add script to document
      document.head.appendChild(script)
    }

    loadGoogleMaps()
  }, [shouldLoadMaps, mapsState.isLoaded, mapsState.error])

  return (
    <GoogleMapsContext.Provider value={mapsState}>
      {/* Invisible element to trigger map loading when scrolled into view */}
      <div id="map-trigger" style={{ height: '1px', width: '1px', opacity: 0 }} />
      {children}
    </GoogleMapsContext.Provider>
  )
}

export default LazyGoogleMapsProvider
