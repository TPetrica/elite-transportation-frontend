import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WOW from 'wow.js'
import ScrollTopBehaviour from './components/common/ScrollTopBehaviour'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { useGoogleMaps } from './hooks/useGoogleMaps'
import AppRoutes from './routes/AppRoutes'
import './styles/style.scss'

function App() {
  const { pathname } = useLocation()
  const { isLoaded, error } = useGoogleMaps()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.esm')
    }
  }, [])

  useEffect(() => {
    new WOW({
      live: false,
    }).init()
  }, [pathname])

  if (error) {
    console.error('Google Maps failed to load:', error)
  }

  return (
    <AuthProvider>
      <BookingProvider>
        <AppRoutes />
        <ScrollTopBehaviour />
      </BookingProvider>
    </AuthProvider>
  )
}

export default App
