import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import AuthService from '@/services/auth.service'
import { Spin } from 'antd'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      const user = AuthService.getCurrentUser()

      if (!user) {
        setIsAuthenticated(false)
        setHasAccess(false)
      } else {
        setIsAuthenticated(true)

        // If we're requiring admin access, check role
        if (requireAdmin) {
          setHasAccess(user.role === 'admin')
        } else {
          setHasAccess(true)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [requireAdmin])

  if (isLoading) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!hasAccess) {
    // User is authenticated but doesn't have required role
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
