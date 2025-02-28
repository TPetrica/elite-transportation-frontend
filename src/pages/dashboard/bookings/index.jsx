import React, { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import {
  Card,
  Table,
  Tag,
  Button,
  message,
  Modal,
  Dropdown,
  Space,
  Badge,
  Tabs,
  Form,
  Input,
  DatePicker,
  Select,
  Spin,
  Empty,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  Eye,
  MailPlus,
  Check,
  X,
  MoreHorizontal,
  Edit,
  Printer,
  Plus,
  Filter,
  RefreshCw,
  Search,
} from 'lucide-react'
import moment from 'moment'
import ApiService from '@/services/api.service'
import { useNavigate } from 'react-router-dom'
import BookingDetailsModal from './BookingDetailsModal'

const { TabPane } = Tabs
const { Option } = Select
const { confirm } = Modal

const BookingsPage = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState('all')
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [currentBooking, setCurrentBooking] = useState(null)
  const [searchForm] = Form.useForm()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const navigate = useNavigate()

  const fetchBookings = async (params = {}) => {
    setLoading(true)
    try {
      // Build API query parameters
      const queryParams = { ...params }

      // Add status filter from tab if applicable
      if (currentTab !== 'all') {
        queryParams.status = currentTab
      }

      // Pagination
      queryParams.page = params.page || pagination.current
      queryParams.limit = params.pageSize || pagination.pageSize

      // Add search parameters if they exist
      const searchValues = searchForm.getFieldsValue()
      if (searchValues.bookingNumber) {
        queryParams.bookingNumber = searchValues.bookingNumber
      }
      if (searchValues.customerName) {
        queryParams.customerName = searchValues.customerName
      }
      if (searchValues.date) {
        queryParams.date = searchValues.date.format('YYYY-MM-DD')
      }
      if (searchValues.status && searchValues.status !== 'all') {
        queryParams.status = searchValues.status
      }

      const response = await ApiService.get('/bookings', { params: queryParams })

      // Make sure we always have an array of bookings
      const bookingsData = Array.isArray(response.data.results) ? response.data.results : []

      setBookings(bookingsData)

      // Update pagination
      setPagination({
        ...pagination,
        current: response.data.page || 1,
        total: response.data.totalResults || 0,
      })
    } catch (error) {
      console.error('Error fetching bookings:', error)
      message.error('Failed to fetch bookings')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [currentTab]) // Re-fetch when tab changes

  const handleTabChange = key => {
    setCurrentTab(key)
    // Reset pagination to first page when changing tabs
    setPagination({
      ...pagination,
      current: 1,
    })
    // Reset search form
    searchForm.resetFields()
  }

  const handleTableChange = (pagination, filters, sorter) => {
    fetchBookings({
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    })
  }

  const handleSearch = values => {
    // Reset pagination to first page when searching
    setPagination({
      ...pagination,
      current: 1,
    })
    fetchBookings()
  }

  const resetSearch = () => {
    searchForm.resetFields()
    // Reset pagination to first page
    setPagination({
      ...pagination,
      current: 1,
    })
    fetchBookings()
  }

  const showBookingDetails = booking => {
    setCurrentBooking(booking)
    setDetailsVisible(true)
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await ApiService.patch(`/bookings/${bookingId}`, { status: newStatus })
      message.success(`Booking ${newStatus} successfully`)
      fetchBookings()
    } catch (error) {
      console.error('Error updating booking status:', error)
      message.error('Failed to update booking status')
    }
  }

  const showCancelConfirm = bookingId => {
    confirm({
      title: 'Are you sure you want to cancel this booking?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleStatusChange(bookingId, 'cancelled')
      },
    })
  }

  const showCompleteConfirm = bookingId => {
    confirm({
      title: 'Mark this booking as completed?',
      icon: <Check className="tw-text-green-500 tw-mr-2" />,
      content: 'This will mark the service as delivered.',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        handleStatusChange(bookingId, 'completed')
      },
    })
  }

  const sendReminderEmail = async bookingId => {
    try {
      await ApiService.post(`/bookings/${bookingId}/send-reminder`)
      message.success('Reminder email sent successfully')
    } catch (error) {
      console.error('Error sending reminder email:', error)
      message.error('Failed to send reminder email')
    }
  }

  const getStatusBadge = status => {
    switch (status) {
      case 'pending':
        return <Badge status="warning" text="Pending" />
      case 'confirmed':
        return <Badge status="processing" text="Confirmed" />
      case 'completed':
        return <Badge status="success" text="Completed" />
      case 'cancelled':
        return <Badge status="error" text="Cancelled" />
      default:
        return <Badge status="default" text={status} />
    }
  }

  const getStatusTag = status => {
    const colors = {
      pending: 'orange',
      confirmed: 'blue',
      completed: 'green',
      cancelled: 'red',
    }

    return <Tag color={colors[status] || 'default'}>{status.toUpperCase()}</Tag>
  }

  const handleEditBooking = booking => {
    // Ensure we have a valid booking ID before navigating
    if (booking && booking.id) {
      console.log('Navigating to edit booking:', booking.id)
      navigate(`/dashboard/bookings/edit/${booking.id}`)
    } else {
      message.error('Cannot edit booking: Invalid booking ID')
    }
  }

  const getDropdownMenu = booking => {
    const items = [
      {
        key: 'view',
        label: (
          <Button type="text" icon={<Eye size={14} />} onClick={() => showBookingDetails(booking)}>
            View Details
          </Button>
        ),
      },
      {
        key: 'edit',
        label: (
          <Button type="text" icon={<Edit size={14} />} onClick={() => handleEditBooking(booking)}>
            Edit Booking
          </Button>
        ),
      },
      {
        type: 'divider',
      },
    ]

    // Add status-specific actions
    if (booking.status === 'pending') {
      items.push({
        key: 'confirm',
        label: (
          <Button
            type="text"
            icon={<Check size={14} />}
            onClick={() => handleStatusChange(booking.id, 'confirmed')}
          >
            Confirm Booking
          </Button>
        ),
      })
    }

    if (booking.status === 'confirmed') {
      items.push({
        key: 'complete',
        label: (
          <Button
            type="text"
            icon={<Check size={14} />}
            onClick={() => showCompleteConfirm(booking.id)}
          >
            Mark as Completed
          </Button>
        ),
      })

      items.push({
        key: 'remind',
        label: (
          <Button
            type="text"
            icon={<MailPlus size={14} />}
            onClick={() => sendReminderEmail(booking.id)}
          >
            Send Reminder
          </Button>
        ),
      })
    }

    if (booking.status !== 'cancelled' && booking.status !== 'completed') {
      items.push({
        key: 'cancel',
        label: (
          <Button
            type="text"
            danger
            icon={<X size={14} />}
            onClick={() => showCancelConfirm(booking.id)}
          >
            Cancel Booking
          </Button>
        ),
      })
    }

    items.push({
      key: 'invoice',
      label: (
        <Button
          type="text"
          icon={<Printer size={14} />}
          onClick={() => navigate(`/invoice/${booking.bookingNumber}`)}
        >
          View Invoice
        </Button>
      ),
    })

    return items
  }

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      render: text => <a onClick={() => navigate(`/invoice/${text}`)}>{text}</a>,
    },
    {
      title: 'Customer',
      dataIndex: 'passengerDetails',
      key: 'customer',
      render: details => (details ? `${details.firstName} ${details.lastName}` : 'N/A'),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: service => (
        <span className="tw-capitalize">{service?.replace(/-/g, ' ') || 'N/A'}</span>
      ),
    },
    {
      title: 'Date & Time',
      key: 'dateTime',
      render: (_, record) =>
        record.pickup ? (
          <span>
            {moment(record.pickup.date).format('MMM DD, YYYY')}
            <br />
            <small>{record.pickup.time}</small>
          </span>
        ) : (
          'N/A'
        ),
    },
    {
      title: 'Amount',
      dataIndex: ['payment', 'amount'],
      key: 'amount',
      render: amount => (amount ? `$${parseFloat(amount).toFixed(2)}` : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (status ? getStatusTag(status) : 'N/A'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{
            items: getDropdownMenu(record),
          }}
          trigger={['click']}
        >
          <Button type="text" onClick={e => e.preventDefault()}>
            <Space>
              <MoreHorizontal size={16} />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
  ]

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Bookings</h1>
          <p className="tw-text-sm tw-text-gray-500">Manage all your transportation bookings</p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} className="tw-mr-2" />}
          onClick={() => navigate('/booking-time')}
        >
          Create Booking
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <div className="tw-mb-6">
          <Form
            form={searchForm}
            layout="inline"
            onFinish={handleSearch}
            className="tw-gap-2 tw-flex tw-flex-wrap"
          >
            <Form.Item name="bookingNumber" className="tw-mb-2">
              <Input prefix={<Search size={14} className="tw-mr-1" />} placeholder="Booking ID" />
            </Form.Item>
            <Form.Item name="customerName" className="tw-mb-2">
              <Input prefix={<User size={14} className="tw-mr-1" />} placeholder="Customer Name" />
            </Form.Item>
            <Form.Item name="date" className="tw-mb-2">
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="tw-min-w-[150px]"
                getPopupContainer={trigger => trigger.parentNode}
              />
            </Form.Item>
            <Form.Item name="status" className="tw-mb-2">
              <Select placeholder="Status" className="tw-min-w-[120px]" allowClear>
                <Option value="all">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="confirmed">Confirmed</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
            </Form.Item>
            <Form.Item className="tw-mb-2">
              <Button
                type="primary"
                htmlType="submit"
                icon={<Filter size={14} className="tw-mr-1" />}
              >
                Filter
              </Button>
            </Form.Item>
            <Form.Item className="tw-mb-2">
              <Button onClick={resetSearch} icon={<RefreshCw size={14} className="tw-mr-1" />}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Tabs defaultActiveKey="all" onChange={handleTabChange}>
          <TabPane tab="All Bookings" key="all">
            <Table
              dataSource={bookings}
              columns={columns}
              rowKey="id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} bookings`,
              }}
              locale={{
                emptyText: <Empty description="No bookings found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Pending" key="pending">
            <Table
              dataSource={bookings}
              columns={columns}
              rowKey="id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} pending bookings`,
              }}
              locale={{
                emptyText: <Empty description="No pending bookings found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Confirmed" key="confirmed">
            <Table
              dataSource={bookings}
              columns={columns}
              rowKey="id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} confirmed bookings`,
              }}
              locale={{
                emptyText: <Empty description="No confirmed bookings found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Completed" key="completed">
            <Table
              dataSource={bookings}
              columns={columns}
              rowKey="id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} completed bookings`,
              }}
              locale={{
                emptyText: <Empty description="No completed bookings found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Cancelled" key="cancelled">
            <Table
              dataSource={bookings}
              columns={columns}
              rowKey="id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} cancelled bookings`,
              }}
              locale={{
                emptyText: <Empty description="No cancelled bookings found" />,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      <BookingDetailsModal
        booking={currentBooking}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
      />
    </div>
  )
}

export default BookingsPage
