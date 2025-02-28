import React, { useState, useEffect, useRef } from 'react'
import { Card, Row, Col, Typography, Divider, Table, Button, Space, Spin, message, Tag } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Printer,
  Download,
  Mail,
  Copy,
  FileText,
  Calendar,
  MapPin,
  User,
} from 'lucide-react'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import ApiService from '@/services/api.service'
import logo from '@/assets/images/logo.png' // Update with your actual logo path

const { Title, Text } = Typography

const InvoicePage = () => {
  const { bookingNumber } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const printRef = useRef()

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true)
        const response = await ApiService.get(`/bookings/number/${bookingNumber}`)
        setBooking(response.data)
      } catch (error) {
        console.error('Error fetching booking:', error)
        setError(
          'Failed to load invoice. The booking may not exist or you may not have permission to view it.'
        )
        message.error('Failed to load invoice')
      } finally {
        setLoading(false)
      }
    }

    if (bookingNumber) {
      fetchBookingData()
    }
  }, [bookingNumber])

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice-${bookingNumber}`,
    onAfterPrint: () => message.success('Invoice printed successfully'),
  })

  const handleDownload = () => {
    handlePrint()
    message.success('Invoice downloaded successfully')
  }

  const handleSendEmail = async () => {
    try {
      await ApiService.post(`/bookings/${booking._id}/send-invoice`)
      message.success('Invoice sent to customer email')
    } catch (error) {
      console.error('Error sending invoice:', error)
      message.error('Failed to send invoice')
    }
  }

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text)
    message.success('Link copied to clipboard')
  }

  if (loading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-64">
        <Spin size="large" tip="Loading invoice..." />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="tw-p-6">
        <Card>
          <div className="tw-text-center tw-py-8">
            <FileText size={48} className="tw-text-gray-400 tw-mx-auto tw-mb-4" />
            <Title level={4}>Invoice Not Found</Title>
            <Text type="secondary">{error || 'The requested invoice could not be found.'}</Text>
            <div className="tw-mt-6">
              <Button type="primary" onClick={() => navigate('/dashboard/bookings')}>
                Back to Bookings
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Calculate totals
  const calculateSubtotal = () => {
    // Base fare
    const baseFare = booking.payment.amount

    // Subtract extras if any
    const extrasTotal = booking.extras?.reduce((sum, item) => sum + item.price, 0) || 0

    return baseFare - extrasTotal
  }

  const subtotal = calculateSubtotal()
  const extrasTotal = booking.extras?.reduce((sum, item) => sum + item.price, 0) || 0
  const total = booking.payment.amount

  const getStatusColor = status => {
    const colors = {
      pending: 'orange',
      confirmed: 'green',
      cancelled: 'red',
      completed: 'blue',
    }
    return colors[status] || 'default'
  }

  const extraColumns = [
    {
      title: 'Item',
      dataIndex: ['item', 'name'],
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
    },
    {
      title: 'Price',
      key: 'price',
      align: 'right',
      render: (_, record) => `$${record.price.toFixed(2)}`,
    },
  ]

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div className="tw-flex tw-items-center">
          <Button
            type="text"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/dashboard/bookings')}
            className="tw-mr-4"
          />
          <div>
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Invoice</h1>
            <p className="tw-text-sm tw-text-gray-500">Booking #{booking.bookingNumber}</p>
          </div>
        </div>
        <Space>
          <Button icon={<Mail size={16} className="tw-mr-2" />} onClick={handleSendEmail}>
            Email
          </Button>
          <Button icon={<Download size={16} className="tw-mr-2" />} onClick={handleDownload}>
            Download
          </Button>
          <Button
            icon={<Copy size={16} className="tw-mr-2" />}
            onClick={() =>
              copyToClipboard(`${window.location.origin}/invoice/${booking.bookingNumber}`)
            }
          >
            Copy Link
          </Button>
          <Button
            type="primary"
            icon={<Printer size={16} className="tw-mr-2" />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Space>
      </div>

      <div ref={printRef} className="tw-bg-white tw-p-6 tw-shadow-sm">
        <div className="tw-p-6">
          {/* Header */}
          <Row gutter={24} align="middle" className="tw-mb-8">
            <Col span={12}>
              <img src={logo} alt="Company Logo" className="tw-h-12" />
            </Col>
            <Col span={12} className="tw-text-right">
              <Title level={3} className="tw-mb-1">
                INVOICE
              </Title>
              <Text className="tw-block tw-text-gray-500">{booking.bookingNumber}</Text>
              <Tag color={getStatusColor(booking.status)} className="tw-mt-2 tw-text-uppercase">
                {booking.status}
              </Tag>
            </Col>
          </Row>

          {/* Organization & Customer Info */}
          <Row gutter={24} className="tw-mb-8">
            <Col span={12}>
              <div className="tw-mb-4">
                <Text strong className="tw-block tw-mb-1">
                  From:
                </Text>
                <Text className="tw-block">Luxury Transportation Inc.</Text>
                <Text className="tw-block">123 Main Street</Text>
                <Text className="tw-block">New York, NY 10001</Text>
                <Text className="tw-block">support@luxurytransport.com</Text>
                <Text className="tw-block">+1 (555) 123-4567</Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <Text strong className="tw-block tw-mb-1">
                  To:
                </Text>
                <Text className="tw-block">
                  {booking.passengerDetails.firstName} {booking.passengerDetails.lastName}
                </Text>
                <Text className="tw-block">{booking.email}</Text>
                <Text className="tw-block">{booking.passengerDetails.phone}</Text>
                {booking.billingDetails && (
                  <>
                    <Text className="tw-block">{booking.billingDetails.address}</Text>
                    <Text className="tw-block">
                      {booking.billingDetails.city}, {booking.billingDetails.zipCode}
                    </Text>
                    <Text className="tw-block">{booking.billingDetails.country}</Text>
                  </>
                )}
              </div>
            </Col>
          </Row>

          {/* Invoice Details */}
          <Row gutter={24} className="tw-mb-8">
            <Col span={8}>
              <Card size="small" className="tw-h-full">
                <div className="tw-flex tw-items-start">
                  <Calendar size={20} className="tw-text-gray-400 tw-mr-3 tw-mt-1" />
                  <div>
                    <Text strong className="tw-block tw-mb-1">
                      Booking Date
                    </Text>
                    <Text>{moment(booking.createdAt).format('MMMM DD, YYYY')}</Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small" className="tw-h-full">
                <div className="tw-flex tw-items-start">
                  <MapPin size={20} className="tw-text-gray-400 tw-mr-3 tw-mt-1" />
                  <div>
                    <Text strong className="tw-block tw-mb-1">
                      Pickup Date & Time
                    </Text>
                    <Text>{moment(booking.pickup.date).format('MMMM DD, YYYY')}</Text>
                    <Text className="tw-block">{booking.pickup.time}</Text>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small" className="tw-h-full">
                <div className="tw-flex tw-items-start">
                  <User size={20} className="tw-text-gray-400 tw-mr-3 tw-mt-1" />
                  <div>
                    <Text strong className="tw-block tw-mb-1">
                      Payment Method
                    </Text>
                    <Text className="tw-capitalize">
                      {booking.payment.method.replace('_', ' ')}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Service Details */}
          <Card className="tw-mb-8" title="Service Details">
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <div className="tw-mb-4">
                  <Text strong className="tw-block tw-mb-1">
                    Service Type:
                  </Text>
                  <Text className="tw-capitalize">{booking.service.replace(/-/g, ' ')}</Text>
                </div>
                <div className="tw-mb-4">
                  <Text strong className="tw-block tw-mb-1">
                    Pickup Address:
                  </Text>
                  <Text>{booking.pickup.address}</Text>
                </div>
                <div className="tw-mb-4">
                  <Text strong className="tw-block tw-mb-1">
                    Dropoff Address:
                  </Text>
                  <Text>{booking.dropoff.address}</Text>
                </div>
              </Col>
              <Col span={12}>
                <div className="tw-mb-4">
                  <Text strong className="tw-block tw-mb-1">
                    Distance:
                  </Text>
                  <Text>
                    {booking.distance.miles.toFixed(1)} miles ({booking.distance.km.toFixed(1)} km)
                  </Text>
                </div>
                <div className="tw-mb-4">
                  <Text strong className="tw-block tw-mb-1">
                    Duration:
                  </Text>
                  <Text>{booking.duration}</Text>
                </div>
                <div className="tw-mb-4">
                  <Text strong className="tw-block tw-mb-1">
                    Passengers:
                  </Text>
                  <Text>
                    {booking.passengerDetails.passengers} passenger(s),{' '}
                    {booking.passengerDetails.luggage} luggage
                  </Text>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Invoice Items */}
          <div className="tw-mb-8">
            <Card title="Invoice Items">
              <div className="tw-mb-6">
                <Row className="tw-mb-3 tw-font-medium">
                  <Col span={16}>Description</Col>
                  <Col span={8} className="tw-text-right">
                    Amount
                  </Col>
                </Row>
                <Row className="tw-mb-3">
                  <Col span={16}>
                    Base Transportation Service ({booking.service.replace(/-/g, ' ')})
                  </Col>
                  <Col span={8} className="tw-text-right">
                    ${subtotal.toFixed(2)}
                  </Col>
                </Row>

                {booking.extras && booking.extras.length > 0 && (
                  <>
                    <Divider className="tw-my-4" />
                    <Text strong>Additional Services:</Text>
                    <Table
                      dataSource={booking.extras}
                      columns={extraColumns}
                      pagination={false}
                      rowKey={record => record.item._id}
                      size="small"
                      className="tw-mt-2"
                    />
                  </>
                )}
              </div>

              <Divider />

              <Row gutter={16} className="tw-text-right">
                <Col span={16} className="tw-text-right">
                  <Text strong>Subtotal:</Text>
                </Col>
                <Col span={8} className="tw-text-right">
                  ${subtotal.toFixed(2)}
                </Col>
              </Row>

              {booking.extras && booking.extras.length > 0 && (
                <Row gutter={16} className="tw-text-right tw-mt-2">
                  <Col span={16} className="tw-text-right">
                    <Text strong>Extras Total:</Text>
                  </Col>
                  <Col span={8} className="tw-text-right">
                    ${extrasTotal.toFixed(2)}
                  </Col>
                </Row>
              )}

              <Row gutter={16} className="tw-text-right tw-mt-2">
                <Col span={16} className="tw-text-right">
                  <Text strong>Total:</Text>
                </Col>
                <Col span={8} className="tw-text-right">
                  <Title level={4} className="tw-mb-0">
                    ${total.toFixed(2)}
                  </Title>
                </Col>
              </Row>
            </Card>
          </div>

          {/* Terms & Notes */}
          <div className="tw-mb-8">
            <Title level={5}>Terms & Conditions</Title>
            <Text className="tw-block tw-mb-4">
              Payment is due within 14 days. Please note that cancellation fees may apply as per our
              terms and conditions.
            </Text>

            <Title level={5}>Notes</Title>
            <Text className="tw-block">
              Thank you for choosing Luxury Transportation. We appreciate your business!
            </Text>
          </div>

          {/* Footer */}
          <Divider />
          <div className="tw-text-center tw-text-gray-500">
            <Text>Luxury Transportation Inc. | 123 Main Street, New York, NY 10001</Text>
            <br />
            <Text>+1 (555) 123-4567 | support@luxurytransport.com | www.luxurytransport.com</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePage
