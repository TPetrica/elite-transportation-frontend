// src/utils/googleMapsLoader.js

let loadingPromise = null

export function loadGoogleMapsScript() {
  if (loadingPromise) {
    return loadingPromise
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps)
  }

  loadingPromise = new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

      window.initMap = () => {
        resolve(window.google.maps)
      }

      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initMap`
      script.async = true
      script.defer = true

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps'))
      }

      document.head.appendChild(script)
    } catch (error) {
      reject(error)
    }
  })

  return loadingPromise
}
