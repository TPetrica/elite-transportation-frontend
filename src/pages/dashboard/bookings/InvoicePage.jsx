import React, { useState, useEffect, useRef } from 'react'
import { Card, Button, Space, Spin, message, Tooltip } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Printer,
  Download,
  Mail,
  Eye,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import ApiService from '@/services/api.service'

const InvoicePage = () => {
  const { bookingNumber } = useParams()
  const navigate = useNavigate()
  const [invoiceData, setInvoiceData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const printRef = useRef()

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoading(true)
        const response = await ApiService.get(`/bookings/invoice/${bookingNumber}`)
        setInvoiceData(response.data)
      } catch (error) {
        console.error('Error fetching invoice:', error)
        setError(
          'Failed to load invoice. The booking may not exist or you may not have permission to view it.'
        )
        message.error('Failed to load invoice')
      } finally {
        setLoading(false)
      }
    }

    if (bookingNumber) {
      fetchInvoiceData()
    }
  }, [bookingNumber])

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice-${bookingNumber}`,
    onAfterPrint: () => message.success('Invoice printed successfully'),
  })

  const handleDownload = () => {
    handlePrint()
  }

  const handleSendEmail = async () => {
    if (!invoiceData?.booking?.id) {
      message.error('Unable to send email - booking ID not found')
      return
    }
    
    try {
      setSendingEmail(true)
      await ApiService.post(`/bookings/${invoiceData.booking.id}/resend-invoice`)
      message.success('Invoice email sent successfully')
    } catch (error) {
      console.error('Error sending invoice:', error)
      message.error('Failed to send invoice email')
    } finally {
      setSendingEmail(false)
    }
  }

  const handleViewBooking = () => {
    navigate(`/dashboard/bookings`)
  }

  const copyLinkToClipboard = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
    message.success('Invoice link copied to clipboard')
  }

  if (loading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-screen">
        <Spin size="large" tip="Loading invoice..." />
      </div>
    )
  }

  if (error || !invoiceData) {
    return (
      <div className="tw-p-6">
        <Card>
          <div className="tw-text-center tw-py-8">
            <div className="tw-text-6xl tw-text-gray-400 tw-mb-4">📄</div>
            <h2 className="tw-text-xl tw-font-semibold tw-mb-2">Invoice Not Found</h2>
            <p className="tw-text-gray-600 tw-mb-6">{error || 'The requested invoice could not be found.'}</p>
            <Button type="primary" icon={<ArrowLeft size={16} />} onClick={() => navigate('/dashboard/bookings')}>
              Back to Bookings
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Action Buttons - Only show if logged in */}
        {isLoggedIn && (
          <div style={{ 
            marginBottom: '20px', 
            padding: '16px', 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Tooltip title="Back to bookings dashboard">
                  <Button 
                    icon={<ArrowLeft size={16} />} 
                    onClick={handleViewBooking}
                  >
                    Back to Bookings
                  </Button>
                </Tooltip>

                <Tooltip title="View booking details">
                  <Button 
                    icon={<Eye size={16} />} 
                    onClick={handleViewBooking}
                  >
                    View Booking
                  </Button>
                </Tooltip>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <Tooltip title="Copy invoice link">
                  <Button 
                    icon={<ExternalLink size={16} />} 
                    onClick={copyLinkToClipboard}
                  >
                    Copy Link
                  </Button>
                </Tooltip>

                {invoiceData?.hasPayment && (
                  <Tooltip title="Send invoice via email">
                    <Button 
                      icon={<Mail size={16} />} 
                      loading={sendingEmail}
                      onClick={handleSendEmail}
                    >
                      Send Email
                    </Button>
                  </Tooltip>
                )}

                <Tooltip title="Print invoice">
                  <Button 
                    icon={<Printer size={16} />} 
                    onClick={handlePrint}
                  >
                    Print
                  </Button>
                </Tooltip>

                <Tooltip title="Download PDF">
                  <Button 
                    type="primary"
                    icon={<Download size={16} />} 
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        )}

        {/* Public action buttons for non-logged users */}
        {!isLoggedIn && (
          <div style={{ 
            marginBottom: '20px', 
            textAlign: 'right'
          }}>
            <Space>
              <Tooltip title="Print invoice">
                <Button 
                  icon={<Printer size={16} />} 
                  onClick={handlePrint}
                >
                  Print
                </Button>
              </Tooltip>

              <Tooltip title="Download PDF">
                <Button 
                  type="primary"
                  icon={<Download size={16} />} 
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </Tooltip>
            </Space>
          </div>
        )}

        {/* Invoice Content */}
        {invoiceData?.hasPayment && invoiceData.invoiceHtml ? (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
            overflow: 'hidden',
            border: '1px solid #e5e7eb'
          }}>
            <div 
              ref={printRef}
              dangerouslySetInnerHTML={{ __html: invoiceData.invoiceHtml }}
              style={{ padding: '40px' }}
            />
          </div>
        ) : invoiceData && !invoiceData.hasPayment ? (
          <Card>
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px' }}>💳</div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                No Payment Information
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                This booking doesn't have payment information yet. The invoice will be available after payment is processed.
              </p>
              {isLoggedIn && (
                <Space>
                  <Button onClick={handleViewBooking}>
                    View Booking Details
                  </Button>
                  <Button type="primary" onClick={handleViewBooking}>
                    Back to Bookings
                  </Button>
                </Space>
              )}
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

export default InvoicePage
