import ApiService from '@/services/api.service'
import { useBookings, useUpdateBooking } from '@/hooks/useQueryHooks'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
    Badge,
    Button,
    Card,
    DatePicker,
    Dropdown,
    Empty,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Table,
    Tabs,
    Tag
} from 'antd'
import {
    Check, Edit, Eye, Filter, MailPlus, MoreHorizontal, Plus, Printer, RefreshCw,
    Search, User, X
} from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingDetailsModal from './BookingDetailsModal'

const { TabPane } = Tabs
const { Option } = Select
const { confirm } = Modal

const BookingsPage = () => {
  const [currentTab, setCurrentTab] = useState('all')
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [currentBooking, setCurrentBooking] = useState(null)
  const [searchForm] = Form.useForm()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })
  const [sortField, setSortField] = useState('pickup.date')
  const [sortOrder, setSortOrder] = useState('desc')
  const navigate = useNavigate()

  // Build query parameters
  const queryParams = {
    page: pagination.current,
    limit: pagination.pageSize,
    sortBy: `${sortField}:${sortOrder}`,
    ...(currentTab !== 'all' && { status: currentTab }),
    // Add search params from form if any
    ...searchForm.getFieldsValue(),
  }

  // Use cached bookings hook
  const { data: bookingsResponse, isLoading: loading, error } = useBookings(queryParams)
  
  // Use update booking mutation
  const updateBookingMutation = useUpdateBooking()
  
  // Process bookings data
  const bookings = Array.isArray(bookingsResponse?.results) ? bookingsResponse.results : []
  
  // Update pagination when data changes
  useEffect(() => {
    if (bookingsResponse) {
      setPagination(prev => ({
        ...prev,
        total: bookingsResponse.totalResults || 0,
        current: bookingsResponse.page || 1,
      }))
    }
  }, [bookingsResponse])

  // Removed fetchBookings function - TanStack Query handles data fetching

  // TanStack Query automatically handles refetching when queryParams change

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

  const handleTableChange = (paginationInfo, filters, sorter) => {
    // Update pagination
    setPagination({
      ...pagination,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    })

    // Update sort state if sorter is defined and has a column
    if (sorter && sorter.column) {
      setSortField(sorter.field || 'pickup.date')
      setSortOrder(sorter.order || 'desc')
    }
  }

  const handleSearch = values => {
    // Reset pagination to first page when searching
    setPagination({
      ...pagination,
      current: 1,
    })
    // The search values are already in the searchForm and will be included in queryParams
    // TanStack Query will automatically refetch when queryParams change
  }

  const resetSearch = () => {
    searchForm.resetFields()
    // Reset pagination to first page
    setPagination({
      ...pagination,
      current: 1,
    })
    // TanStack Query will automatically refetch when form fields are cleared
  }

  const showBookingDetails = booking => {
    setCurrentBooking(booking)
    setDetailsVisible(true)
  }

  const handleStatusChange = (bookingId, newStatus) => {
    updateBookingMutation.mutate({
      bookingId,
      data: { status: newStatus }
    })
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

  const resendBookingEmails = async bookingId => {
    try {
      const response = await ApiService.post(`/bookings/${bookingId}/resend-emails`)
      
      if (response.data.results?.customer?.sent) {
        message.success(`Booking confirmation resent to ${response.data.customerEmail}`)
      } else if (response.data.results?.customer?.error) {
        message.error(`Failed to resend: ${response.data.results.customer.error}`)
      } else {
        message.success('Booking confirmation email resent successfully')
      }
      
    } catch (error) {
      console.error('Error resending booking confirmation:', error)
      message.error('Failed to resend booking confirmation')
    }
  }

  const resendInvoiceEmail = async bookingId => {
    try {
      const response = await ApiService.post(`/bookings/${bookingId}/resend-invoice`)
      message.success(`Invoice resent to ${response.data.customerEmail}`)
    } catch (error) {
      console.error('Error resending invoice:', error)
      const errorMsg = error.response?.data?.message || 'Failed to resend invoice'
      message.error(errorMsg)
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
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={14} />
            View Details
          </span>
        ),
        onClick: () => showBookingDetails(booking),
      },
    ]

    // Only show edit button if booking is not completed
    if (booking.status !== 'completed') {
      items.push({
        key: 'edit',
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit size={14} />
            Edit Booking
          </span>
        ),
        onClick: () => handleEditBooking(booking),
      })
    }

    items.push({
      type: 'divider',
    })

    // Add status-specific actions
    if (booking.status === 'pending') {
      items.push({
        key: 'confirm',
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={14} />
            Confirm Booking
          </span>
        ),
        onClick: () => handleStatusChange(booking.id, 'confirmed'),
      })
    }

    if (booking.status === 'confirmed') {
      items.push({
        key: 'complete',
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={14} />
            Mark as Completed
          </span>
        ),
        onClick: () => showCompleteConfirm(booking.id),
      })

      items.push({
        key: 'remind',
        label: (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MailPlus size={14} />
            Send Reminder
          </span>
        ),
        onClick: () => sendReminderEmail(booking.id),
      })
    }

    // Add resend emails option for all bookings with payment
    if (booking.payment && (booking.status === 'confirmed' || booking.status === 'completed')) {
      items.push({
        key: 'resend-emails',
        label: (
          <Button
            type="text"
            icon={<RefreshCw size={14} />}
            onClick={() => resendBookingEmails(booking.id)}
          >
            Resend Booking Confirmation
          </Button>
        ),
      })

      items.push({
        key: 'resend-invoice',
        label: (
          <Button
            type="text"
            icon={<Printer size={14} />}
            onClick={() => resendInvoiceEmail(booking.id)}
          >
            Resend Invoice
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
      responsive: ['md'],
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
      responsive: ['lg'],
    },
    {
      title: 'Date & Time',
      key: 'dateTime',
      dataIndex: ['pickup'],
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'descend',
      sortOrder: sortField === 'pickup.date' ? sortOrder : null,
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
      responsive: ['md'],
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
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-center tw-gap-4 md:tw-gap-0">
        <div>
          <h1 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-text-gray-900">Bookings</h1>
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
            <Form.Item
              name="bookingNumber"
              className="tw-mb-2 tw-flex-grow tw-min-w-[150px] sm:tw-min-w-0 sm:tw-flex-grow-0"
            >
              <Input prefix={<Search size={14} className="tw-mr-1" />} placeholder="Booking ID" />
            </Form.Item>
            <Form.Item
              name="customerName"
              className="tw-mb-2 tw-flex-grow tw-min-w-[150px] sm:tw-min-w-0 sm:tw-flex-grow-0"
            >
              <Input prefix={<User size={14} className="tw-mr-1" />} placeholder="Customer Name" />
            </Form.Item>
            <Form.Item
              name="date"
              className="tw-mb-2 tw-flex-grow tw-min-w-[150px] sm:tw-min-w-0 sm:tw-flex-grow-0"
            >
              <DatePicker
                placeholder="Select Date"
                format="YYYY-MM-DD"
                className="tw-min-w-[150px]"
                getPopupContainer={trigger => trigger.parentNode}
              />
            </Form.Item>
            <Form.Item
              name="status"
              className="tw-mb-2 tw-flex-grow tw-min-w-[150px] sm:tw-min-w-0 sm:tw-flex-grow-0"
            >
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

        <Tabs defaultActiveKey="all" onChange={handleTabChange} className="tw-overflow-x-auto">
          <TabPane tab="All Bookings" key="all">
            <div className="tw-overflow-x-auto">
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
                scroll={{ x: 'max-content' }}
              />
            </div>
          </TabPane>
          <TabPane tab="Pending" key="pending">
            <div className="tw-overflow-x-auto">
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
                scroll={{ x: 'max-content' }}
              />
            </div>
          </TabPane>
          <TabPane tab="Confirmed" key="confirmed">
            <div className="tw-overflow-x-auto">
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
                scroll={{ x: 'max-content' }}
              />
            </div>
          </TabPane>
          <TabPane tab="Completed" key="completed">
            <div className="tw-overflow-x-auto">
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
                scroll={{ x: 'max-content' }}
              />
            </div>
          </TabPane>
          <TabPane tab="Cancelled" key="cancelled">
            <div className="tw-overflow-x-auto">
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
                scroll={{ x: 'max-content' }}
              />
            </div>
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
