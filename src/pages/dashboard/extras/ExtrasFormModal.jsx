import React, { useState } from 'react'
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Space,
  Divider,
  Tooltip,
  Card,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Save, X, Edit, Plus } from 'lucide-react'

const { Option } = Select
const { TextArea } = Input

const ExtrasFormModal = ({
  visible,
  onCancel,
  form,
  onFinish,
  editingId,
}) => {

  return (
    <Modal
      title={
        <div className="tw-flex tw-items-center">
          {editingId ? (
            <>
              <Edit size={20} className="tw-mr-2" />
              Edit Extra Service
            </>
          ) : (
            <>
              <Plus size={20} className="tw-mr-2" />
              Add Extra Service
            </>
          )}
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <Card className="tw-shadow-sm tw-mt-4">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isAvailable: true,
            maxQuantity: 10,
            price: 0,
            type: 'quantity',
            category: 'amenity',
          }}
        >
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the name' }]}
            >
              <Input placeholder="e.g. Child Seat, Bottled Water, etc." />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select>
                <Option value="childSeat">Child Seat</Option>
                <Option value="drink">Drink</Option>
                <Option value="service">Service</Option>
                <Option value="amenity">Amenity</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <TextArea rows={3} placeholder="Describe the extra service" />
          </Form.Item>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter a price' }]}
            >
              <InputNumber
                min={0}
                precision={2}
                style={{ width: '100%' }}
                prefix="$"
                placeholder="0.00"
              />
            </Form.Item>

            <Form.Item
              name="type"
              label={
                <span>
                  Type
                  <Tooltip title="Quantity: Users can select multiple. Selection: Users choose one option.">
                    <InfoCircleOutlined className="tw-ml-1" />
                  </Tooltip>
                </span>
              }
              rules={[{ required: true, message: 'Please select a type' }]}
            >
              <Select>
                <Option value="quantity">Quantity</Option>
                <Option value="selection">Selection</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              name="maxQuantity"
              label={
                <span>
                  Maximum Quantity
                  <Tooltip title="Maximum number of this item a customer can order">
                    <InfoCircleOutlined className="tw-ml-1" />
                  </Tooltip>
                </span>
              }
              rules={[{ required: true, message: 'Please enter maximum quantity' }]}
            >
              <InputNumber min={1} max={100} className="tw-w-full" />
            </Form.Item>

            <Form.Item
              name="isAvailable"
              valuePropName="checked"
              label="Available"
              className="tw-flex tw-flex-col"
            >
              <div className="tw-h-full tw-flex tw-items-center">
                <Switch />
                <span className="tw-ml-2">Make this extra available for booking</span>
              </div>
            </Form.Item>
          </div>

          <Divider />

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
            <Form.Item
              name="slug"
              label="Slug (Optional)"
              tooltip={{
                title: 'A unique identifier used in URLs',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input placeholder="e.g. child-seat-premium" />
            </Form.Item>

            <Form.Item
              name="sortOrder"
              label="Sort Order (Optional)"
              tooltip={{
                title: 'Display order (lower numbers appear first)',
                icon: <InfoCircleOutlined />,
              }}
            >
              <InputNumber min={0} className="tw-w-full" />
            </Form.Item>
          </div>


          <div className="tw-flex tw-justify-end tw-mt-6">
            <Space>
              <Button onClick={onCancel} icon={<X size={16} className="tw-mr-2" />}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<Save size={16} className="tw-mr-2" />}
              >
                {editingId ? 'Update Extra' : 'Create Extra'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </Modal>
  )
}

export default ExtrasFormModal

