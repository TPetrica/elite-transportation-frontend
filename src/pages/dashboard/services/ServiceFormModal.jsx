import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Switch,
  Tabs,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import { ArrowRight, Clock, DollarSign, Save, Settings, Tag as TagIcon, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs

const ServiceFormModal = ({
  visible,
  onCancel,
  form,
  onFinish,
  editingId,
  editingService,
}) => {

  const [activeTab, setActiveTab] = useState('basic')
  const [customServiceType, setCustomServiceType] = useState(false)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (visible) {
      setActiveTab('basic')
      // If editing, check if we need to set customServiceType
      if (editingService) {
        const isCommonType = commonServiceTypes.some(
          type => type.value === editingService.serviceType
        )
        setCustomServiceType(!isCommonType)
      } else {
        setCustomServiceType(false)
      }
    }
  }, [visible, editingService])

  // Common service types as suggestions
  const commonServiceTypes = [
    { value: 'from-airport', label: 'From Airport' },
    { value: 'to-airport', label: 'To Airport' },
    { value: 'round-trip', label: 'Round Trip' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'group', label: 'Group' },
    { value: 'per-person', label: 'Per Person' },
    { value: 'canyons', label: 'Canyons' },
  ]

  // Options for service type dropdown or autocomplete
  const serviceTypeOptions = customServiceType
    ? []
    : commonServiceTypes.map(type => ({ value: type.value, label: type.label }))

  const handleRequiresInquiryChange = value => {
    if (value) {
      form.setFieldsValue({ basePrice: 0 })
    }
  }

  const handleServiceTypeChange = value => {
    if (value === 'custom') {
      setCustomServiceType(true)
      form.setFieldsValue({ serviceType: '' })
    } else {
      setCustomServiceType(false)
    }
  }

  const formatServiceType = type => {
    if (!type) return ''

    // Special cases
    if (type === 'to-airport') return 'To Airport'
    if (type === 'from-airport') return 'From Airport'
    if (type === 'per-person') return 'Per Person'

    // Default case: capitalize and replace hyphens with spaces
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Function to handle form submission by moving through the tabs
  const handleNext = () => {
    form
      .validateFields(['title', 'serviceType', 'description'])
      .then(() => {
        setActiveTab('pricing')
      })
      .catch(error => {
        console.log('Validation failed:', error)
      })
  }

  const getServiceTypeColor = type => {
    const colorMap = {
      'from-airport': 'blue',
      'to-airport': 'green',
      'round-trip': 'purple',
      hourly: 'orange',
      group: 'red',
      'per-person': 'geekblue',
      canyons: 'cyan',
    }
    return colorMap[type] || 'default'
  }

  const modalFooter =
    activeTab === 'basic'
      ? [
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="next"
            type="primary"
            onClick={handleNext}
            icon={<ArrowRight size={16} className="tw-ml-2" />}
            iconPosition="right"
          >
            Next
          </Button>,
        ]
      : [
          <Button key="back" onClick={() => setActiveTab('basic')}>
            Back
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            icon={<Save size={16} className="tw-mr-2" />}
          >
            {editingId ? 'Update Service' : 'Create Service'}
          </Button>,
        ]

  return (
    <Modal
      open={visible}
      title={
        <div className="tw-flex tw-items-center">
          <Settings size={18} className="tw-mr-2" />
          <span>{editingId ? 'Edit Service' : 'Add New Service'}</span>
        </div>
      }
      footer={modalFooter}
      onCancel={onCancel}
      width={700}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isActive: true,
          requiresInquiry: false,
          maxPassengers: 4,
          basePrice: 0,
          sortOrder: 0,
        }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span className="tw-flex tw-items-center">
                <TagIcon size={16} className="tw-mr-2" />
                Basic Information
              </span>
            }
            key="basic"
          >
            <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
              <Title level={5} className="tw-mb-1">
                Service Details
              </Title>
              <Text type="secondary">
                Define the basic information for this transportation service.
              </Text>
            </div>

            <Form.Item
              name="title"
              label="Service Title"
              rules={[{ required: true, message: 'Please enter the service title' }]}
            >
              <Input
                placeholder="e.g. From Airport (1-4 Passengers)"
                prefix={<TagIcon size={16} className="tw-opacity-50 tw-mr-1" />}
              />
            </Form.Item>

            <Form.Item
              name="serviceType"
              label={
                <span className="tw-flex tw-items-center">
                  Service Type ID
                  <Tooltip title="This identifier is used for internal references and pricing calculations. Use kebab case (e.g. from-airport).">
                    <QuestionCircleOutlined className="tw-ml-2" />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: 'Please select or enter a service type' },
                {
                  pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                  message: 'Use only lowercase letters, numbers, and hyphens',
                },
              ]}
              extra={
                <div className="tw-mt-1">
                  {!customServiceType && !editingId && (
                    <div className="tw-mb-2">
                      <Text type="secondary">Common service types:</Text>
                      <div className="tw-mt-1 tw-space-x-1">
                        {commonServiceTypes.map(type => (
                          <Tag
                            key={type.value}
                            color={getServiceTypeColor(type.value)}
                            className="tw-cursor-pointer"
                            onClick={() => form.setFieldsValue({ serviceType: type.value })}
                          >
                            {type.label}
                          </Tag>
                        ))}
                        <Tag
                          className="tw-cursor-pointer"
                          onClick={() => setCustomServiceType(true)}
                        >
                          + Custom
                        </Tag>
                      </div>
                    </div>
                  )}
                </div>
              }
            >
              {customServiceType ? (
                <Input
                  placeholder="e.g. luxury-transfer"
                  addonBefore="service-id:"
                  suffix={
                    <Button type="link" size="small" onClick={() => setCustomServiceType(false)}>
                      Use preset
                    </Button>
                  }
                  disabled={!!editingId} // Disable if editing
                />
              ) : (
                <Select
                  placeholder="Select a service type"
                  options={serviceTypeOptions}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={handleServiceTypeChange}
                  disabled={!!editingId} // Disable if editing
                />
              )}
            </Form.Item>

            {editingId && (
              <Alert
                message="Service Type is read-only"
                description="To maintain data integrity, you cannot change the service type after creation. You can create a new service type instead."
                type="info"
                showIcon
                className="tw-mb-4"
              />
            )}

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter a description' }]}
            >
              <TextArea
                rows={3}
                placeholder="e.g. Airport pickup with flight tracking - $120"
                showCount
                maxLength={200}
              />
            </Form.Item>
          </TabPane>

          <TabPane
            tab={
              <span className="tw-flex tw-items-center">
                <DollarSign size={16} className="tw-mr-2" />
                Pricing & Capacity
              </span>
            }
            key="pricing"
          >
            <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
              <Title level={5} className="tw-mb-1">
                Service Configuration
              </Title>
              <Text type="secondary">Set pricing, capacity, and other configuration options.</Text>
            </div>

            <Card className="tw-mb-4">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                <Title level={5} className="tw-mb-0">
                  Pricing
                </Title>
                <Tooltip title="Set to $0 if using 'Requires Inquiry'">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>

              <Form.Item
                name="basePrice"
                label={
                  <span>
                    Base Price
                    <Form.Item noStyle shouldUpdate>
                      {({ getFieldValue }) => {
                        const serviceType = getFieldValue('serviceType')
                        return (
                          <span className="tw-text-gray-400 tw-ml-2">
                            {serviceType === 'hourly' && '(per hour)'}
                            {serviceType === 'per-person' && '(per person)'}
                          </span>
                        )
                      }}
                    </Form.Item>
                  </span>
                }
                rules={[{ required: true, message: 'Please enter the base price' }]}
              >
                <InputNumber
                  addonBefore={<DollarSign size={14} />}
                  min={0}
                  step={1}
                  precision={2}
                  style={{ width: '100%' }}
                  placeholder="0.00"
                  disabled={form.getFieldValue('requiresInquiry')}
                />
              </Form.Item>

              <Form.Item
                name="requiresInquiry"
                valuePropName="checked"
                tooltip="Enable if this service requires customer inquiry rather than direct booking"
              >
                <Switch
                  onChange={handleRequiresInquiryChange}
                  checkedChildren="Requires Inquiry"
                  unCheckedChildren="Direct Booking"
                />
              </Form.Item>

              {form.getFieldValue('requiresInquiry') && (
                <Alert
                  message="Inquiry Mode"
                  description="In inquiry mode, customers must contact you for pricing. The base price will be set to $0."
                  type="info"
                  showIcon
                  className="tw-mb-3"
                />
              )}
            </Card>

            <Card className="tw-mb-4">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                <Title level={5} className="tw-mb-0">
                  Capacity & Ordering
                </Title>
                <Tooltip title="Configure passenger limits and display order">
                  <InfoCircleOutlined />
                </Tooltip>
              </div>

              <Space className="tw-w-full tw-flex tw-flex-col sm:tw-flex-row">
                <Form.Item
                  name="maxPassengers"
                  label={
                    <span className="tw-flex tw-items-center">
                      <Users size={14} className="tw-mr-1" /> Max Passengers
                    </span>
                  }
                  className="tw-w-full sm:tw-w-1/2"
                >
                  <InputNumber
                    min={1}
                    step={1}
                    style={{ width: '100%' }}
                    placeholder="4"
                    disabled={form.getFieldValue('requiresInquiry')}
                  />
                </Form.Item>

                <Form.Item
                  name="sortOrder"
                  label={
                    <span className="tw-flex tw-items-center">
                      <Clock size={14} className="tw-mr-1" /> Display Order
                    </span>
                  }
                  className="tw-w-full sm:tw-w-1/2"
                  tooltip="Lower numbers appear first in listings"
                >
                  <InputNumber min={0} step={1} style={{ width: '100%' }} placeholder="0" />
                </Form.Item>
              </Space>
            </Card>

            <Card>
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                <Title level={5} className="tw-mb-0">
                  Additional Configuration
                </Title>
              </div>

              <Form.Item name="isActive" label="Service Status" valuePropName="checked">
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                  className="tw-bg-gray-300"
                />
              </Form.Item>
            </Card>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  )
}

export default ServiceFormModal
