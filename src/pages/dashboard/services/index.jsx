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
} from 'antd'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Service Type',
      dataIndex: 'id',
      key: 'id',
      render: text =>
        text ? <span className="tw-capitalize">{text.replace(/-/g, ' ')}</span> : 'N/A',
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: price =>
        price !== undefined && price !== null ? `$${parseFloat(price).toFixed(2)}` : 'N/A',
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
      render: vehicle => vehicle?.name || 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: isActive => <Switch checked={!!isActive} disabled />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
            className="tw-text-blue-600 hover:tw-text-blue-700"
          />
          <Button
            type="text"
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record._id)}
            className="tw-text-red-600 hover:tw-text-red-700"
          />
        </Space>
      ),
    },
  ]

  const handleEdit = record => {
    setEditingId(record._id)
    form.setFieldsValue({
      ...record,
      vehicle: record.vehicle?._id,
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
        await ApiService.put(`/services/${editingId}`, values)
        message.success('Service updated successfully')
      } else {
        await ApiService.post('/services', values)
        message.success('Service created successfully')
      }
      setModalVisible(false)
      form.resetFields()
      setEditingId(null)
      fetchServices()
    } catch (error) {
      console.error('Failed to save service:', error)
      message.error('Failed to save service')
    }
  }

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Services</h1>
          <p className="tw-text-sm tw-text-gray-500">Manage your transportation services</p>
        </div>
        <Button
          type="primary"
          icon={<PlusCircle size={16} className="tw-mr-2" />}
          onClick={() => {
            setEditingId(null)
            form.resetFields()
            setModalVisible(true)
          }}
          className="tw-bg-blue-600 hover:tw-bg-blue-700"
        >
          Add Service
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <Table
          columns={columns}
          dataSource={services}
          rowKey={record => record._id || Math.random().toString(36).substr(2, 9)}
          loading={loading}
          pagination={{ pageSize: 10 }}
          locale={{
            emptyText: <Empty description="No services found" />,
          }}
        />
      </Card>

      <ServiceFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setEditingId(null)
        }}
        form={form}
        onFinish={handleFormSubmit}
        editingId={editingId}
        vehicles={vehicles}
      />
    </div>
  )
}

export default Services
