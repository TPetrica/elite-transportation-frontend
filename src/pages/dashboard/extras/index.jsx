import React, { useState } from 'react'
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
  Tooltip,
  Badge,
  Input,
} from 'antd'
import { Plus, Edit, Trash2, Search, RefreshCw } from 'lucide-react'
import { useExtras, useCreateExtra, useUpdateExtra, useDeleteExtra } from '@/hooks/useQueryHooks'
import ExtrasFormModal from './ExtrasFormModal'

const { TabPane } = Tabs
const { Search: AntSearch } = Input

const ExtraServicePage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form] = Form.useForm()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [, setFileList] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  // Use cached hooks
  const { data: extrasResponse, isLoading: loading } = useExtras()
  const createExtraMutation = useCreateExtra()
  const updateExtraMutation = useUpdateExtra()
  const deleteExtraMutation = useDeleteExtra()

  // Process the extras data
  const extrasData = extrasResponse?.success ? extrasResponse.data : []
  const extras = Array.isArray(extrasData) ? extrasData : []

  // Filter extras on client side for now (can be optimized later)
  const filteredExtras = extras.filter(extra => {
    const matchesCategory = categoryFilter === 'all' || extra.category === categoryFilter
    const matchesSearch = !searchText || extra.name.toLowerCase().includes(searchText.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination(newPagination)
  }

  const handleCategoryChange = key => {
    setCategoryFilter(key)
    setPagination({ ...pagination, current: 1 })
  }

  const handleSearch = value => {
    setSearchText(value)
    setPagination({ ...pagination, current: 1 })
  }

  const resetFilters = () => {
    setSearchText('')
    setCategoryFilter('all')
    setPagination({ ...pagination, current: 1 })
  }

  const handleEdit = record => {
    const editId = record.id || record._id
    console.log('Editing record:', record, 'editId:', editId)
    setEditingId(editId)
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      type: record.type,
      category: record.category,
      maxQuantity: record.maxQuantity,
      isAvailable: record.isAvailable,
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
      onOk: () => {
        deleteExtraMutation.mutate(id)
      },
    })
  }

  const handleSubmit = async values => {
    // Backend currently supports only the core Extra fields (no slug/sortOrder).
    // Strip any UI-only fields to avoid validation errors.
    const extraData = { ...values }
    delete extraData.slug
    delete extraData.sortOrder

    if (editingId) {
      updateExtraMutation.mutate({ extraId: editingId, data: extraData }, {
        onSuccess: () => {
          setModalVisible(false)
          form.resetFields()
          setFileList([])
          setEditingId(null)
        }
      })
    } else {
      createExtraMutation.mutate(extraData, {
        onSuccess: () => {
          setModalVisible(false)
          form.resetFields()
          setFileList([])
          setEditingId(null)
        }
      })
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
        <span>{text}</span>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => getCategoryTag(category),
      responsive: ['sm'],
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: text => <span className="tw-capitalize">{text}</span>,
      responsive: ['md'],
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
      responsive: ['lg'],
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
      responsive: ['sm'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
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
        </Space>
      ),
    },
  ]

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-center tw-gap-4 md:tw-gap-0">
        <div>
          <h1 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-text-gray-900">Extra Services</h1>
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

        <div className="tw-overflow-x-auto">
          <Tabs defaultActiveKey="all" onChange={handleCategoryChange}>
            <TabPane tab="All Extras" key="all">
              <Table
              columns={columns}
              dataSource={filteredExtras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                total: filteredExtras.length,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No extras found" />,
              }}
              scroll={{ x: 'max-content' }}
            />
            </TabPane>
          <TabPane tab="Child Seats" key="childSeat">
            <Table
              columns={columns}
              dataSource={filteredExtras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                total: filteredExtras.length,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No child seats found" />,
              }}
              scroll={{ x: 'max-content' }}
            />
            </TabPane>
          <TabPane tab="Drinks" key="drink">
            <Table
              columns={columns}
              dataSource={filteredExtras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                total: filteredExtras.length,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No drinks found" />,
              }}
              scroll={{ x: 'max-content' }}
            />
            </TabPane>
          <TabPane tab="Services" key="service">
            <Table
              columns={columns}
              dataSource={filteredExtras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                total: filteredExtras.length,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No services found" />,
              }}
              scroll={{ x: 'max-content' }}
            />
            </TabPane>
          <TabPane tab="Amenities" key="amenity">
            <Table
              columns={columns}
              dataSource={filteredExtras}
              rowKey="_id"
              loading={loading}
              onChange={handleTableChange}
              pagination={{
                ...pagination,
                total: filteredExtras.length,
                showSizeChanger: true,
                showTotal: total => `Total ${total} items`,
              }}
              locale={{
                emptyText: <Empty description="No amenities found" />,
              }}
              scroll={{ x: 'max-content' }}
            />
            </TabPane>
          </Tabs>
        </div>
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
