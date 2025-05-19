import React, { useState } from 'react'
import { Form, Input, Button, Card, Alert, Checkbox, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import AuthService from '@/services/auth.service'
import AuthLayout from '@/layouts/AuthLayout'

const { Title, Text } = Typography

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onFinish = async values => {
    setLoading(true)
    setError(null)

    try {
      const result = await AuthService.login(values.email, values.password)

      // Check user role - only admins can access the dashboard
      const user = result.user
      if (user.role !== 'admin') {
        setError('You do not have permission to access the admin dashboard')
        setLoading(false)
        return
      }

      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Card className="tw-w-full tw-max-w-md tw-shadow-lg">
        <div className="tw-text-center tw-mb-6">
          <Title level={2} className="tw-mb-1">
            Admin Dashboard
          </Title>
          <Text className="tw-text-gray-500">Sign in to access the dashboard</Text>
        </div>

        {error && (
          <Alert message="Error" description={error} type="error" showIcon className="tw-mb-6" />
        )}

        <Form name="login" layout="vertical" onFinish={onFinish} initialValues={{ remember: true }}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="tw-text-gray-400" />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="tw-text-gray-400" />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div className="tw-flex tw-justify-between tw-items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="tw-text-blue-600 hover:tw-text-blue-800">
                Forgot password?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="tw-w-full"
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </AuthLayout>
  )
}

export default LoginPage
