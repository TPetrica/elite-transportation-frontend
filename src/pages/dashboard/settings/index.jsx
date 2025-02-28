import React, { useState, useEffect } from 'react'
import {
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Select,
  message,
  Divider,
  Upload,
  Space,
  InputNumber,
} from 'antd'
import { UploadOutlined, SaveOutlined } from '@ant-design/icons'
import { Save } from 'lucide-react'
import ApiService from '@/services/api.service'

const { TabPane } = Tabs
const { Option } = Select
const { TextArea } = Input

const SettingsPage = () => {
  const [generalForm] = Form.useForm()
  const [emailForm] = Form.useForm()
  const [smsForm] = Form.useForm()
  const [pricingForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [logoFileList, setLogoFileList] = useState([])
  const [faviconFileList, setFaviconFileList] = useState([])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await ApiService.get('/settings')
      const settings = response.data

      // Set form values
      generalForm.setFieldsValue({
        siteName: settings.general?.siteName,
        siteDescription: settings.general?.siteDescription,
        contactEmail: settings.general?.contactEmail,
        contactPhone: settings.general?.contactPhone,
        businessAddress: settings.general?.businessAddress,
        siteEnabled: settings.general?.siteEnabled,
        maintenanceMode: settings.general?.maintenanceMode,
      })

      emailForm.setFieldsValue({
        smtpHost: settings.email?.smtpHost,
        smtpPort: settings.email?.smtpPort,
        smtpUser: settings.email?.smtpUser,
        smtpPassword: settings.email?.smtpPassword,
        emailFrom: settings.email?.emailFrom,
        emailEnabled: settings.email?.enabled,
      })

      smsForm.setFieldsValue({
        smsProvider: settings.sms?.provider,
        smsApiKey: settings.sms?.apiKey,
        smsFrom: settings.sms?.from,
        smsEnabled: settings.sms?.enabled,
      })

      pricingForm.setFieldsValue({
        currency: settings.pricing?.currency,
        taxRate: settings.pricing?.taxRate,
        defaultGratuity: settings.pricing?.defaultGratuity,
        nightServiceFee: settings.pricing?.nightServiceFee,
        cancellationFee: settings.pricing?.cancellationFee,
      })

      // Set images if available
      if (settings.general?.logo) {
        setLogoFileList([
          {
            uid: '-1',
            name: 'logo.png',
            status: 'done',
            url: settings.general.logo,
          },
        ])
      }

      if (settings.general?.favicon) {
        setFaviconFileList([
          {
            uid: '-1',
            name: 'favicon.ico',
            status: 'done',
            url: settings.general.favicon,
          },
        ])
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      message.error('Failed to fetch settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleGeneralSubmit = async values => {
    try {
      setLoading(true)

      let logoUrl = null
      let faviconUrl = null

      // Upload logo if changed
      if (logoFileList.length > 0 && logoFileList[0].originFileObj) {
        const formData = new FormData()
        formData.append('file', logoFileList[0].originFileObj)
        const uploadResponse = await ApiService.post('/upload', formData)
        logoUrl = uploadResponse.data.url
      } else if (logoFileList.length > 0 && logoFileList[0].url) {
        // Keep existing logo
        logoUrl = logoFileList[0].url
      }

      // Upload favicon if changed
      if (faviconFileList.length > 0 && faviconFileList[0].originFileObj) {
        const formData = new FormData()
        formData.append('file', faviconFileList[0].originFileObj)
        const uploadResponse = await ApiService.post('/upload', formData)
        faviconUrl = uploadResponse.data.url
      } else if (faviconFileList.length > 0 && faviconFileList[0].url) {
        // Keep existing favicon
        faviconUrl = faviconFileList[0].url
      }

      const generalData = {
        ...values,
        ...(logoUrl && { logo: logoUrl }),
        ...(faviconUrl && { favicon: faviconUrl }),
      }

      await ApiService.put('/settings/general', generalData)
      message.success('General settings updated successfully')
    } catch (error) {
      console.error('Error updating general settings:', error)
      message.error('Failed to update general settings')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSubmit = async values => {
    try {
      setLoading(true)
      await ApiService.put('/settings/email', values)
      message.success('Email settings updated successfully')
    } catch (error) {
      console.error('Error updating email settings:', error)
      message.error('Failed to update email settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSmsSubmit = async values => {
    try {
      setLoading(true)
      await ApiService.put('/settings/sms', values)
      message.success('SMS settings updated successfully')
    } catch (error) {
      console.error('Error updating SMS settings:', error)
      message.error('Failed to update SMS settings')
    } finally {
      setLoading(false)
    }
  }

  const handlePricingSubmit = async values => {
    try {
      setLoading(true)
      await ApiService.put('/settings/pricing', values)
      message.success('Pricing settings updated successfully')
    } catch (error) {
      console.error('Error updating pricing settings:', error)
      message.error('Failed to update pricing settings')
    } finally {
      setLoading(false)
    }
  }

  const logoUploadProps = {
    onRemove: () => {
      setLogoFileList([])
    },
    beforeUpload: file => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('You can only upload image files!')
        return Upload.LIST_IGNORE
      }

      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!')
        return Upload.LIST_IGNORE
      }

      setLogoFileList([file])
      return false
    },
    fileList: logoFileList,
  }

  const faviconUploadProps = {
    onRemove: () => {
      setFaviconFileList([])
    },
    beforeUpload: file => {
      const isValidType =
        file.type === 'image/x-icon' || file.type === 'image/png' || file.type === 'image/ico'
      if (!isValidType) {
        message.error('You can only upload ICO or PNG files for favicon!')
        return Upload.LIST_IGNORE
      }

      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        message.error('Favicon must be smaller than 1MB!')
        return Upload.LIST_IGNORE
      }

      setFaviconFileList([file])
      return false
    },
    fileList: faviconFileList,
  }

  return (
    <div className="tw-space-y-6">
      <div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Settings</h1>
        <p className="tw-text-sm tw-text-gray-500">Configure your application settings</p>
      </div>

      <Card className="tw-shadow-sm">
        <Tabs defaultActiveKey="general">
          <TabPane tab="General" key="general">
            <Form
              form={generalForm}
              layout="vertical"
              onFinish={handleGeneralSubmit}
              initialValues={{
                siteEnabled: true,
                maintenanceMode: false,
              }}
            >
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="siteName"
                  label="Site Name"
                  rules={[{ required: true, message: 'Please enter site name' }]}
                >
                  <Input placeholder="Your Business Name" />
                </Form.Item>

                <Form.Item
                  name="contactEmail"
                  label="Contact Email"
                  rules={[
                    { required: true, message: 'Please enter contact email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input placeholder="contact@example.com" />
                </Form.Item>
              </div>

              <Form.Item name="siteDescription" label="Site Description">
                <TextArea rows={3} placeholder="Short description of your business" />
              </Form.Item>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="contactPhone"
                  label="Contact Phone"
                  rules={[{ required: true, message: 'Please enter contact phone' }]}
                >
                  <Input placeholder="+1234567890" />
                </Form.Item>

                <Form.Item name="businessAddress" label="Business Address">
                  <Input placeholder="Your business address" />
                </Form.Item>
              </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item name="siteEnabled" valuePropName="checked" label="Site Enabled">
                  <Switch />
                </Form.Item>

                <Form.Item name="maintenanceMode" valuePropName="checked" label="Maintenance Mode">
                  <Switch />
                </Form.Item>
              </div>

              <Divider />

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item label="Site Logo">
                  <Upload {...logoUploadProps} listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload Logo</Button>
                  </Upload>
                </Form.Item>

                <Form.Item label="Site Favicon">
                  <Upload {...faviconUploadProps} listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload Favicon</Button>
                  </Upload>
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<Save size={16} className="tw-mr-1" />}
                >
                  Save General Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Email" key="email">
            <Form
              form={emailForm}
              layout="vertical"
              onFinish={handleEmailSubmit}
              initialValues={{
                emailEnabled: true,
              }}
            >
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="smtpHost"
                  label="SMTP Host"
                  rules={[{ required: true, message: 'Please enter SMTP host' }]}
                >
                  <Input placeholder="smtp.example.com" />
                </Form.Item>

                <Form.Item
                  name="smtpPort"
                  label="SMTP Port"
                  rules={[{ required: true, message: 'Please enter SMTP port' }]}
                >
                  <Input placeholder="587" />
                </Form.Item>
              </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="smtpUser"
                  label="SMTP Username"
                  rules={[{ required: true, message: 'Please enter SMTP username' }]}
                >
                  <Input placeholder="your-username" />
                </Form.Item>

                <Form.Item
                  name="smtpPassword"
                  label="SMTP Password"
                  rules={[{ required: true, message: 'Please enter SMTP password' }]}
                >
                  <Input.Password placeholder="your-password" />
                </Form.Item>
              </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="emailFrom"
                  label="Email From"
                  rules={[
                    { required: true, message: 'Please enter sender email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input placeholder="noreply@example.com" />
                </Form.Item>

                <Form.Item
                  name="emailEnabled"
                  valuePropName="checked"
                  label="Email Notifications Enabled"
                >
                  <Switch />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<Save size={16} className="tw-mr-1" />}
                >
                  Save Email Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="SMS" key="sms">
            <Form
              form={smsForm}
              layout="vertical"
              onFinish={handleSmsSubmit}
              initialValues={{
                smsEnabled: false,
                smsProvider: 'twilio',
              }}
            >
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="smsProvider"
                  label="SMS Provider"
                  rules={[{ required: true, message: 'Please select SMS provider' }]}
                >
                  <Select>
                    <Option value="twilio">Twilio</Option>
                    <Option value="nexmo">Nexmo</Option>
                    <Option value="aws">AWS SNS</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="smsApiKey"
                  label="API Key"
                  rules={[{ required: true, message: 'Please enter API key' }]}
                >
                  <Input.Password placeholder="Your API key" />
                </Form.Item>
              </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="smsFrom"
                  label="Sender ID / Phone Number"
                  rules={[{ required: true, message: 'Please enter sender ID' }]}
                >
                  <Input placeholder="Your company name or phone number" />
                </Form.Item>

                <Form.Item
                  name="smsEnabled"
                  valuePropName="checked"
                  label="SMS Notifications Enabled"
                >
                  <Switch />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<Save size={16} className="tw-mr-1" />}
                >
                  Save SMS Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Pricing" key="pricing">
            <Form
              form={pricingForm}
              layout="vertical"
              onFinish={handlePricingSubmit}
              initialValues={{
                currency: 'USD',
                taxRate: 0,
                defaultGratuity: 20,
                nightServiceFee: 20,
                cancellationFee: 0,
              }}
            >
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="currency"
                  label="Currency"
                  rules={[{ required: true, message: 'Please select currency' }]}
                >
                  <Select>
                    <Option value="USD">USD ($)</Option>
                    <Option value="EUR">EUR (€)</Option>
                    <Option value="GBP">GBP (£)</Option>
                    <Option value="CAD">CAD ($)</Option>
                    <Option value="AUD">AUD ($)</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="taxRate"
                  label="Tax Rate (%)"
                  rules={[{ required: true, message: 'Please enter tax rate' }]}
                >
                  <InputNumber min={0} max={100} precision={2} style={{ width: '100%' }} />
                </Form.Item>
              </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <Form.Item
                  name="defaultGratuity"
                  label="Default Gratuity (%)"
                  rules={[{ required: true, message: 'Please enter default gratuity' }]}
                >
                  <InputNumber min={0} max={100} precision={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name="nightServiceFee"
                  label="Night Service Fee ($)"
                  rules={[{ required: true, message: 'Please enter night service fee' }]}
                >
                  <InputNumber min={0} precision={2} style={{ width: '100%' }} />
                </Form.Item>
              </div>

              <Form.Item
                name="cancellationFee"
                label="Cancellation Fee ($)"
                rules={[{ required: true, message: 'Please enter cancellation fee' }]}
              >
                <InputNumber min={0} precision={2} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<Save size={16} className="tw-mr-1" />}
                >
                  Save Pricing Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

export default SettingsPage
