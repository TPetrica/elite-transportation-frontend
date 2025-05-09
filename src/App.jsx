import { useEffect, lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import WOW from 'wow.js'
import ScrollTopBehaviour from './components/common/ScrollTopBehaviour'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import './styles/style.scss'

// Lazy load Google Maps hook to avoid loading the API on initial page load
const LazyGoogleMapsProvider = lazy(() => import('./components/common/LazyGoogleMapsProvider'))

// Lazy load routes
const AppRoutes = lazy(() => import('./routes/AppRoutes'))

function App() {
  const { pathname } = useLocation()

  // Lazy load Bootstrap
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use a more specific import to reduce bundle size
      const loadBootstrap = () => import('bootstrap/dist/js/bootstrap.esm')
      
      // Only load Bootstrap after the page is fully loaded
      if (document.readyState === 'complete') {
        loadBootstrap()
      } else {
        window.addEventListener('load', loadBootstrap)
        return () => window.removeEventListener('load', loadBootstrap)
      }
    }
  }, [])

  // Initialize WOW.js for animations when pathname changes
  useEffect(() => {
    // Defer WOW initialization until after critical content is loaded
    const timer = setTimeout(() => {
      new WOW({
        live: false,
        offset: 100,
      }).init()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [pathname])

  // Defer loading Google Analytics scripts
  useEffect(() => {
    // Load analytics after the page is fully loaded
    const loadAnalytics = () => {
      // Only load analytics in production
      if (process.env.NODE_ENV === 'production') {
        const script = document.createElement('script')
        script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-1695104702'
        script.async = true
        document.head.appendChild(script)
        
        script.onload = () => {
          window.dataLayer = window.dataLayer || []
          function gtag() { dataLayer.push(arguments) }
          gtag('js', new Date())
          gtag('config', 'G-C348R6D3XH')
          gtag('config', 'AW-1695104702')
        }
      }
    }
    
    window.addEventListener('load', loadAnalytics)
    return () => window.removeEventListener('load', loadAnalytics)
  }, [])

  return (
    <AuthProvider>
      <BookingProvider>
        <Suspense fallback={<div className="loading-app">Loading...</div>}>
          <LazyGoogleMapsProvider>
            <AppRoutes />
            <ScrollTopBehaviour />
          </LazyGoogleMapsProvider>
        </Suspense>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App
