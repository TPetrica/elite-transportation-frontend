import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import GuestBookingRoute from '@/routes/GuestBookingRoute'

// Loading component for Suspense fallback
const LoadingPage = () => <div className="loading-page">Loading...</div>

// Public Pages - Lazy loaded
const Home = lazy(() => import('@/pages'))
const BlogsGridPage1 = lazy(() => import('@/pages/blogs/blog-grid'))
const BlogsSinglePage = lazy(() => import('@/pages/blogs/blog-single'))
const FleetSinglePage = lazy(() => import('@/pages/fleets/fleet-single'))
const PageNotFoundPage = lazy(() => import('@/pages/page-not-found'))
const AboutPage2 = lazy(() => import('@/pages/pages/about-2'))
const CommingSoonPage = lazy(() => import('@/pages/pages/coming-soon'))
const ContactPage2 = lazy(() => import('@/pages/pages/contact-2'))
const OurTeamPage = lazy(() => import('@/pages/pages/our-team'))
const TeamSinglePage = lazy(() => import('@/pages/pages/team-single'))
const ServiceSinglePage = lazy(() => import('@/pages/services/service-single'))

// Auth Pages - Lazy loaded
const LoginPage = lazy(() => import('@/pages/auth/login'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'))

// Protected Pages - Lazy loaded
const FAQPage = lazy(() => import('@/components/otherPages/faq/FaqPage'))
const BookingExtraPage = lazy(() => import('@/pages/booking/booking-extra'))
const BookingPassengerPage = lazy(() => import('@/pages/booking/booking-passenger'))
const BookingPaymentPage = lazy(() => import('@/pages/booking/booking-payment'))
const BookingReceivedPage = lazy(() => import('@/pages/booking/booking-received'))
const BookingTimePage = lazy(() => import('@/pages/booking/booking-time'))
const InvoicePage = lazy(() => import('@/pages/invoice'))
const CookiePolicyPage = lazy(() => import('@/pages/pages/cookie'))
const PrivacyPolicyPage = lazy(() => import('@/pages/pages/privacy'))
const RatesPage = lazy(() => import('@/pages/pages/rates'))
const TermsAndConditionsPage = lazy(() => import('@/pages/pages/terms'))
const ServiceGridPage1 = lazy(() => import('@/pages/services/service-grid'))

// Dashboard - Lazy loaded
const DashboardLayout = lazy(() => import('@/routes/DashboardLayout'))
const DashboardHome = lazy(() => import('@/pages/dashboard'))
const Services = lazy(() => import('@/pages/dashboard/services'))
const BookingsPage = lazy(() => import('@/pages/dashboard/bookings'))
const EditBookingPage = lazy(() => import('@/pages/dashboard/bookings/EditBookingPage'))
const ExtraServicePage = lazy(() => import('@/pages/dashboard/extras'))
const SchedulePage = lazy(() => import('@/pages/dashboard/schedule'))
const VehiclesPage = lazy(() => import('@/pages/dashboard/vehicles'))
const SettingsPage = lazy(() => import('@/pages/dashboard/settings'))
const BlogsPage = lazy(() => import('@/pages/dashboard/blogs'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        {/* Public Routes */}
        <Route index element={
          <Suspense fallback={<LoadingPage />}>
            <Home />
          </Suspense>
        } />

        {/* Auth Routes */}
        <Route path="login" element={
          <Suspense fallback={<LoadingPage />}>
            <LoginPage />
          </Suspense>
        } />
        <Route path="forgot-password" element={
          <Suspense fallback={<LoadingPage />}>
            <ForgotPasswordPage />
          </Suspense>
        } />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingPage />}>
                <DashboardLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={
            <Suspense fallback={<LoadingPage />}>
              <DashboardHome />
            </Suspense>
          } />
          <Route path="services" element={
            <Suspense fallback={<LoadingPage />}>
              <Services />
            </Suspense>
          } />
          <Route path="bookings" element={
            <Suspense fallback={<LoadingPage />}>
              <BookingsPage />
            </Suspense>
          } />
          <Route path="bookings/edit/:bookingId" element={
            <Suspense fallback={<LoadingPage />}>
              <EditBookingPage />
            </Suspense>
          } />
          <Route path="extras" element={
            <Suspense fallback={<LoadingPage />}>
              <ExtraServicePage />
            </Suspense>
          } />
          <Route path="schedule" element={
            <Suspense fallback={<LoadingPage />}>
              <SchedulePage />
            </Suspense>
          } />
          <Route path="vehicles" element={
            <Suspense fallback={<LoadingPage />}>
              <VehiclesPage />
            </Suspense>
          } />
          <Route path="blogs" element={
            <Suspense fallback={<LoadingPage />}>
              <BlogsPage />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<LoadingPage />}>
              <SettingsPage />
            </Suspense>
          } />
        </Route>

        {/* Public Content Pages */}
        <Route path="privacy-policy" element={
          <Suspense fallback={<LoadingPage />}>
            <PrivacyPolicyPage />
          </Suspense>
        } />
        <Route path="cookie-policy" element={
          <Suspense fallback={<LoadingPage />}>
            <CookiePolicyPage />
          </Suspense>
        } />
        <Route path="terms-and-conditions" element={
          <Suspense fallback={<LoadingPage />}>
            <TermsAndConditionsPage />
          </Suspense>
        } />
        <Route path="faq" element={
          <Suspense fallback={<LoadingPage />}>
            <FAQPage />
          </Suspense>
        } />
        <Route path="about-us" element={
          <Suspense fallback={<LoadingPage />}>
            <AboutPage2 />
          </Suspense>
        } />
        <Route path="contact" element={
          <Suspense fallback={<LoadingPage />}>
            <ContactPage2 />
          </Suspense>
        } />
        <Route path="our-team" element={
          <Suspense fallback={<LoadingPage />}>
            <OurTeamPage />
          </Suspense>
        } />
        <Route path="team-single/:id" element={
          <Suspense fallback={<LoadingPage />}>
            <TeamSinglePage />
          </Suspense>
        } />
        <Route path="rates" element={
          <Suspense fallback={<LoadingPage />}>
            <RatesPage />
          </Suspense>
        } />
        <Route path="coming-soon" element={
          <Suspense fallback={<LoadingPage />}>
            <CommingSoonPage />
          </Suspense>
        } />
        <Route path="fleet" element={
          <Suspense fallback={<LoadingPage />}>
            <FleetSinglePage />
          </Suspense>
        } />
        <Route path="services" element={
          <Suspense fallback={<LoadingPage />}>
            <ServiceGridPage1 />
          </Suspense>
        } />
        <Route path="services/:slug" element={
          <Suspense fallback={<LoadingPage />}>
            <ServiceSinglePage />
          </Suspense>
        } />
        <Route path="blog" element={
          <Suspense fallback={<LoadingPage />}>
            <BlogsGridPage1 />
          </Suspense>
        } />
        <Route path="blog/:slug" element={
          <Suspense fallback={<LoadingPage />}>
            <BlogsSinglePage />
          </Suspense>
        } />

        {/* Redirect from /reservation to /booking-time */}
        <Route path="reservation" element={<Navigate to="/booking-time" replace />} />

        {/* Booking Routes */}
        <Route path="booking-time" element={
          <Suspense fallback={<LoadingPage />}>
            <BookingTimePage />
          </Suspense>
        } />
        <Route path="booking-extra" element={
          <Suspense fallback={<LoadingPage />}>
            <BookingExtraPage />
          </Suspense>
        } />
        <Route path="booking-passenger" element={
          <Suspense fallback={<LoadingPage />}>
            <BookingPassengerPage />
          </Suspense>
        } />
        <Route path="booking-payment" element={
          <Suspense fallback={<LoadingPage />}>
            <BookingPaymentPage />
          </Suspense>
        } />
        <Route
          path="booking-received"
          element={
            <GuestBookingRoute>
              <Suspense fallback={<LoadingPage />}>
                <BookingReceivedPage />
              </Suspense>
            </GuestBookingRoute>
          }
        />

        {/* Invoice Routes */}
        <Route path="invoice/:bookingNumber" element={
          <Suspense fallback={<LoadingPage />}>
            <InvoicePage />
          </Suspense>
        } />
        <Route
          path="invoice"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingPage />}>
                <InvoicePage />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={
          <Suspense fallback={<LoadingPage />}>
            <PageNotFoundPage />
          </Suspense>
        } />
      </Route>
    </Routes>
  )
}

export default AppRoutes
