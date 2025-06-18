import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  message,
  Tabs,
  Empty,
  Space,
  Tag,
  Switch,
  Tooltip,
  Badge,
  Input,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Plus, Image, Edit, Trash2, Search, Filter, RefreshCw } from 'lucide-react'
import ApiService from '@/services/api.service'
import ExtrasFormModal from './ExtrasFormModal'

const { TabPane } = Tabs
const { Search: AntSearch } = Input

const ExtraServicePage = () => {
  const [extras, setExtras] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form] = Form.useForm()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchExtras = async (params = {}) => {
    setLoading(true)
    try {
      let url = '/extras'

      // Build query parameters
      const queryParams = { ...params }

      // Add category filter
      if (categoryFilter !== 'all') {
        queryParams.category = categoryFilter
      }

      // Add search filter
      if (searchText) {
        queryParams.name = searchText
      }

      // Add pagination
      queryParams.page = params.page || pagination.current
      queryParams.limit = params.pageSize || pagination.pageSize

      const response = await ApiService.get(url, { params: queryParams })

      // Make sure we have an array of extras
      const extrasData = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
          ? response.data.results
          : []

      // Debug logging
      console.log('Extras response:', response.data)
      console.log('Extras data:', extrasData)
      
      setExtras(extrasData)

      // Update pagination
      setPagination({
        ...pagination,
        current: response.data.page || 1,
        total: response.data.totalResults || extrasData.length,
      })
    } catch (error) {
      console.error('Error fetching extras:', error)
      message.error('Failed to fetch extras')
      setExtras([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExtras()
  }, [categoryFilter]) // Re-fetch when category filter changes

  const handleTableChange = (pagination, filters, sorter) => {
    fetchExtras({
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    })
  }

  const handleCategoryChange = key => {
    setCategoryFilter(key)
    // Reset pagination to first page
    setPagination({
      ...pagination,
      current: 1,
    })
  }

  const handleSearch = value => {
    setSearchText(value)
    // Reset pagination to first page
    setPagination({
      ...pagination,
      current: 1,
    })
    fetchExtras()
  }

  const resetFilters = () => {
    setSearchText('')
    // Reset pagination to first page
    setPagination({
      ...pagination,
      current: 1,
    })
    fetchExtras()
  }

  const handleEdit = record => {
    setEditingId(record._id)
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      type: record.type,
      category: record.category,
      maxQuantity: record.maxQuantity,
      isAvailable: record.isAvailable,
      slug: record.slug || '',
      sortOrder: record.sortOrder || 0,
    })

    // Set the image if available
    if (record.image) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
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
    if (!id) {
      message.error('Invalid extra ID')
      return
    }
    
    Modal.confirm({
      title: 'Are you sure you want to delete this extra?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await ApiService.delete(`/extras/${id}`)
          message.success('Extra deleted successfully')
          fetchExtras()
        } catch (error) {
          console.error('Error deleting extra:', error)
          message.error('Failed to delete extra')
        }
      },
    })
  }

  const handleSubmit = async values => {
    try {
      const extraData = { ...values }

      if (editingId) {
        await ApiService.put(`/extras/${editingId}`, extraData)
        message.success('Extra updated successfully')
      } else {
        await ApiService.post('/extras', extraData)
        message.success('Extra created successfully')
      }

      setModalVisible(false)
      form.resetFields()
      setFileList([])
      setEditingId(null)
      fetchExtras()
    } catch (error) {
      console.error('Error saving extra:', error)
      message.error('Failed to save extra')
    } finally {
    }
  }

  const getAvailabilityTag = isAvailable => {
    return isAvailable ? (
      <Badge status="success" text="Available" />
    ) : (
      <Badge status="error" text="Unavailable" />
    )
  }

  const getCategoryTag = category => {
    const colors = {
      childSeat: 'blue',
      drink: 'green',
      service: 'purple',
      amenity: 'orange',
    }

    const formattedCategory = category.replace(/([A-Z])/g, ' $1').trim()

    return <Tag color={colors[category] || 'default'}>{formattedCategory}</Tag>
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="tw-flex tw-items-center">
          {record.image && (
            <img
              src={record.image}
              alt={text}
              className="tw-w-8 tw-h-8 tw-rounded tw-mr-2 tw-object-cover"
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => getCategoryTag(category),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: text => <span className="tw-capitalize">{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${parseFloat(price).toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Max Quantity',
      dataIndex: 'maxQuantity',
      key: 'maxQuantity',
      align: 'center',
    },
    {
      title: 'Available',
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: isAvailable => getAvailabilityTag(isAvailable),
      filters: [
        { text: 'Available', value: true },
        { text: 'Unavailable', value: false },
      ],
      onFilter: (value, record) => record.isAvailable === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="tw-flex tw-gap-2">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<Edit size={16} />}
              onClick={() => handleEdit(record)}
              className="tw-text-blue-500 hover:tw-text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<Trash2 size={16} />}
              onClick={() => {
                console.log('Delete clicked for:', record._id, 'Full record:', record)
                handleDelete(record._id)
              }}
              className="tw-text-red-500 hover:tw-text-red-700"
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Extra Services</h1>
          <p className="tw-text-sm tw-text-gray-500">
            Manage additional services and add-ons for bookings
          </p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} className="tw-mr-2" />}
          onClick={() => {
            setEditingId(null)
            setFileList([])
            form.resetFields()
            setModalVisible(true)
          }}
          className="tw-bg-blue-600 hover:tw-bg-blue-700"
        >
          Add Extra
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <div className="tw-mb-6 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-4">
          <AntSearch
            placeholder="Search by name"
            allowClear
            enterButton={<Search size={16} />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onSearch={handleSearch}
            className="tw-max-w-xs"
          />

          <Space>
            <Tooltip title="Reset all filters">
              <Button icon={<RefreshCw size={16} className="tw-mr-2" />} onClick={resetFilters}>
                Reset
              </Button>
            </Tooltip>
          </Space>
        </div>

        <Tabs defaultActiveKey="all" onChange={handleCategoryChange}>
          <TabPane tab="All Extras" key="all">
            <Table
              columns={columns}
              dataSource={extras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No extras found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Child Seats" key="childSeat">
            <Table
              columns={columns}
              dataSource={extras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No child seats found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Drinks" key="drink">
            <Table
              columns={columns}
              dataSource={extras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No drinks found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Services" key="service">
            <Table
              columns={columns}
              dataSource={extras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No services found" />,
              }}
            />
          </TabPane>
          <TabPane tab="Amenities" key="amenity">
            <Table
              columns={columns}
              dataSource={extras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No amenities found" />,
              }}
            />
          </TabPane>
        </Tabs>
      </Card>

      <ExtrasFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setFileList([])
        }}
        form={form}
        onFinish={handleSubmit}
        editingId={editingId}
      />
    </div>
  )
}

export default ExtraServicePage
