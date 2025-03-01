import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
  Switch,
  Card,
  Empty,
  Tag,
  Tooltip,
} from 'antd'
import { PlusCircle, Edit, Trash2, DollarSign, Users, Settings, Shield } from 'lucide-react'
import ApiService from '@/services/api.service'
import ServiceFormModal from './ServiceFormModal'

const { Option } = Select

const Services = () => {
  const [services, setServices] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [editingId, setEditingId] = useState(null)
  const [editingService, setEditingService] = useState(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const [servicesRes, vehiclesRes] = await Promise.all([
        ApiService.get('/services'),
        ApiService.get('/vehicles'),
      ])

      // Ensure services is an array before setting state
      const servicesData = Array.isArray(servicesRes.data)
        ? servicesRes.data
        : Array.isArray(servicesRes.data.results)
          ? servicesRes.data.results
          : []

      // Ensure vehicles is an array
      const vehiclesData = Array.isArray(vehiclesRes.data)
        ? vehiclesRes.data
        : Array.isArray(vehiclesRes.data.results)
          ? vehiclesRes.data.results
          : []

      setServices(servicesData)
      setVehicles(vehiclesData)
    } catch (error) {
      console.error('Failed to fetch services:', error)
      message.error('Failed to fetch services')
      // Set empty arrays to prevent errors
      setServices([])
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  // Function to get service type label with proper formatting
  const formatServiceType = type => {
    if (!type) return 'N/A'

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

  const getServiceTypeColor = type => {
    const colorMap = {
      'from-airport': 'blue',
      'to-airport': 'green',
      'round-trip': 'purple',
      hourly: 'orange',
      group: 'red',
      'per-person': 'geekblue',
      canyons: 'cyan',
      custom: 'magenta',
    }
    return colorMap[type] || 'default'
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="tw-font-medium">{text}</div>
          <div className="tw-text-xs tw-text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: type =>
        type ? <Tag color={getServiceTypeColor(type)}>{formatServiceType(type)}</Tag> : 'N/A',
      responsive: ['md'],
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (price, record) => (
        <div className="tw-flex tw-items-center">
          <DollarSign size={14} className="tw-mr-1 tw-text-green-600" />
          {price !== undefined && price !== null ? (
            <span>
              {parseFloat(price).toFixed(2)}
              {record.serviceType === 'hourly' && ' / hour'}
              {record.serviceType === 'per-person' && ' / person'}
            </span>
          ) : (
            'N/A'
          )}
        </div>
      ),
    },
    {
      title: 'Max Passengers',
      dataIndex: 'maxPassengers',
      key: 'maxPassengers',
      render: (max, record) => (
        <div className="tw-flex tw-items-center">
          <Users size={14} className="tw-mr-1" />
          {max || (record.requiresInquiry ? 'Unlimited' : 'N/A')}
          {record.requiresInquiry && (
            <Tag className="tw-ml-2" color="orange">
              Requires Inquiry
            </Tag>
          )}
        </div>
      ),
      responsive: ['lg'],
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: isActive => (
        <Tag color={isActive ? 'success' : 'error'}>{isActive ? 'Active' : 'Inactive'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit service">
            <Button
              type="text"
              icon={<Edit size={16} />}
              onClick={() => handleEdit(record)}
              className="tw-text-blue-600 hover:tw-text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Delete service">
            <Button
              type="text"
              icon={<Trash2 size={16} />}
              onClick={() => handleDelete(record.id)}
              className="tw-text-red-600 hover:tw-text-red-700"
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const handleEdit = record => {
    setEditingId(record.id)
    setEditingService(record)

    // Set form values including the service type
    form.setFieldsValue({
      ...record,
      vehicle: record.vehicle?.id,
    })
    setModalVisible(true)
  }

  const handleDelete = async id => {
    Modal.confirm({
      title: 'Are you sure you want to delete this service?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await ApiService.delete(`/services/${id}`)
          message.success('Service deleted successfully')
          fetchServices()
        } catch (error) {
          console.error('Failed to delete service:', error)
          message.error('Failed to delete service')
        }
      },
    })
  }

  const handleFormSubmit = async values => {
    try {
      if (editingId) {
        // In edit mode, don't try to change the serviceType if it's the same
        const updateData = { ...values }

        // If we're editing and not changing the serviceType, don't include it in the update
        if (editingService && updateData.serviceType === editingService.serviceType) {
          delete updateData.serviceType
        }

        await ApiService.patch(`/services/${editingId}`, updateData)
        message.success('Service updated successfully')
      } else {
        await ApiService.post('/services', values)
        message.success('Service created successfully')
      }
      setModalVisible(false)
      form.resetFields()
      setEditingId(null)
      setEditingService(null)
      fetchServices()
    } catch (error) {
      console.error('Failed to save service:', error)
      if (error.response && error.response.data && error.response.data.message) {
        message.error(`Failed to save service: ${error.response.data.message}`)
      } else {
        message.error('Failed to save service. Please try again.')
      }
    }
  }

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-center tw-gap-4 md:tw-gap-0">
        <div>
          <h1 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-text-gray-900">Services</h1>
          <p className="tw-text-sm tw-text-gray-500">Manage your transportation services</p>
        </div>
        <Button
          type="primary"
          icon={<PlusCircle size={16} className="tw-mr-2" />}
          onClick={() => {
            setEditingId(null)
            setEditingService(null)
            form.resetFields()
            setModalVisible(true)
          }}
          className="tw-bg-blue-600 hover:tw-bg-blue-700"
        >
          Add Service
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <div className="tw-overflow-x-auto">
          <Table
            columns={columns}
            dataSource={services}
            rowKey={record => record.id || Math.random().toString(36).substr(2, 9)}
            loading={loading}
            pagination={{ pageSize: 10 }}
            locale={{
              emptyText: <Empty description="No services found" />,
            }}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>

      <ServiceFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setEditingId(null)
          setEditingService(null)
        }}
        form={form}
        onFinish={handleFormSubmit}
        editingId={editingId}
        editingService={editingService}
        vehicles={vehicles}
      />
    </div>
  )
}

export default Services
