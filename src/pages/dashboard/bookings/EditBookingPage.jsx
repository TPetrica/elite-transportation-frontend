import React, { useState, useEffect } from 'react'
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  Spin,
  message,
  Tabs,
  Divider,
  Space,
  Alert,
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Calendar, Clock, MapPin, User, Phone, Mail, FileText } from 'lucide-react'
import moment from 'moment'
import ApiService from '@/services/api.service'

const { Option } = Select
const { TabPane } = Tabs

const EditBookingPage = () => {
  const { bookingId } = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [booking, setBooking] = useState(null)
  const [extras, setExtras] = useState([])

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true)
        // Check if we have a valid booking ID
        if (!bookingId || bookingId === 'undefined') {
          message.error('Invalid booking ID')
          setLoading(false)
          return
        }

        const [bookingRes, extrasRes] = await Promise.all([
          ApiService.get(`/bookings/${bookingId}`),
          ApiService.get('/extras'),
        ])

        const bookingData = bookingRes.data
        setBooking(bookingData)

        // Format the data for the form
        form.setFieldsValue({
          // Trip details
          pickup: {
            address: bookingData.pickup.address,
            date: moment(bookingData.pickup.date),
            time: moment(bookingData.pickup.time, 'HH:mm'),
            flightNumber: bookingData.pickup.flightNumber || '',
          },
          dropoff: {
            address: bookingData.dropoff.address,
          },
          service: bookingData.service,

          // Passenger details
          passengerDetails: {
            firstName: bookingData.passengerDetails.firstName,
            lastName: bookingData.passengerDetails.lastName,
            phone: bookingData.passengerDetails.phone,
            email: bookingData.email,
            passengers: bookingData.passengerDetails.passengers,
            luggage: bookingData.passengerDetails.luggage,
            specialRequirements: bookingData.passengerDetails.specialRequirements || '',
          },

          // Selected extras - use a proper unique key for each extra item
          selectedExtras:
            bookingData.extras?.map((extra, index) => ({
              key: index, // This ensures each extra has a unique identifier
              itemId: extra.item._id,
              quantity: extra.quantity,
            })) || [],

          // Status
          status: bookingData.status,
        })

        // Set extras data
        setExtras(Array.isArray(extrasRes.data) ? extrasRes.data : [])
      } catch (error) {
        console.error('Error fetching booking data:', error)
        message.error('Failed to load booking data')
      } finally {
        setLoading(false)
      }
    }

    if (bookingId) {
      fetchBookingData()
    }
  }, [bookingId, form])

  const handleSubmit = async values => {
    try {
      setSubmitting(true)

      // Format the data for the API
      const updateData = {
        pickup: {
          address: values.pickup.address,
          date: values.pickup.date.format('YYYY-MM-DD'),
          time: values.pickup.time.format('HH:mm'),
          flightNumber: values.pickup.flightNumber,
          coordinates: booking.pickup.coordinates, // Preserve original coordinates
        },
        dropoff: {
          address: values.dropoff.address,
          coordinates: booking.dropoff.coordinates, // Preserve original coordinates
        },
        passengerDetails: {
          firstName: values.passengerDetails.firstName,
          lastName: values.passengerDetails.lastName,
          phone: values.passengerDetails.phone,
          passengers: values.passengerDetails.passengers,
          luggage: values.passengerDetails.luggage,
          specialRequirements: values.passengerDetails.specialRequirements,
        },
        service: values.service,
        status: values.status,
        // Format extras - remove the key property as it's only for frontend use
        extras:
          values.selectedExtras?.map(item => ({
            item: item.itemId,
            quantity: item.quantity,
            // Price will be calculated on the server
          })) || [],
      }

      await ApiService.patch(`/bookings/${bookingId}`, updateData)
      message.success('Booking updated successfully')
      navigate('/dashboard/bookings')
    } catch (error) {
      console.error('Error updating booking:', error)
      message.error('Failed to update booking')
    } finally {
      setSubmitting(false)
    }
  }

  const formatExtrasByCategory = () => {
    const groupedExtras = extras.reduce((acc, extra) => {
      if (!acc[extra.category]) {
        acc[extra.category] = []
      }
      acc[extra.category].push(extra)
      return acc
    }, {})

    return groupedExtras
  }

  if (loading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-64">
        <Spin size="large" tip="Loading booking data..." />
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="tw-p-6">
        <Alert
          type="error"
          message="Booking Not Found"
          description="The requested booking could not be found or you do not have permission to view it."
          action={
            <Button type="primary" onClick={() => navigate('/dashboard/bookings')}>
              Back to Bookings
            </Button>
          }
        />
      </div>
    )
  }

  const groupedExtras = formatExtrasByCategory()

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
            <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Edit Booking</h1>
            <p className="tw-text-sm tw-text-gray-500">
              Booking #{booking.bookingNumber} • {moment(booking.createdAt).format('MMM DD, YYYY')}
            </p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<Save size={16} className="tw-mr-2" />}
          onClick={() => form.submit()}
          loading={submitting}
        >
          Save Changes
        </Button>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit} className="tw-space-y-6">
        <Tabs defaultActiveKey="details">
          <TabPane
            tab={
              <span>
                <FileText size={16} className="tw-inline tw-mr-2" />
                Booking Details
              </span>
            }
            key="details"
          >
            <Card className="tw-shadow-sm">
              <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Trip Information</h3>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <div>
                  <Form.Item
                    name={['pickup', 'address']}
                    label={
                      <span className="tw-flex tw-items-center">
                        <MapPin size={16} className="tw-mr-2" />
                        Pickup Address
                      </span>
                    }
                    rules={[{ required: true, message: 'Pickup address is required' }]}
                  >
                    <Input />
                  </Form.Item>

                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <Form.Item
                      name={['pickup', 'date']}
                      label={
                        <span className="tw-flex tw-items-center">
                          <Calendar size={16} className="tw-mr-2" />
                          Pickup Date
                        </span>
                      }
                      rules={[{ required: true, message: 'Pickup date is required' }]}
                    >
                      <DatePicker
                        className="tw-w-full"
                        format="YYYY-MM-DD"
                        getPopupContainer={trigger => trigger.parentNode}
                      />
                    </Form.Item>

                    <Form.Item
                      name={['pickup', 'time']}
                      label={
                        <span className="tw-flex tw-items-center">
                          <Clock size={16} className="tw-mr-2" />
                          Pickup Time
                        </span>
                      }
                      rules={[{ required: true, message: 'Pickup time is required' }]}
                    >
                      <TimePicker
                        className="tw-w-full"
                        format="HH:mm"
                        getPopupContainer={trigger => trigger.parentNode}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item name={['pickup', 'flightNumber']} label="Flight Number (optional)">
                    <Input placeholder="e.g. AA1234" />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    name={['dropoff', 'address']}
                    label={
                      <span className="tw-flex tw-items-center">
                        <MapPin size={16} className="tw-mr-2" />
                        Dropoff Address
                      </span>
                    }
                    rules={[{ required: true, message: 'Dropoff address is required' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="service"
                    label="Service Type"
                    rules={[{ required: true, message: 'Service type is required' }]}
                  >
                    <Select>
                      <Option value="to-airport">To Airport</Option>
                      <Option value="from-airport">From Airport</Option>
                      <Option value="round-trip">Round Trip</Option>
                      <Option value="hourly">Hourly</Option>
                      <Option value="group">Group</Option>
                      <Option value="per-person">Per Person</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="status"
                    label="Booking Status"
                    rules={[{ required: true, message: 'Status is required' }]}
                  >
                    <Select>
                      <Option value="pending">Pending</Option>
                      <Option value="confirmed">Confirmed</Option>
                      <Option value="completed">Completed</Option>
                      <Option value="cancelled">Cancelled</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <Divider />

              <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Passenger Information</h3>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <Form.Item
                      name={['passengerDetails', 'firstName']}
                      label="First Name"
                      rules={[{ required: true, message: 'First name is required' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name={['passengerDetails', 'lastName']}
                      label="Last Name"
                      rules={[{ required: true, message: 'Last name is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name={['passengerDetails', 'phone']}
                    label={
                      <span className="tw-flex tw-items-center">
                        <Phone size={16} className="tw-mr-2" />
                        Phone Number
                      </span>
                    }
                    rules={[{ required: true, message: 'Phone number is required' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name={['passengerDetails', 'email']}
                    label={
                      <span className="tw-flex tw-items-center">
                        <Mail size={16} className="tw-mr-2" />
                        Email Address
                      </span>
                    }
                    rules={[
                      { required: true, message: 'Email is required' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>

                <div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <Form.Item
                      name={['passengerDetails', 'passengers']}
                      label={
                        <span className="tw-flex tw-items-center">
                          <User size={16} className="tw-mr-2" />
                          Passengers
                        </span>
                      }
                      rules={[{ required: true, message: 'Number of passengers is required' }]}
                    >
                      <InputNumber min={1} className="tw-w-full" />
                    </Form.Item>

                    <Form.Item
                      name={['passengerDetails', 'luggage']}
                      label="Luggage"
                      rules={[{ required: true, message: 'Number of luggage items is required' }]}
                    >
                      <InputNumber min={0} className="tw-w-full" />
                    </Form.Item>
                  </div>

                  <Form.Item
                    name={['passengerDetails', 'specialRequirements']}
                    label="Special Requirements"
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                </div>
              </div>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileText size={16} className="tw-inline tw-mr-2" />
                Extras
              </span>
            }
            key="extras"
          >
            <Card className="tw-shadow-sm">
              <h3 className="tw-text-lg tw-font-semibold tw-mb-4">Extra Services</h3>

              <Form.List name="selectedExtras">
                {(fields, { add, remove }) => (
                  <>
                    {Object.entries(groupedExtras).map(([category, items]) => (
                      <div key={category} className="tw-mb-6">
                        <h4 className="tw-text-md tw-font-medium tw-mb-3 tw-capitalize">
                          {category.replace(/([A-Z])/g, ' $1')}
                        </h4>

                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4">
                          {items.map(extra => {
                            // Find if this extra is already selected
                            const existingField = fields.find(field => {
                              const itemId = form.getFieldValue([
                                'selectedExtras',
                                field.name,
                                'itemId',
                              ])
                              return itemId === extra._id
                            })

                            const isSelected = !!existingField

                            return (
                              <Card
                                key={extra._id}
                                size="small"
                                className={`tw-border ${isSelected ? 'tw-border-blue-500' : 'tw-border-gray-200'}`}
                              >
                                <div className="tw-flex tw-justify-between tw-items-center">
                                  <div>
                                    <h5 className="tw-font-medium">{extra.name}</h5>
                                    <p className="tw-text-sm tw-text-gray-500">
                                      ${extra.price.toFixed(2)}
                                    </p>
                                  </div>

                                  {isSelected ? (
                                    <Space>
                                      <Form.Item
                                        name={['selectedExtras', existingField.name, 'quantity']}
                                        noStyle
                                      >
                                        <InputNumber
                                          min={1}
                                          max={extra.maxQuantity}
                                          size="small"
                                          className="tw-w-16"
                                        />
                                      </Form.Item>
                                      <Button
                                        type="text"
                                        danger
                                        size="small"
                                        onClick={() => remove(existingField.name)}
                                      >
                                        Remove
                                      </Button>

                                      {/* Hidden field to store the extra ID */}
                                      <Form.Item
                                        name={['selectedExtras', existingField.name, 'itemId']}
                                        hidden
                                      >
                                        <Input />
                                      </Form.Item>
                                    </Space>
                                  ) : (
                                    <Button
                                      type="primary"
                                      size="small"
                                      onClick={() => {
                                        // Add a new extra with a unique key
                                        add({
                                          key: Date.now(), // Use timestamp as unique key
                                          itemId: extra._id,
                                          quantity: 1,
                                        })
                                      }}
                                    >
                                      Add
                                    </Button>
                                  )}
                                </div>
                              </Card>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </Form.List>
            </Card>
          </TabPane>
        </Tabs>

        <div className="tw-flex tw-justify-end tw-space-x-4">
          <Button onClick={() => navigate('/dashboard/bookings')}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={submitting}
            icon={<Save size={16} className="tw-mr-2" />}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default EditBookingPage
