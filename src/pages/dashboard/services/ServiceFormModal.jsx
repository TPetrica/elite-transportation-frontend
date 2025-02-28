import React from 'react'
import { Modal, Form, Input, InputNumber, Select, Switch, Space, Button } from 'antd'

const { Option } = Select
const { TextArea } = Input

const ServiceFormModal = ({ visible, onCancel, form, onFinish, editingId, vehicles = [] }) => {
  return (
    <Modal
      title={editingId ? 'Edit Service' : 'Add Service'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="tw-mt-4"
        initialValues={{
          isActive: true,
        }}
      >
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
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
        </div>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[{ required: true, message: 'Please enter base price' }]}
          >
            <InputNumber
              min={0}
              precision={2}
              className="tw-w-full"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
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
        </div>

        <div className="tw-flex tw-items-center tw-mt-4">
          <Form.Item name="isActive" valuePropName="checked" className="tw-mb-0 tw-mr-2">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
          <span className="tw-text-gray-500">Service Status</span>
        </div>

        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-mt-6">
          <Form.Item name="imageUrl" label="Image URL">
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item name="order" label="Display Order">
            <InputNumber min={0} className="tw-w-full" />
          </Form.Item>
        </div>

        <Form.Item className="tw-mb-0 tw-text-right tw-mt-6">
          <Space>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingId ? 'Update' : 'Create'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ServiceFormModal
