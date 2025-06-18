import React, { useState, useEffect } from 'react'
import {
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Typography,
  Tabs,
  Button,
  Card,
  Tag,
  Alert,
  DatePicker,
  Divider,
  Space,
  Tooltip,
} from 'antd'
import { InfoCircleOutlined, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons'
import RichTextEditor from '@/components/blog/RichTextEditor'
import {
  Save,
  FileText,
  Tag as TagIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  ArrowRight,
  Settings,
  Calendar,
} from 'lucide-react'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs

const BlogFormModal = ({ visible, onCancel, onFinish, editingId, editingBlog, isLoading }) => {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState('basic')
  const [tags, setTags] = useState([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = React.useRef(null)

  // Reset form and state when modal opens/closes
  useEffect(() => {
    if (visible) {
      setActiveTab('basic')

      if (editingBlog) {
        const formData = {
          ...editingBlog,
          publishedAt: editingBlog.publishedAt ? dayjs(editingBlog.publishedAt) : null,
        }
        form.setFieldsValue(formData)
        setTags(editingBlog.tags || [])
      } else {
        form.resetFields()
        setTags([])
      }
    }
  }, [visible, editingBlog, form])

  // Focus input when tag input becomes visible
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  // Handle tag input
  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      const newTags = [...tags, inputValue]
      setTags(newTags)
      form.setFieldsValue({ tags: newTags })
    }
    setInputVisible(false)
    setInputValue('')
  }

  const handleTagClose = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag)
    setTags(newTags)
    form.setFieldsValue({ tags: newTags })
  }

  // Generate slug from title
  const generateSlug = title => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Remove consecutive hyphens
      .trim()
  }

  // Auto-generate slug when title changes (only if not in edit mode)
  const handleTitleChange = e => {
    if (!editingId) {
      const slug = generateSlug(e.target.value)
      form.setFieldsValue({ slug })
    }
  }

  // Handle form submission
  const handleSubmit = values => {
    // Convert dayjs to ISO string
    const formData = {
      ...values,
      tags,
      publishedAt: values.publishedAt ? values.publishedAt.toISOString() : null,
    }

    onFinish(formData)
  }

  // Function to handle form submission by moving through the tabs
  const handleNext = () => {
    form
      .validateFields(['title', 'slug', 'content', 'excerpt', 'category'])
      .then(() => {
        setActiveTab(activeTab === 'basic' ? 'meta' : 'publishing')
      })
      .catch(error => {
        console.log('Validation failed:', error)
      })
  }

  // Blog categories
  const categories = [
    { value: 'Travel', label: 'Travel' },
    { value: 'Service', label: 'Service' },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Park City', label: 'Park City' },
    { value: 'Salt Lake City', label: 'Salt Lake City' },
    { value: 'Winter Travel', label: 'Winter Travel' },
    { value: 'Tips', label: 'Tips' },
  ]

  // Get category color
  const getCategoryColor = category => {
    const colorMap = {
      Travel: 'blue',
      Service: 'green',
      Transportation: 'purple',
      'Park City': 'orange',
      'Salt Lake City': 'red',
      'Winter Travel': 'cyan',
      Tips: 'magenta',
    }
    return colorMap[category] || 'default'
  }

  // Modal footer buttons based on active tab
  const modalFooter =
    activeTab === 'publishing'
      ? [
          <Button key="back" onClick={() => setActiveTab('meta')}>
            Back
          </Button>,
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
            loading={isLoading}
            icon={<Save size={16} className="tw-mr-2" />}
          >
            {editingId ? 'Update Blog Post' : 'Create Blog Post'}
          </Button>,
        ]
      : [
          activeTab !== 'basic' && (
            <Button
              key="back"
              onClick={() => setActiveTab(activeTab === 'meta' ? 'basic' : 'meta')}
            >
              Back
            </Button>
          ),
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

  return (
    <Modal
      open={visible}
      title={
        <div className="tw-flex tw-items-center">
          <FileText size={18} className="tw-mr-2" />
          <span>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</span>
        </div>
      }
      footer={modalFooter}
      onCancel={onCancel}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          isPublished: false,
          tags: [],
        }}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane
            tab={
              <span className="tw-flex tw-items-center">
                <FileText size={16} className="tw-mr-2" />
                Content
              </span>
            }
            key="basic"
          >
            <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
              <Title level={5} className="tw-mb-1">
                Blog Content
              </Title>
              <Text type="secondary">Add the main content for your blog post.</Text>
            </div>

            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input
                placeholder="e.g. How to Get from SLC Airport to Park City"
                onChange={handleTitleChange}
              />
            </Form.Item>

            <Form.Item
              name="slug"
              label={
                <span className="tw-flex tw-items-center">
                  URL Slug
                  <Tooltip title="This will be used in the blog post URL. Use only lowercase letters, numbers, and hyphens.">
                    <QuestionCircleOutlined className="tw-ml-2" />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: 'Please enter a slug' },
                {
                  pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
                  message: 'Use only lowercase letters, numbers, and hyphens',
                },
              ]}
              extra={
                <div className="tw-mt-1">
                  <Text type="secondary">
                    The URL will be: https://yoursite.com/blog/
                    <span className="tw-font-mono">
                      {form.getFieldValue('slug') || 'example-slug'}
                    </span>
                  </Text>
                </div>
              }
            >
              <Input
                placeholder="e.g. slc-airport-to-park-city-transportation"
                addonBefore={<LinkIcon size={14} />}
                disabled={!!editingId} // Disable if editing
              />
            </Form.Item>

            {editingId && (
              <Alert
                message="Slug is read-only"
                description="To maintain SEO and avoid broken links, you cannot change the slug after creation."
                type="info"
                showIcon
                className="tw-mb-4"
              />
            )}

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select
                placeholder="Select a category"
                options={categories}
                showSearch
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              />
            </Form.Item>

            <Form.Item
              name="excerpt"
              label="Excerpt"
              rules={[{ required: true, message: 'Please enter an excerpt' }]}
              extra="A brief summary of the post that appears in blog listings and search results."
            >
              <TextArea
                placeholder="Enter a brief summary of the blog post..."
                rows={2}
                showCount
                maxLength={300}
              />
            </Form.Item>

            <Form.Item
              name="content"
              label="Content"
              rules={[{ required: true, message: 'Please enter the content' }]}
              extra="Use the editor to format your content with headings, lists, links, and more."
            >
              <RichTextEditor placeholder="Write your blog post content here..." />
            </Form.Item>
          </TabPane>

          <TabPane
            tab={
              <span className="tw-flex tw-items-center">
                <Settings size={16} className="tw-mr-2" />
                SEO & Media
              </span>
            }
            key="meta"
          >
            <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
              <Title level={5} className="tw-mb-1">
                SEO Settings
              </Title>
              <Text type="secondary">Optimize your blog post for search engines.</Text>
            </div>

            <Form.Item
              name="metaTitle"
              label={
                <span className="tw-flex tw-items-center">
                  Meta Title
                  <Tooltip title="The title that appears in search engine results. Limited to 60 characters.">
                    <QuestionCircleOutlined className="tw-ml-2" />
                  </Tooltip>
                </span>
              }
              extra="If left blank, the post title will be used."
            >
              <Input
                placeholder="e.g. SLC Airport to Park City: 5 Best Transportation Options (2025)"
                showCount
                maxLength={60}
              />
            </Form.Item>

            <Form.Item
              name="metaDescription"
              label={
                <span className="tw-flex tw-items-center">
                  Meta Description
                  <Tooltip title="The description that appears in search engine results. Limited to 160 characters.">
                    <QuestionCircleOutlined className="tw-ml-2" />
                  </Tooltip>
                </span>
              }
              extra="If left blank, the post excerpt will be used."
            >
              <TextArea
                placeholder="Enter a compelling meta description for search results..."
                rows={2}
                showCount
                maxLength={160}
              />
            </Form.Item>

            <Form.Item
              name="featuredImage"
              label={
                <span className="tw-flex tw-items-center">
                  Featured Image URL
                  <Tooltip title="The main image for the blog post. Should be at least 1200x630px for best SEO results.">
                    <QuestionCircleOutlined className="tw-ml-2" />
                  </Tooltip>
                </span>
              }
              extra="URL path to the image. Upload your images to the /public/assets/imgs/page/blog/ folder or use a full URL."
              initialValue="/assets/imgs/page/blog/default.jpg"
            >
              <Input
                placeholder="/assets/imgs/page/blog/slc-to-park-city.jpg"
                addonBefore={<ImageIcon size={14} />}
              />
            </Form.Item>

            <Divider orientation="left">
              <TagIcon size={14} className="tw-mr-2" />
              Tags
            </Divider>

            <Card className="tw-mb-4">
              <div className="tw-mb-2">
                <Text type="secondary">Tags help users find related content.</Text>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-1 tw-mb-2">
                {tags.map(tag => (
                  <Tag key={tag} closable onClose={() => handleTagClose(tag)} className="tw-mb-1">
                    {tag}
                  </Tag>
                ))}
                {inputVisible ? (
                  <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    className="tw-w-24"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                  />
                ) : (
                  <Tag className="tw-mb-1 tw-cursor-pointer" onClick={() => setInputVisible(true)}>
                    <PlusOutlined /> New Tag
                  </Tag>
                )}
              </div>
              <Text type="secondary" className="tw-text-xs">
                Examples: Airport Transfers, SLC Airport, Park City, Transportation, Winter Travel
              </Text>

              {/* Hidden form field to store tags */}
              <Form.Item name="tags" hidden>
                <Input />
              </Form.Item>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span className="tw-flex tw-items-center">
                <Calendar size={16} className="tw-mr-2" />
                Publishing
              </span>
            }
            key="publishing"
          >
            <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
              <Title level={5} className="tw-mb-1">
                Publishing Settings
              </Title>
              <Text type="secondary">Configure publication status and date.</Text>
            </div>

            <Card className="tw-mb-4">
              <Form.Item name="isPublished" label="Publication Status" valuePropName="checked">
                <Switch
                  checkedChildren="Published"
                  unCheckedChildren="Draft"
                  className="tw-bg-gray-300"
                />
              </Form.Item>

              <Form.Item name="publishedAt" label="Publication Date" dependencies={['isPublished']}>
                <DatePicker
                  format="YYYY-MM-DD HH:mm"
                  showTime
                  placeholder="Select date and time"
                  disabled={!form.getFieldValue('isPublished')}
                  className="tw-w-full"
                />
              </Form.Item>

              <Alert
                message="Publication Notes"
                description={
                  <ul className="tw-list-disc tw-ml-4 tw-mt-2">
                    <li>
                      When you publish a post, it will be visible on your website's blog section.
                    </li>
                    <li>
                      If you select a future publication date, the post will be published
                      automatically at that time.
                    </li>
                    <li>
                      You can unpublish a post at any time by toggling the Publication Status
                      switch.
                    </li>
                  </ul>
                }
                type="info"
                showIcon
              />
            </Card>

            <div className="tw-bg-blue-50 tw-p-4 tw-rounded-lg tw-border tw-border-blue-100">
              <Space className="tw-items-start">
                <InfoCircleOutlined className="tw-text-blue-500 tw-mt-1" />
                <div>
                  <Text strong>Ready to publish?</Text>
                  <div className="tw-text-sm tw-mt-1">
                    {form.getFieldValue('isPublished')
                      ? 'Your blog post will be published and visible to all visitors.'
                      : "Your blog post will be saved as a draft and won't be visible to visitors."}
                  </div>
                </div>
              </Space>
            </div>
          </TabPane>
        </Tabs>
      </Form>
    </Modal>
  )
}

export default BlogFormModal
