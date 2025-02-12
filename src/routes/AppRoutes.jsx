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
import DashboardLayout from '@/routes/DashboardLayout'
import DashboardHome from '@/pages/dashboard'
import Services from '@/pages/dashboard/services'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        {/* Public Routes */}
        <Route index element={<Home />} />
        {/* <Route path="home-1" element={<HomePage1 />} />
				<Route path="home-2" element={<HomePage2 />} />
				<Route path="home-3" element={<HomePage3 />} />
				<Route path="home-4" element={<HomePage4 />} />
				<Route path="home-5" element={<HomePage5 />} />
				<Route path="home-6" element={<HomePage6 />} />
				<Route path="home-7" element={<HomePage7 />} />
				<Route path="home-8" element={<HomePage8 />} />
				<Route path="home-9" element={<HomePage9 />} />
				<Route path="home-10" element={<HomePage10 />} /> */}

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="services" element={<Services />} />
          {/* <Route path="bookings" element={<Bookings />} />
          <Route path="extras" element={<Extras />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="settings" element={<Settings />} /> */}
        </Route>

        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="cookie-policy" element={<CookiePolicyPage />} />
        <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="about-us" element={<AboutPage2 />} />
        {/* <Route path="contact" element={<ContactPage1 />} /> */}
        <Route path="contact" element={<ContactPage2 />} />
        <Route path="our-team" element={<OurTeamPage />} />
        <Route path="team-single/:id" element={<TeamSinglePage />} />
        {/* <Route path="register" element={<RegisterPage />} />
				<Route path="login" element={<LoginPage />} /> */}
        <Route path="rates" element={<RatesPage />} />
        <Route path="coming-soon" element={<CommingSoonPage />} />

        {/* <Route path="fleet-list" element={<FleetListPage1 />} />
				<Route path="fleet-list-2" element={<FleetListPage2 />} />
				<Route path="fleet-list-3" element={<FleetListPage3 />} />
				<Route path="fleet-list-4" element={<FleetListPage4 />} /> */}
        <Route path="fleet" element={<FleetSinglePage />} />

        <Route path="services" element={<ServiceGridPage1 />} />
        {/* <Route path="service-grid-2" element={<ServiceGridPage2 />} />
        <Route path="service-grid-3" element={<ServiceGridPage3 />} /> */}
        <Route path="service-single/:id" element={<ServiceSinglePage />} />

        <Route path="blog" element={<BlogsGridPage1 />} />
        {/* <Route path="blog-grid-2" element={<BlogsGridPage2 />} />
				<Route path="blog-list" element={<BlogsListPage />} /> */}
        <Route path="blog-single/:id" element={<BlogsSinglePage />} />

        {/* Redirect from /reservation to /booking-time */}
        <Route path="reservation" element={<Navigate to="/booking-time" replace />} />

        {/* Protected Routes */}
        <Route path="booking-time" element={<BookingTimePage />} />
        {/* <Route path="booking-service" element={<BookingVehiclePage />} /> */}
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
