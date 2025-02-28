import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  message,
  Upload,
  Divider,
  Space,
  Tooltip,
  Tag,
} from 'antd'
import { PlusOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Plus, Edit, Trash2, Car } from 'lucide-react'
import ApiService from '@/services/api.service'

const { Option } = Select

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])
  const [uploadLoading, setUploadLoading] = useState(false)

  const fetchVehicles = async () => {
    setLoading(true)
    try {
      const response = await ApiService.get('/vehicles')
      setVehicles(response.data.results || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
      message.error('Failed to fetch vehicles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleEdit = record => {
    setEditingId(record._id)

    // Set form values
    form.setFieldsValue({
      name: record.name,
      type: record.type,
      description: record.description,
      capacity: {
        passengers: record.capacity.passengers,
        luggage: record.capacity.luggage,
      },
      features: record.features,
      pricing: {
        basePrice: record.pricing.basePrice,
        pricePerKm: record.pricing.pricePerKm,
      },
      isAvailable: record.isAvailable,
    })

    // Set image if available
    if (record.image) {
      setFileList([
        {
          uid: '-1',
          name: 'vehicle-image.png',
          status: 'done',
          url: record.image,
        },
      ])
    } else {
      setFileList([])
    }

    setModalVisible(true)
  }

  const handleDelete = async id => {
    try {
      await ApiService.delete(`/vehicles/${id}`)
      message.success('Vehicle deleted successfully')
      fetchVehicles()
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      message.error('Failed to delete vehicle')
    }
  }

  const handleSubmit = async values => {
    try {
      setUploadLoading(true)
      let imageUrl = null

      // If there's a file to upload
      if (fileList.length > 0 && fileList[0].originFileObj) {
        const formData = new FormData()
        formData.append('file', fileList[0].originFileObj)
        const uploadResponse = await ApiService.post('/upload', formData)
        imageUrl = uploadResponse.data.url
      } else if (fileList.length > 0 && fileList[0].url) {
        // Keep existing image
        imageUrl = fileList[0].url
      }

      const vehicleData = {
        ...values,
        ...(imageUrl && { image: imageUrl }),
      }

      if (editingId) {
        await ApiService.put(`/vehicles/${editingId}`, vehicleData)
        message.success('Vehicle updated successfully')
      } else {
        await ApiService.post('/vehicles', vehicleData)
        message.success('Vehicle created successfully')
      }

      setModalVisible(false)
      form.resetFields()
      setFileList([])
      setEditingId(null)
      fetchVehicles()
    } catch (error) {
      console.error('Error saving vehicle:', error)
      message.error('Failed to save vehicle')
    } finally {
      setUploadLoading(false)
    }
  }

  const getVehicleTypeTag = type => {
    const colors = {
      SUV: 'blue',
      Sedan: 'green',
      Luxury: 'purple',
      Van: 'orange',
      Limo: 'red',
    }

    return <Tag color={colors[type] || 'default'}>{type}</Tag>
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image =>
        image ? (
          <img
            src={image}
            alt="Vehicle"
            style={{ height: 40, width: 'auto', borderRadius: '4px' }}
          />
        ) : (
          <Car size={24} className="tw-text-gray-400" />
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: type => getVehicleTypeTag(type),
    },
    {
      title: 'Capacity',
      key: 'capacity',
      render: (_, record) => (
        <span>
          {record.capacity.passengers} passengers, {record.capacity.luggage} luggage
        </span>
      ),
    },
    {
      title: 'Base Price',
      dataIndex: ['pricing', 'basePrice'],
      key: 'basePrice',
      render: price => `$${price.toFixed(2)}`,
    },
    {
      title: 'Available',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: isAvailable => <Switch checked={isAvailable} disabled />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="tw-flex tw-gap-2">
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
            className="tw-text-blue-500 hover:tw-text-blue-700"
          />
          <Button
            type="text"
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record._id)}
            className="tw-text-red-500 hover:tw-text-red-700"
          />
        </div>
      ),
    },
  ]

  const uploadProps = {
    onRemove: () => {
      setFileList([])
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

      setFileList([file])
      return false
    },
    fileList,
  }

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Vehicle Fleet</h1>
          <p className="tw-text-sm tw-text-gray-500">Manage your transportation vehicles</p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} className="tw-mr-2" />}
          onClick={() => {
            setEditingId(null)
            form.resetFields()
            setFileList([])
            setModalVisible(true)
          }}
          className="tw-bg-blue-600 hover:tw-bg-blue-700"
        >
          Add Vehicle
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <Table
          columns={columns}
          dataSource={vehicles}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Vehicle' : 'Add Vehicle'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setFileList([])
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            capacity: { passengers: 4, luggage: 4 },
            pricing: { basePrice: 100, pricePerKm: 0 },
            isAvailable: true,
            features: [],
          }}
        >
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              name="name"
              label="Vehicle Name"
              rules={[{ required: true, message: 'Please enter vehicle name' }]}
            >
              <Input placeholder="e.g. Luxury Sedan, Premium SUV" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Vehicle Type"
              rules={[{ required: true, message: 'Please select vehicle type' }]}
            >
              <Select placeholder="Select vehicle type">
                <Option value="Sedan">Sedan</Option>
                <Option value="SUV">SUV</Option>
                <Option value="Van">Van</Option>
                <Option value="Luxury">Luxury</Option>
                <Option value="Limo">Limousine</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea rows={3} placeholder="Vehicle description" />
          </Form.Item>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              label="Capacity"
              required
              tooltip={{
                title: 'Maximum number of passengers and luggage',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input.Group compact>
                <Form.Item
                  name={['capacity', 'passengers']}
                  noStyle
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber
                    placeholder="Passengers"
                    min={1}
                    addonBefore="Passengers"
                    style={{ width: '50%' }}
                  />
                </Form.Item>
                <Form.Item
                  name={['capacity', 'luggage']}
                  noStyle
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber
                    placeholder="Luggage"
                    min={0}
                    addonBefore="Luggage"
                    style={{ width: '50%' }}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item
              name="features"
              label="Features"
              tooltip={{
                title: 'Select all available features',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Select mode="multiple" placeholder="Select features">
                <Option value="wifi">WiFi</Option>
                <Option value="leather">Leather Seats</Option>
                <Option value="ac">Climate Control</Option>
                <Option value="water">Bottled Water</Option>
                <Option value="charger">Phone Charger</Option>
                <Option value="tv">TV Screens</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              label="Pricing"
              required
              tooltip={{
                title: 'Base price and price per kilometer',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input.Group compact>
                <Form.Item
                  name={['pricing', 'basePrice']}
                  noStyle
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber
                    placeholder="Base Price"
                    min={0}
                    precision={2}
                    addonBefore="Base $"
                    style={{ width: '50%' }}
                  />
                </Form.Item>
                <Form.Item
                  name={['pricing', 'pricePerKm']}
                  noStyle
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <InputNumber
                    placeholder="Price per km"
                    min={0}
                    precision={2}
                    addonBefore="$/km"
                    style={{ width: '50%' }}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <Form.Item name="isAvailable" valuePropName="checked" label="Available">
              <Switch checkedChildren="Available" unCheckedChildren="Unavailable" />
            </Form.Item>
          </div>

          <Divider />

          <Form.Item
            label="Vehicle Image"
            tooltip={{
              title: 'Upload an image of the vehicle',
              icon: <InfoCircleOutlined />,
            }}
          >
            <Upload {...uploadProps} listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <div className="tw-flex tw-justify-end tw-mt-4">
            <Space>
              <Button
                onClick={() => {
                  setModalVisible(false)
                  form.resetFields()
                  setFileList([])
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={uploadLoading}>
                {editingId ? 'Update' : 'Create'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default VehiclesPage
