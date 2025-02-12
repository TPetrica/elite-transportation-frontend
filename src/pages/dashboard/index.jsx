// src/pages/dashboard/DashboardHome.jsx
import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic, Table, Tag, Empty } from 'antd'
import { CarFront, Clock, DollarSign, Users } from 'lucide-react'
import axios from 'axios'

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    activeVehicles: 0,
    monthlyRevenue: 0,
  })

  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for development - remove this when your API is ready
  const mockData = {
    stats: {
      totalBookings: 156,
      todayBookings: 8,
      activeVehicles: 12,
      monthlyRevenue: 15640,
    },
    bookings: [
      {
        bookingNumber: 'BK20240001',
        passengerDetails: {
          firstName: 'John',
          lastName: 'Doe',
        },
        service: 'to-airport',
        pickup: {
          date: '2024-02-12',
        },
        status: 'confirmed',
      },
      // Add more mock bookings if needed
    ],
  }

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Comment out API calls during development if they're not ready
      /*
      const [statsResponse, bookingsResponse] = await Promise.all([
        axios.get('/api/stats/dashboard'),
        axios.get('/api/bookings/recent'),
      ]);
      setStats(statsResponse.data);
      setRecentBookings(bookingsResponse.data);
      */

      // Use mock data instead
      setStats(mockData.stats)
      setRecentBookings(mockData.bookings)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Use mock data as fallback
      setStats(mockData.stats)
      setRecentBookings(mockData.bookings)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const bookingColumns = [
    {
      title: 'Booking ID',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
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
      render: date => (date ? new Date(date).toLocaleDateString() : 'N/A'),
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

  return (
    <div className="tw-space-y-6">
      <div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Dashboard</h1>
        <p className="tw-text-sm tw-text-gray-500">Welcome back to your dashboard</p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full">
            <Statistic
              title="Total Bookings"
              value={stats.totalBookings}
              prefix={<Clock className="tw-text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full">
            <Statistic
              title="Today's Bookings"
              value={stats.todayBookings}
              prefix={<CarFront className="tw-text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full">
            <Statistic
              title="Active Vehicles"
              value={stats.activeVehicles}
              prefix={<Users className="tw-text-orange-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="tw-h-full">
            <Statistic
              title="Monthly Revenue"
              value={stats.monthlyRevenue}
              prefix={<DollarSign className="tw-text-purple-500" />}
              precision={2}
              formatter={value => `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <Card title="Recent Bookings" bordered={false} className="tw-mt-6">
        <Table
          columns={bookingColumns}
          dataSource={recentBookings}
          loading={loading}
          rowKey="bookingNumber"
          pagination={{ pageSize: 5 }}
          locale={{
            emptyText: <Empty description="No bookings found" />,
          }}
        />
      </Card>
    </div>
  )
}

export default DashboardHome
