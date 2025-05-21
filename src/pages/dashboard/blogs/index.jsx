import {
  useBlogs,
  useCreateBlog,
  useDeleteBlog,
  useUpdateBlog
} from '@/hooks/useQueryHooks'
import { useQueryClient } from '@tanstack/react-query'
import {
  Badge,
  Button,
  Card,
  Empty,
  Modal,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography
} from 'antd'
import { formatDistanceToNow } from 'date-fns'
import { Edit, Eye, PlusCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BlogFormModal from './BlogFormModal'

const { Title, Text } = Typography

const BlogsPage = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingBlog, setEditingBlog] = useState(null)
  const queryClient = useQueryClient()

  // Query blogs using our custom hook
  const {
    data: blogsData,
    isLoading,
    isError,
    error,
  } = useBlogs()

  // Extract blogs from the response
  const blogs = blogsData?.results || []

  // Custom mutation hooks
  const createBlogMutation = useCreateBlog()
  const updateBlogMutation = useUpdateBlog()
  const deleteBlogMutation = useDeleteBlog()

  // These hooks already handle success messages and cache invalidation

  // Format the publication date
  const formatPublishDate = (dateString) => {
    if (!dateString) return 'Not published'
    
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  }

  // Handle edit blog
  const handleEdit = (blog) => {
    setEditingId(blog.id)
    setEditingBlog(blog)
    setModalVisible(true)
  }

  // Handle delete blog
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this blog post?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        deleteBlogMutation.mutate(id)
      },
    })
  }

  // Handle form submission
  const handleFormSubmit = (values) => {
    if (editingId) {
      updateBlogMutation.mutate({ 
        blogId: editingId, 
        data: values 
      }, {
        onSuccess: () => {
          setModalVisible(false)
          setEditingId(null)
          setEditingBlog(null)
        }
      })
    } else {
      createBlogMutation.mutate(values, {
        onSuccess: () => {
          setModalVisible(false)
        }
      })
    }
  }

  // Get the category color
  const getCategoryColor = (category) => {
    const colorMap = {
      'Travel': 'blue',
      'Service': 'green',
      'Transportation': 'purple',
      'Park City': 'orange',
      'Salt Lake City': 'red',
      'Winter Travel': 'cyan',
      'Tips': 'magenta',
    }
    return colorMap[category] || 'default'
  }

  // Table columns
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="tw-font-medium">{text}</div>
          <div className="tw-text-xs tw-text-gray-500 tw-truncate" style={{ maxWidth: '300px' }}>
            {record.excerpt}
          </div>
        </div>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug) => <div className="tw-text-xs tw-text-gray-500">{slug}</div>,
      responsive: ['lg'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color={getCategoryColor(category)}>{category}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished, record) => (
        <div>
          {isPublished ? (
            <Badge status="success" text="Published" />
          ) : (
            <Badge status="default" text="Draft" />
          )}
          {isPublished && record.publishedAt && (
            <div className="tw-text-xs tw-text-gray-500">
              {formatPublishDate(record.publishedAt)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View blog post">
            <Link to={`/blog/${record.slug}`} target="_blank">
              <Button
                type="text"
                icon={<Eye size={16} />}
                className="tw-text-blue-600 hover:tw-text-blue-700"
              />
            </Link>
          </Tooltip>
          <Tooltip title="Edit blog post">
            <Button
              type="text"
              icon={<Edit size={16} />}
              onClick={() => handleEdit(record)}
              className="tw-text-green-600 hover:tw-text-green-700"
            />
          </Tooltip>
          <Tooltip title="Delete blog post">
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

  if (isError) {
    return (
      <div className="tw-p-8">
        <Card>
          <div className="tw-text-center tw-py-8">
            <Title level={4} type="danger">Error Loading Blogs</Title>
            <Text type="secondary">
              {error?.response?.data?.message || 'Failed to load blog posts. Please try again.'}
            </Text>
            <div className="tw-mt-4">
              <Button onClick={() => queryClient.invalidateQueries(['blogs'])}>
                Retry
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-center tw-gap-4 md:tw-gap-0">
        <div>
          <h1 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-text-gray-900">Blog Posts</h1>
          <p className="tw-text-sm tw-text-gray-500">Manage your blog content</p>
        </div>
        <Button
          type="primary"
          icon={<PlusCircle size={16} className="tw-mr-2" />}
          onClick={() => {
            setEditingId(null)
            setEditingBlog(null)
            setModalVisible(true)
          }}
          className="tw-bg-blue-600 hover:tw-bg-blue-700"
        >
          New Blog Post
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <div className="tw-overflow-x-auto">
          <Table
            columns={columns}
            dataSource={blogs}
            rowKey={record => record.id || Math.random().toString(36).substr(2, 9)}
            loading={isLoading}
            pagination={{ pageSize: 10 }}
            locale={{
              emptyText: <Empty description="No blog posts found" />,
            }}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>

      <BlogFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setEditingId(null)
          setEditingBlog(null)
        }}
        onFinish={handleFormSubmit}
        editingId={editingId}
        editingBlog={editingBlog}
        isLoading={createBlogMutation.isLoading || updateBlogMutation.isLoading}
      />
    </div>
  )
}

export default BlogsPage
