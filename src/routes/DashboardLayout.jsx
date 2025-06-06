import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
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
  User,
  FileText,
  Link2,
} from 'lucide-react'
import { Layout, Button, Dropdown, Avatar, Drawer, Menu as AntMenu } from 'antd'
import AuthService from '@/services/auth.service'

const { Sider, Content, Header } = Layout

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarClock },
  { name: 'Services', href: '/dashboard/services', icon: Car },
  { name: 'Extras', href: '/dashboard/extras', icon: Plus },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Blog Posts', href: '/dashboard/blogs', icon: FileText },
  { name: 'Affiliates', href: '/dashboard/affiliates', icon: Link2 },
  { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
]

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showMobileHeader, setShowMobileHeader] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if user is logged in
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }

    // Only admins can access the dashboard
    if (currentUser.role !== 'admin') {
      AuthService.logout()
      navigate('/login')
      return
    }

    setUser(currentUser)
  }, [navigate])

  // Detect screen size to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 992)
      setShowMobileHeader(window.innerWidth < 768)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
      onClick: () => navigate('/dashboard/profile'),
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogOut size={16} />,
      onClick: handleLogout,
    },
  ]

  // Mobile navigation
  const renderMobileNav = () => (
    <Drawer
      placement="left"
      onClose={toggleMobileDrawer}
      open={mobileOpen}
      width={250}
      bodyStyle={{ padding: 0 }}
      title="Dashboard"
    >
      <AntMenu mode="inline" selectedKeys={[location.pathname]} style={{ borderRight: 0 }}>
        {navigation.map(item => (
          <AntMenu.Item
            key={item.href}
            icon={<item.icon size={16} />}
            onClick={() => {
              navigate(item.href)
              setMobileOpen(false)
            }}
          >
            {item.name}
          </AntMenu.Item>
        ))}
        <AntMenu.Divider />
        <AntMenu.Item key="logout" icon={<LogOut size={16} />} onClick={handleLogout}>
          Logout
        </AntMenu.Item>
      </AntMenu>
    </Drawer>
  )

  return (
    <Layout className="tw-min-h-screen">
      {/* Desktop Sidebar */}
      <Sider
        width={280}
        collapsed={collapsed}
        className="tw-fixed tw-left-0 tw-top-0 tw-h-screen tw-bg-white tw-border-r tw-border-gray-200 tw-z-10 tw-hidden md:tw-block"
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
          <button
            className="tw-flex tw-items-center tw-w-full tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 tw-rounded-md tw-transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </Sider>

      {/* Mobile Header */}
      {showMobileHeader && (
        <Header className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-10 tw-bg-white tw-shadow-sm tw-px-4 tw-h-16 tw-flex tw-items-center tw-justify-between md:tw-hidden">
          <Button type="text" icon={<Menu size={20} />} onClick={toggleMobileDrawer} />

          <span className="tw-text-lg tw-font-bold">Admin Dashboard</span>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" className="tw-flex tw-items-center">
              <Avatar size="small" icon={<User size={16} />} className="tw-bg-blue-600" />
            </Button>
          </Dropdown>
        </Header>
      )}

      {/* Mobile Navigation Drawer */}
      {renderMobileNav()}

      {/* Main Content */}
      <Layout
        className={`
        ${collapsed ? 'md:tw-ml-20' : 'md:tw-ml-[280px]'} 
        tw-transition-all
        ${showMobileHeader ? 'tw-mt-16 md:tw-mt-0' : ''}
      `}
      >
        <Content className="tw-p-4 md:tw-p-8 tw-bg-gray-50">{user ? <Outlet /> : null}</Content>
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
