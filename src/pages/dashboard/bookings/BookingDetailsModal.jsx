import React from 'react'
import { CheckCircle } from 'lucide-react'
import {
  Modal,
  Card,
  Descriptions,
  Table,
  Typography,
  Button,
  Tabs,
  Tag,
  Space,
  Divider,
  Avatar,
  Badge,
} from 'antd'
import {
  CalendarCheck,
  MapPin,
  Clock,
  Globe,
  Car,
  ChevronRight,
  User,
  Briefcase,
  CreditCard,
  FileText,
  MessageSquare,
  Plane,
} from 'lucide-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography
const { TabPane } = Tabs

const BookingDetailsModal = ({ booking, visible, onClose }) => {
  const navigate = useNavigate()

  if (!booking) return null

  const getStatusTag = status => {
    const colors = {
      pending: 'orange',
      confirmed: 'blue',
      completed: 'green',
      cancelled: 'red',
    }

    return <Tag color={colors[status] || 'default'}>{status.toUpperCase()}</Tag>
  }

  const getPaymentStatusTag = status => {
    const colors = {
      pending: 'orange',
      completed: 'green',
      failed: 'red',
    }

    return <Tag color={colors[status] || 'default'}>{status.toUpperCase()}</Tag>
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
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${parseFloat(price).toFixed(2)}`,
      align: 'right',
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
      align: 'right',
    },
  ]

  return (
    <Modal
      title={
        <div className="tw-flex tw-items-center tw-justify-between">
          <span>Booking Details - {booking.bookingNumber}</span>
          <span>{getStatusTag(booking.status)}</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Close
        </Button>,
        <Button
          key="edit"
          type="primary"
          ghost
          onClick={() => navigate(`/dashboard/bookings/edit/${booking._id}`)}
        >
          Edit Booking
        </Button>,
        <Button
          key="invoice"
          type="primary"
          onClick={() => window.open(`/invoice/${booking.bookingNumber}`, '_blank')}
        >
          View Invoice
        </Button>,
      ]}
      width={900}
      centered
    >
      <Tabs defaultActiveKey="details" className="tw-mt-4">
        <TabPane
          tab={
            <span>
              <FileText size={16} className="tw-inline tw-mr-2" />
              Details
            </span>
          }
          key="details"
        >
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-6">
            <div className="lg:tw-col-span-7">
              <Card
                title={
                  <span className="tw-flex tw-items-center">
                    <Clock size={16} className="tw-mr-2" />
                    Trip Details
                  </span>
                }
                className="tw-mb-6 tw-shadow-sm"
              >
                <div className="tw-mb-6">
                  <Badge.Ribbon text={booking.service.replace(/-/g, ' ')} color="blue">
                    <Card className="tw-bg-gray-50 tw-border-0">
                      <div className="tw-flex tw-items-start">
                        <div className="tw-flex-grow">
                          <div className="tw-flex tw-items-center">
                            <MapPin size={18} className="tw-text-primary tw-mr-2" />
                            <Text strong className="tw-capitalize">
                              Pickup
                            </Text>
                          </div>
                          <Text className="tw-ml-6 tw-block">{booking.pickup.address}</Text>

                          <div className="tw-h-8 tw-border-l-2 tw-border-dashed tw-border-gray-300 tw-ml-2 tw-my-1"></div>

                          <div className="tw-flex tw-items-center">
                            <MapPin size={18} className="tw-text-red-500 tw-mr-2" />
                            <Text strong className="tw-capitalize">
                              Dropoff
                            </Text>
                          </div>
                          <Text className="tw-ml-6 tw-block">{booking.dropoff.address}</Text>
                        </div>
                        <div className="tw-text-right">
                          <Text strong className="tw-block">
                            {moment(booking.pickup.date).format('MMM DD, YYYY')}
                          </Text>
                          <Text className="tw-block">{booking.pickup.time}</Text>
                          <div className="tw-mt-2 tw-text-sm">
                            <Tag color="blue">{booking.distance.miles.toFixed(1)} miles</Tag>
                            <Tag color="green">{booking.duration}</Tag>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Badge.Ribbon>
                </div>

                <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4 tw-mb-4">
                  <div className="tw-flex tw-items-center">
                    <CalendarCheck size={18} className="tw-text-gray-400 tw-mr-2" />
                    <div>
                      <Text type="secondary" className="tw-block tw-text-xs">
                        Booking Date
                      </Text>
                      <Text>{moment(booking.createdAt).format('MMM DD, YYYY')}</Text>
                    </div>
                  </div>

                  {booking.pickup.flightNumber && (
                    <div className="tw-flex tw-items-center">
                      <Plane size={18} className="tw-text-gray-400 tw-mr-2" />
                      <div>
                        <Text type="secondary" className="tw-block tw-text-xs">
                          Flight Number
                        </Text>
                        <Text>{booking.pickup.flightNumber}</Text>
                      </div>
                    </div>
                  )}

                  <div className="tw-flex tw-items-center">
                    <User size={18} className="tw-text-gray-400 tw-mr-2" />
                    <div>
                      <Text type="secondary" className="tw-block tw-text-xs">
                        Passengers
                      </Text>
                      <Text>{booking.passengerDetails.passengers}</Text>
                    </div>
                  </div>

                  <div className="tw-flex tw-items-center">
                    <Briefcase size={18} className="tw-text-gray-400 tw-mr-2" />
                    <div>
                      <Text type="secondary" className="tw-block tw-text-xs">
                        Luggage
                      </Text>
                      <Text>{booking.passengerDetails.luggage}</Text>
                    </div>
                  </div>
                </div>

                {booking.passengerDetails.specialRequirements && (
                  <div className="tw-mt-4 tw-border-t tw-pt-4">
                    <div className="tw-flex tw-items-start">
                      <MessageSquare size={18} className="tw-text-gray-400 tw-mr-2 tw-mt-1" />
                      <div>
                        <Text type="secondary" className="tw-block tw-text-xs">
                          Special Requirements
                        </Text>
                        <Text>{booking.passengerDetails.specialRequirements}</Text>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {booking.extras && booking.extras.length > 0 && (
                <Card
                  title={
                    <span className="tw-flex tw-items-center">
                      <FileText size={16} className="tw-mr-2" />
                      Extra Services
                    </span>
                  }
                  className="tw-shadow-sm"
                >
                  <Table
                    dataSource={booking.extras}
                    columns={extraColumns}
                    pagination={false}
                    rowKey={record => record.item._id}
                    size="small"
                  />
                </Card>
              )}
            </div>

            <div className="lg:tw-col-span-5">
              <Card
                title={
                  <span className="tw-flex tw-items-center">
                    <User size={16} className="tw-mr-2" />
                    Customer Information
                  </span>
                }
                className="tw-mb-6 tw-shadow-sm"
              >
                <div className="tw-flex tw-items-center tw-mb-4">
                  <Avatar size={64} className="tw-bg-blue-500 tw-mr-4">
                    {booking.passengerDetails.firstName.charAt(0) +
                      booking.passengerDetails.lastName.charAt(0)}
                  </Avatar>
                  <div>
                    <Title level={5} className="tw-mb-0">
                      {booking.passengerDetails.firstName} {booking.passengerDetails.lastName}
                    </Title>
                    <Text type="secondary">{booking.email}</Text>
                  </div>
                </div>

                <Divider className="tw-my-3" />

                <Descriptions column={1} size="small" className="tw-mb-0">
                  <Descriptions.Item label="Phone">
                    {booking.passengerDetails.phone}
                  </Descriptions.Item>

                  {booking.user && (
                    <Descriptions.Item label="Account">
                      <Tag color="green">Registered User</Tag>
                    </Descriptions.Item>
                  )}

                  {booking.affiliate && (
                    <Descriptions.Item label="Affiliate">
                      <Tag color="purple">{booking.affiliateCode || 'Affiliate'}</Tag>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>

              <Card
                title={
                  <span className="tw-flex tw-items-center">
                    <CreditCard size={16} className="tw-mr-2" />
                    Payment Information
                  </span>
                }
                className="tw-shadow-sm"
              >
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Amount">
                    <Text strong className="tw-text-lg">
                      ${booking.payment.amount.toFixed(2)}
                    </Text>
                  </Descriptions.Item>

                  <Descriptions.Item label="Payment Method">
                    <Tag color="blue">
                      {booking.payment.method.replace(/_/g, ' ').toUpperCase()}
                    </Tag>
                  </Descriptions.Item>

                  <Descriptions.Item label="Payment Status">
                    {getPaymentStatusTag(booking.payment.status)}
                  </Descriptions.Item>

                  {booking.payment.stripePaymentIntentId && (
                    <Descriptions.Item label="Transaction ID">
                      <Text copyable className="tw-text-xs">
                        {booking.payment.stripePaymentIntentId}
                      </Text>
                    </Descriptions.Item>
                  )}
                </Descriptions>

                <Divider className="tw-my-3" />

                <div className="tw-bg-gray-50 tw-p-3 tw-rounded">
                  <Title level={5} className="tw-mb-2">
                    Billing Details
                  </Title>
                  <Text className="tw-block">
                    {booking.billingDetails.firstName} {booking.billingDetails.lastName}
                  </Text>
                  {booking.billingDetails.company && (
                    <Text className="tw-block">{booking.billingDetails.company}</Text>
                  )}
                  <Text className="tw-block">{booking.billingDetails.address}</Text>
                  <Text className="tw-block">
                    {booking.billingDetails.city}, {booking.billingDetails.zipCode}
                  </Text>
                  <Text className="tw-block">{booking.billingDetails.country}</Text>
                </div>
              </Card>
            </div>
          </div>
        </TabPane>

        <TabPane
          tab={
            <span>
              <Clock size={16} className="tw-inline tw-mr-2" />
              Timeline
            </span>
          }
          key="timeline"
        >
          <Card className="tw-shadow-sm">
            <div className="tw-flex tw-flex-col tw-space-y-4">
              <div className="tw-flex">
                <div className="tw-mr-4 tw-w-8 tw-h-8 tw-rounded-full tw-bg-green-500 tw-flex tw-items-center tw-justify-center tw-text-white">
                  <CalendarCheck size={16} />
                </div>
                <div className="tw-flex-grow">
                  <Text strong>Booking Created</Text>
                  <Text type="secondary" className="tw-block">
                    {moment(booking.createdAt).format('MMMM DD, YYYY [at] HH:mm')}
                  </Text>
                </div>
              </div>

              <div className="tw-w-px tw-h-6 tw-bg-gray-300 tw-ml-4"></div>

              <div className="tw-flex">
                <div className="tw-mr-4 tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-text-white">
                  <CreditCard size={16} />
                </div>
                <div className="tw-flex-grow">
                  <Text strong>
                    Payment {booking.payment.status === 'completed' ? 'Completed' : 'Pending'}
                  </Text>
                  <Text type="secondary" className="tw-block">
                    {booking.payment.method.replace(/_/g, ' ')} - $
                    {booking.payment.amount.toFixed(2)}
                  </Text>
                </div>
              </div>

              {booking.status !== 'pending' && (
                <>
                  <div className="tw-w-px tw-h-6 tw-bg-gray-300 tw-ml-4"></div>

                  <div className="tw-flex">
                    <div className="tw-mr-4 tw-w-8 tw-h-8 tw-rounded-full tw-bg-purple-500 tw-flex tw-items-center tw-justify-center tw-text-white">
                      <CheckCircle size={16} />
                    </div>
                    <div className="tw-flex-grow">
                      <Text strong>
                        Booking{' '}
                        {booking.status === 'confirmed'
                          ? 'Confirmed'
                          : booking.status === 'cancelled'
                            ? 'Cancelled'
                            : 'Completed'}
                      </Text>
                      <Text type="secondary" className="tw-block">
                        {booking.updatedAt
                          ? moment(booking.updatedAt).format('MMMM DD, YYYY [at] HH:mm')
                          : 'N/A'}
                      </Text>
                    </div>
                  </div>
                </>
              )}

              {booking.status !== 'cancelled' && (
                <>
                  <div className="tw-w-px tw-h-6 tw-bg-gray-300 tw-ml-4"></div>

                  <div className="tw-flex">
                    <div
                      className={`tw-mr-4 tw-w-8 tw-h-8 tw-rounded-full ${booking.status === 'completed' ? 'tw-bg-green-500' : 'tw-bg-gray-300'} tw-flex tw-items-center tw-justify-center tw-text-white`}
                    >
                      <Car size={16} />
                    </div>
                    <div className="tw-flex-grow">
                      <Text strong>Scheduled Pickup</Text>
                      <Text type="secondary" className="tw-block">
                        {moment(booking.pickup.date).format('MMMM DD, YYYY')} at{' '}
                        {booking.pickup.time}
                      </Text>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default BookingDetailsModal
