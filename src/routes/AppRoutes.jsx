import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

// Public Pages
import Home from '@/pages'
import BlogsGridPage1 from '@/pages/blogs/blog-grid'
import BlogsSinglePage from '@/pages/blogs/blog-single'
import FleetSinglePage from '@/pages/fleets/fleet-single'
import PageNotFoundPage from '@/pages/page-not-found'
import AboutPage2 from '@/pages/pages/about-2'
import CommingSoonPage from '@/pages/pages/coming-soon'
import ContactPage2 from '@/pages/pages/contact-2'
import OurTeamPage from '@/pages/pages/our-team'
import TeamSinglePage from '@/pages/pages/team-single'
import ServiceSinglePage from '@/pages/services/service-single'

// Auth Pages
import LoginPage from '@/pages/auth/login'
import ForgotPasswordPage from '@/pages/auth/forgot-password'

// Protected Pages
import FAQPage from '@/components/otherPages/faq/FaqPage'
import BookingExtraPage from '@/pages/booking/booking-extra'
import BookingPassengerPage from '@/pages/booking/booking-passenger'
import BookingPaymentPage from '@/pages/booking/booking-payment'
import BookingReceivedPage from '@/pages/booking/booking-received'
import BookingTimePage from '@/pages/booking/booking-time'
import InvoicePage from '@/pages/invoice'
import CookiePolicyPage from '@/pages/pages/cookie'
import PrivacyPolicyPage from '@/pages/pages/privacy'
import RatesPage from '@/pages/pages/rates'
import TermsAndConditionsPage from '@/pages/pages/terms'
import ServiceGridPage1 from '@/pages/services/service-grid'
import GuestBookingRoute from '@/routes/GuestBookingRoute'

// Dashboard
import DashboardLayout from '@/routes/DashboardLayout'
import DashboardHome from '@/pages/dashboard'
import Services from '@/pages/dashboard/services'
import BookingsPage from '@/pages/dashboard/bookings'
import EditBookingPage from '@/pages/dashboard/bookings/EditBookingPage'
import ExtraServicePage from '@/pages/dashboard/extras'
import SchedulePage from '@/pages/dashboard/schedule'
import VehiclesPage from '@/pages/dashboard/vehicles'
import SettingsPage from '@/pages/dashboard/settings'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        {/* Public Routes */}
        <Route index element={<Home />} />

        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="services" element={<Services />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="bookings/edit/:bookingId" element={<EditBookingPage />} />
          <Route path="extras" element={<ExtraServicePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Public Content Pages */}
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="cookie-policy" element={<CookiePolicyPage />} />
        <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="about-us" element={<AboutPage2 />} />
        <Route path="contact" element={<ContactPage2 />} />
        <Route path="our-team" element={<OurTeamPage />} />
        <Route path="team-single/:id" element={<TeamSinglePage />} />
        <Route path="rates" element={<RatesPage />} />
        <Route path="coming-soon" element={<CommingSoonPage />} />
        <Route path="fleet" element={<FleetSinglePage />} />
        <Route path="services" element={<ServiceGridPage1 />} />
        <Route path="service-single/:id" element={<ServiceSinglePage />} />
        <Route path="blog" element={<BlogsGridPage1 />} />
        <Route path="blog-single/:id" element={<BlogsSinglePage />} />

        {/* Redirect from /reservation to /booking-time */}
        <Route path="reservation" element={<Navigate to="/booking-time" replace />} />

        {/* Booking Routes */}
        <Route path="booking-time" element={<BookingTimePage />} />
        <Route path="booking-extra" element={<BookingExtraPage />} />
        <Route path="booking-passenger" element={<BookingPassengerPage />} />
        <Route path="booking-payment" element={<BookingPaymentPage />} />
        <Route
          path="booking-received"
          element={
            <GuestBookingRoute>
              <BookingReceivedPage />
            </GuestBookingRoute>
          }
        />

        {/* Invoice Routes */}
        <Route path="invoice/:bookingNumber" element={<InvoicePage />} />
        <Route
          path="invoice"
          element={
            <ProtectedRoute>
              <InvoicePage />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<PageNotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
