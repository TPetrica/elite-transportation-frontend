// src/pages/dashboard/services/index.jsx
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
} from 'antd'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import axios from 'axios'

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
        axios.get('/api/services'),
        axios.get('/api/vehicles'),
      ])
      setServices(servicesRes.data)
      setVehicles(vehiclesRes.data)
    } catch (error) {
      message.error('Failed to fetch services')
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
      render: text => <span className="tw-capitalize">{text.replace(/-/g, ' ')}</span>,
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: price => `$${price.toFixed(2)}`,
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
      render: isActive => <Switch checked={isActive} disabled />,
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
    try {
      await axios.delete(`/api/services/${id}`)
      message.success('Service deleted successfully')
      fetchServices()
    } catch (error) {
      message.error('Failed to delete service')
    }
  }

  const handleSubmit = async values => {
    try {
      if (editingId) {
        await axios.put(`/api/services/${editingId}`, values)
        message.success('Service updated successfully')
      } else {
        await axios.post('/api/services', values)
        message.success('Service created successfully')
      }
      setModalVisible(false)
      form.resetFields()
      setEditingId(null)
      fetchServices()
    } catch (error) {
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
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Service' : 'Add Service'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setEditingId(null)
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="tw-mt-4">
          <Form.Item
            name="id"
            label="Service Type"
            rules={[{ required: true, message: 'Please select service type' }]}
          >
            <Select>
              <Option value="to-airport">To Airport</Option>
              <Option value="from-airport">From Airport</Option>
              <Option value="round-trip">Round Trip</Option>
              <Option value="hourly">Hourly</Option>
              <Option value="group">Group</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[{ required: true, message: 'Please enter base price' }]}
          >
            <InputNumber min={0} precision={2} style={{ width: '100%' }} prefix="$" />
          </Form.Item>

          <Form.Item
            name="vehicle"
            label="Vehicle"
            rules={[{ required: true, message: 'Please select vehicle' }]}
          >
            <Select>
              {vehicles.map(vehicle => (
                <Option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isActive" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item className="tw-mb-0 tw-text-right">
            <Space>
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Services
