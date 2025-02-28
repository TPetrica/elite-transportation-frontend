import React, { useState } from 'react'
import { Form, Input, Button, Card, Alert, Typography } from 'antd'
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import AuthService from '@/services/auth.service'

const { Title, Text, Paragraph } = Typography

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = async values => {
    setLoading(true)
    setError(null)

    try {
      await AuthService.forgotPassword(values.email)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset password email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100 tw-p-4">
      <Card className="tw-w-full tw-max-w-md tw-shadow-lg">
        <div className="tw-mb-6">
          <Link
            to="/login"
            className="tw-flex tw-items-center tw-text-gray-600 hover:tw-text-gray-800"
          >
            <ArrowLeftOutlined className="tw-mr-1" /> Back to login
          </Link>
        </div>

        <div className="tw-text-center tw-mb-6">
          <Title level={2} className="tw-mb-1">
            Reset Password
          </Title>
          <Text className="tw-text-gray-500">
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </div>

        {error && (
          <Alert message="Error" description={error} type="error" showIcon className="tw-mb-6" />
        )}

        {success ? (
          <div className="tw-text-center">
            <Alert
              message="Reset Email Sent"
              description="Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
              type="success"
              showIcon
              className="tw-mb-6"
            />
            <Paragraph>
              <Link to="/login" className="tw-text-blue-600 hover:tw-text-blue-800">
                Return to login
              </Link>
            </Paragraph>
          </div>
        ) : (
          <Form name="forgot-password" layout="vertical" onFinish={onFinish}>
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="tw-w-full"
                size="large"
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
