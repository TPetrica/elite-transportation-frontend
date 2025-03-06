import { useBooking } from '@/context/BookingContext'
import PaymentService from '@/services/payment.service'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function BookingReceived() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setBookingNumber } = useBooking()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sessionData, setSessionData] = useState(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      setError('No session ID found')
      setLoading(false)
      return
    }

    const verifySession = async () => {
      try {
        const result = await PaymentService.getSession(sessionId)
        if (result.success) {
          setSessionData(result.data)
          if (result.data.bookingDetails?.bookingNumber) {
            setBookingNumber(result.data.bookingDetails.bookingNumber)
          }
        } else {
          throw new Error(result.error)
        }
      } catch (err) {
        setError(err.message)
        setTimeout(() => navigate('/booking-payment'), 3000)
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [searchParams, navigate, setBookingNumber])

  if (loading) return <div className="spinner" />
  if (error) return <div className="error">{error}</div>
  if (!sessionData?.bookingDetails) return <div>No booking details found</div>

  return (
    <section className="section">
      <div className="container-sub">
        <div className="box-completed-booking">
          {/* Header */}
          <div className="text-center wow fadeInUp">
            <img className="mb-20" src="/assets/imgs/page/booking/completed.png" alt="luxride" />
            <h4 className="heading-24-medium color-text mb-10">
              Your booking was submitted successfully!
            </h4>
            <p className="text-14 color-grey mb-40">
              Booking details has been sent to: {sessionData.email}
            </p>
          </div>

          {/* Booking Info - Simplified */}
          <div className="box-info-book-border wow fadeInUp">
            <div className="info-1">
              <span className="color-text text-14">Booking Number</span>
              <br />
              <span className="color-text text-14-medium">
                {sessionData.bookingDetails.bookingNumber}
              </span>
            </div>
            <div className="info-1">
              <span className="color-text text-14">Total Amount</span>
              <br />
              <span className="color-text text-14-medium">${sessionData.amount.toFixed(2)}</span>
            </div>
            <div className="info-1">
              <span className="color-text text-14">Date</span>
              <br />
              <span className="color-text text-14-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="text-center mt-20 mb-30">
            <p className="text-14 color-grey">
              Thank you for your reservation! All booking details have been sent to your email.
              <br />
              If you have any questions, please contact our customer service.
            </p>
          </div>

          {/* Return Home Button */}
          <div className="text-center mt-30">
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
