import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarClock,
  Car,
  Plus,
  ShoppingBag,
  Calendar,
  Settings as SettingsIcon,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { Layout } from 'antd'

const { Sider, Content } = Layout

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarClock },
  { name: 'Services', href: '/dashboard/services', icon: Car },
  { name: 'Extras', href: '/dashboard/extras', icon: Plus },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Vehicles', href: '/dashboard/vehicles', icon: ShoppingBag },
  { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
]

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="tw-min-h-screen">
      <Sider
        width={280}
        collapsed={collapsed}
        className="tw-fixed tw-left-0 tw-top-0 tw-h-screen tw-bg-white tw-border-r tw-border-gray-200"
        theme="light"
      >
        <div className="tw-h-16 tw-flex tw-items-center tw-justify-between tw-px-4 tw-border-b tw-border-gray-200">
          <Link to="/dashboard" className="tw-flex tw-items-center tw-gap-2">
            {!collapsed && (
              <span className="tw-text-xl tw-font-bold tw-text-gray-900">Admin Dashboard</span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="tw-p-2 tw-rounded-md hover:tw-bg-gray-100 tw-transition-colors"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="tw-mt-6 tw-px-2">
          {navigation.map(item => {
            const isActive = location.pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`tw-flex tw-items-center tw-px-4 tw-py-3 tw-text-sm tw-font-medium tw-rounded-md tw-mb-1 tw-transition-colors ${
                  isActive
                    ? 'tw-bg-primary-50 tw-text-primary-600'
                    : 'tw-text-gray-700 hover:tw-bg-gray-50'
                }`}
              >
                <Icon
                  className={`tw-mr-3 tw-h-5 tw-w-5 ${
                    isActive ? 'tw-text-primary-600' : 'tw-text-gray-400'
                  }`}
                />
                {!collapsed && item.name}
              </Link>
            )
          })}
        </nav>

        <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-p-4 tw-border-t tw-border-gray-200">
          <button className="tw-flex tw-items-center tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 tw-rounded-md tw-transition-colors">
            <LogOut className="tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </Sider>

      <Layout className={`${collapsed ? 'tw-ml-20' : 'tw-ml-[280px]'} tw-transition-all`}>
        <Content className="tw-p-8 tw-bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
