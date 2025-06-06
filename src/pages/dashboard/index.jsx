import { useEffect, useState } from 'react'

import ApiService from '@/services/api.service'
import {
  Alert, Button, Card, Col, DatePicker,
  Divider, Empty, Progress, Row, Select, Spin, Statistic,
  Table,
  Tag
} from 'antd'
import {
  Activity, BarChart, Calendar, CarFront,
  Clock,
  DollarSign, Plus
} from 'lucide-react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker

const DashboardHome = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    monthlyRevenue: 0,
    statusBreakdown: [],
    upcomingBookings: 0,
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('week') // 'week', 'month', 'year'
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [timeRange])

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Set date range based on selected time period
      const startDate = getStartDateForRange(timeRange)

      // API calls for dashboard data
      const [statsResponse, bookingsResponse] = await Promise.all([
        ApiService.get('/bookings/stats', {
          params: {
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
          },
        }),
        ApiService.get('/bookings', {
          params: {
            limit: 5,
            sortBy: 'createdAt:desc',
          },
        }),
      ])

      // Process stats data
      const statsData = statsResponse.data
      setStats({
        totalBookings: calculateTotalBookings(statsData.statusBreakdown || []),
        todayBookings: await fetchTodayBookingsCount(),
        monthlyRevenue: calculateTotalRevenue(statsData.statusBreakdown || []),
        statusBreakdown: statsData.statusBreakdown || [],
        upcomingBookings: statsData.upcomingBookings || 0,
      })

      // Process recent bookings
      const bookingsData = bookingsResponse.data
      setRecentBookings(Array.isArray(bookingsData.results) ? bookingsData.results : [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const getStartDateForRange = range => {
    switch (range) {
      case 'week':
        return moment().subtract(7, 'days')
      case 'month':
        return moment().subtract(30, 'days')
      case 'year':
        return moment().subtract(1, 'year')
      default:
        return moment().subtract(7, 'days')
    }
  }

  const fetchTodayBookingsCount = async () => {
    try {
      const today = moment().format('YYYY-MM-DD')
      const response = await ApiService.get('/bookings', {
        params: {
          date: today,
          limit: 1, // We just need the count
        },
      })
      return response.data.totalResults || 0
    } catch (error) {
      console.error("Error fetching today's bookings:", error)
      return 0
    }
  }


  const calculateTotalBookings = statusBreakdown => {
    return statusBreakdown.reduce((total, item) => total + (item.count || 0), 0)
  }

  const calculateTotalRevenue = statusBreakdown => {
    return statusBreakdown.reduce((total, item) => total + (item.totalRevenue || 0), 0)
  }

  const bookingColumns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      render: text => (
        <a onClick={() => navigate(`/invoice/${text}`)} className="tw-font-medium">
          {text}
        </a>
      ),
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
      render: service =>
        service ? <Tag color="blue">{service.replace(/-/g, ' ').toUpperCase()}</Tag> : 'N/A',
    },
    {
      title: 'Date',
      dataIndex: ['pickup', 'date'],
      key: 'date',
      render: date => (date ? moment(date).format('MMM DD, YYYY') : 'N/A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        const colors = {
          pending: 'orange',
          confirmed: 'green',
          cancelled: 'red',
          completed: 'blue',
        }
        return status ? (
          <Tag color={colors[status] || 'default'}>{status.toUpperCase()}</Tag>
        ) : (
          'N/A'
        )
      },
    },
  ]

  // Calculate percentages for the status breakdown chart
  const calculateStatusPercentages = () => {
    const total = calculateTotalBookings(stats.statusBreakdown)
    if (total === 0) return []

    return stats.statusBreakdown.map(item => ({
      status: item._id,
      count: item.count || 0,
      percentage: Math.round((item.count / total) * 100),
      color: getStatusColor(item._id),
    }))
  }

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return '#faad14'
      case 'confirmed':
        return '#1890ff'
      case 'completed':
        return '#52c41a'
      case 'cancelled':
        return '#f5222d'
      default:
        return '#d9d9d9'
    }
  }

  const statusPercentages = calculateStatusPercentages()

  if (loading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-64">
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="tw-p-6">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary" onClick={fetchDashboardData}>
              Retry
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Dashboard</h1>
          <p className="tw-text-sm tw-text-gray-500">
            Welcome back to your transportation management dashboard
          </p>
        </div>
        <div>
          <Select value={timeRange} onChange={value => setTimeRange(value)} className="tw-w-32">
            <Option value="week">Last 7 days</Option>
            <Option value="month">Last 30 days</Option>
            <Option value="year">Last year</Option>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full tw-shadow-sm tw-relative tw-overflow-hidden">
            <div className="tw-absolute tw-right-0 tw-top-0 tw-p-4 tw-opacity-10">
              <Clock size={48} className="tw-text-blue-500" />
            </div>
            <Statistic
              title={
                <span className="tw-flex tw-items-center">
                  <Clock size={20} className="tw-text-blue-500 tw-mr-2" />
                  Total Bookings
                </span>
              }
              value={stats.totalBookings}
              suffix={
                <Tag color="blue" className="tw-ml-2">
                  {timeRange === 'week' ? '7 days' : timeRange === 'month' ? '30 days' : '1 year'}
                </Tag>
              }
            />
            <div className="tw-mt-2 tw-text-gray-500">
              <small>{stats.upcomingBookings} upcoming bookings</small>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full tw-shadow-sm tw-relative tw-overflow-hidden">
            <div className="tw-absolute tw-right-0 tw-top-0 tw-p-4 tw-opacity-10">
              <Calendar size={48} className="tw-text-green-500" />
            </div>
            <Statistic
              title={
                <span className="tw-flex tw-items-center">
                  <Calendar size={20} className="tw-text-green-500 tw-mr-2" />
                  Today's Bookings
                </span>
              }
              value={stats.todayBookings}
            />
            <div className="tw-mt-2 tw-text-gray-500">
              <small>{moment().format('dddd, MMMM D, YYYY')}</small>
            </div>
          </Card>
        </Col>


        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full tw-shadow-sm tw-relative tw-overflow-hidden">
            <div className="tw-absolute tw-right-0 tw-top-0 tw-p-4 tw-opacity-10">
              <DollarSign size={48} className="tw-text-purple-500" />
            </div>
            <Statistic
              title={
                <span className="tw-flex tw-items-center">
                  <DollarSign size={20} className="tw-text-purple-500 tw-mr-2" />
                  Revenue
                </span>
              }
              value={stats.monthlyRevenue}
              precision={2}
              formatter={value => `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              suffix={
                <Tag color="purple" className="tw-ml-2">
                  {timeRange === 'week' ? '7 days' : timeRange === 'month' ? '30 days' : '1 year'}
                </Tag>
              }
            />
            <div className="tw-mt-2 tw-text-gray-500">
              <small>Total revenue in selected period</small>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Dashboard Content */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          {/* Recent Bookings */}
          <Card
            title={
              <span className="tw-flex tw-items-center">
                <Activity size={18} className="tw-mr-2" />
                Recent Bookings
              </span>
            }
            extra={<a onClick={() => navigate('/dashboard/bookings')}>View all</a>}
            bordered={false}
            className="tw-shadow-sm tw-mb-6"
          >
            <Table
              columns={bookingColumns}
              dataSource={recentBookings}
              rowKey="_id"
              pagination={false}
              size="small"
              locale={{
                emptyText: <Empty description="No recent bookings found" />,
              }}
            />
          </Card>

          {/* Upcoming Schedule */}
          <Card
            title={
              <span className="tw-flex tw-items-center">
                <Calendar size={18} className="tw-mr-2" />
                Upcoming Schedule
              </span>
            }
            extra={<a onClick={() => navigate('/dashboard/schedule')}>View calendar</a>}
            bordered={false}
            className="tw-shadow-sm"
          >
            {recentBookings
              .filter(
                booking =>
                  booking.status !== 'cancelled' &&
                  booking.status !== 'completed' &&
                  moment(booking.pickup.date).isSameOrAfter(moment(), 'day')
              )
              .sort((a, b) => moment(a.pickup.date).diff(moment(b.pickup.date)))
              .slice(0, 3)
              .map((booking, index) => (
                <div
                  key={booking._id}
                  className={`tw-p-3 tw-flex tw-items-center tw-justify-between tw-rounded-lg tw-mb-2 ${
                    moment(booking.pickup.date).isSame(moment(), 'day')
                      ? 'tw-bg-blue-50'
                      : 'tw-bg-gray-50'
                  }`}
                >
                  <div className="tw-flex tw-items-center">
                    <div
                      className={`tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mr-3 ${
                        moment(booking.pickup.date).isSame(moment(), 'day')
                          ? 'tw-bg-blue-100 tw-text-blue-600'
                          : 'tw-bg-gray-200'
                      }`}
                    >
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="tw-text-sm tw-font-medium">
                        {booking.passengerDetails.firstName} {booking.passengerDetails.lastName}
                      </div>
                      <div className="tw-text-xs tw-text-gray-500">
                        {booking.service.replace(/-/g, ' ')} • {booking.bookingNumber}
                      </div>
                    </div>
                  </div>
                  <div className="tw-text-right">
                    <div className="tw-text-sm tw-font-medium">
                      {moment(booking.pickup.date).format('MMM DD')} • {booking.pickup.time}
                    </div>
                    <div className="tw-text-xs tw-text-gray-500">
                      {booking.pickup.address.split(',')[0]}
                    </div>
                  </div>
                </div>
              ))}

            {recentBookings.filter(
              booking =>
                booking.status !== 'cancelled' &&
                booking.status !== 'completed' &&
                moment(booking.pickup.date).isSameOrAfter(moment(), 'day')
            ).length === 0 && <Empty description="No upcoming bookings" />}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {/* Booking Status Breakdown */}
          <Card
            title={
              <span className="tw-flex tw-items-center">
                <BarChart size={18} className="tw-mr-2" />
                Booking Status
              </span>
            }
            bordered={false}
            className="tw-shadow-sm tw-mb-6"
          >
            {statusPercentages.length > 0 ? (
              <div>
                {statusPercentages.map(item => (
                  <div key={item.status} className="tw-mb-4">
                    <div className="tw-flex tw-justify-between tw-mb-1">
                      <span className="tw-capitalize">{item.status}</span>
                      <span>
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <Progress
                      percent={item.percentage}
                      strokeColor={item.color}
                      showInfo={false}
                      size="small"
                    />
                  </div>
                ))}

                <Divider className="tw-my-4" />

                <div className="tw-flex tw-justify-between tw-text-sm">
                  <div className="tw-text-gray-500">Total Bookings:</div>
                  <div className="tw-font-medium">{stats.totalBookings}</div>
                </div>
              </div>
            ) : (
              <Empty description="No booking data available" />
            )}
          </Card>

          {/* Quick Actions */}
          <Card
            title={
              <span className="tw-flex tw-items-center">
                <Activity size={18} className="tw-mr-2" />
                Quick Actions
              </span>
            }
            bordered={false}
            className="tw-shadow-sm"
          >
            <div className="tw-grid tw-grid-cols-2 tw-gap-4">
              <Card
                className="tw-bg-blue-50 tw-border-blue-100 tw-cursor-pointer hover:tw-shadow-md tw-transition-all"
                onClick={() => navigate('/dashboard/bookings')}
              >
                <div className="tw-flex tw-flex-col tw-items-center tw-text-center">
                  <Clock size={24} className="tw-text-blue-500 tw-mb-2" />
                  <div className="tw-font-medium">Manage Bookings</div>
                </div>
              </Card>

              <Card
                className="tw-bg-green-50 tw-border-green-100 tw-cursor-pointer hover:tw-shadow-md tw-transition-all"
                onClick={() => navigate('/booking-time')}
              >
                <div className="tw-flex tw-flex-col tw-items-center tw-text-center">
                  <Plus size={24} className="tw-text-green-500 tw-mb-2" />
                  <div className="tw-font-medium">New Booking</div>
                </div>
              </Card>

              <Card
                className="tw-bg-purple-50 tw-border-purple-100 tw-cursor-pointer hover:tw-shadow-md tw-transition-all"
                onClick={() => navigate('/dashboard/schedule')}
              >
                <div className="tw-flex tw-flex-col tw-items-center tw-text-center">
                  <Calendar size={24} className="tw-text-purple-500 tw-mb-2" />
                  <div className="tw-font-medium">Schedule & Calendar</div>
                </div>
              </Card>

              <Card
                className="tw-bg-orange-50 tw-border-orange-100 tw-cursor-pointer hover:tw-shadow-md tw-transition-all"
                onClick={() => navigate('/dashboard/schedule')}
              >
                <div className="tw-flex tw-flex-col tw-items-center tw-text-center">
                  <Calendar size={24} className="tw-text-orange-500 tw-mb-2" />
                  <div className="tw-font-medium">View Schedule</div>
                </div>
              </Card>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardHome
