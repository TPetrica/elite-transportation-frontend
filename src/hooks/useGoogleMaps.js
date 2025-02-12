// src/hooks/useGoogleMaps.js

import { useState, useEffect } from 'react'
import { loadGoogleMapsScript } from '../utils/googleMapsLoader'

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => setIsLoaded(true))
      .catch(err => setError(err))
  }, [])

  return { isLoaded, error }
}
