import React, { useState, useEffect } from 'react'
import { Calendar, Badge, Modal, Button, Form, Input, TimePicker, Switch, message, Select, Card, Alert } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import ApiService from '@/services/api.service'

const { Option } = Select
const { TextArea } = Input

const CalendarView = () => {
  const [dateExceptions, setDateExceptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchDateExceptions()
  }, [])

  const fetchDateExceptions = async () => {
    setLoading(true)
    try {
      const today = moment().format('YYYY-MM-DD')
      const oneYearLater = moment().add(1, 'year').format('YYYY-MM-DD')
      
      const response = await ApiService.get(
        `/availability/exceptions?startDate=${today}&endDate=${oneYearLater}`
      )
      
      if (response.data && response.data.results) {
        setDateExceptions(response.data.results)
      }
    } catch (error) {
      console.error('Error fetching date exceptions:', error)
      message.error('Failed to fetch calendar data')
    } finally {
      setLoading(false)
    }
  }

  const getDateData = (value) => {
    if (!value || !value.format) return null
    const dateStr = value.format('YYYY-MM-DD')
    return dateExceptions.find(exception => 
      moment(exception.date).format('YYYY-MM-DD') === dateStr
    )
  }

  const dateCellRender = (value) => {
    if (!value || !value.format) return null
    const dateData = getDateData(value)
    if (!dateData) return null

    const getStatusBadge = () => {
      if (!dateData.isEnabled) {
        return <Badge status="error" text="Closed" />
      }
      if (dateData.type === 'custom-hours') {
        return <Badge status="warning" text="Custom Hours" />
      }
      return <Badge status="success" text="Special" />
    }

    return (
      <div className="tw-text-xs">
        {getStatusBadge()}
      </div>
    )
  }

  const onSelectDate = (value) => {
    if (!value || !value.format) return
    setSelectedDate(value)
    const existingException = getDateData(value)
    
    if (existingException) {
      // Edit existing exception
      const formData = {
        date: moment(existingException.date),
        isEnabled: existingException.isEnabled,
        type: existingException.type,
        timeRanges: existingException.timeRanges?.map(range => ({
          start: moment(range.start, 'HH:mm'),
          end: moment(range.end, 'HH:mm'),
        })) || [],
        description: existingException.description || '',
      }
      form.setFieldsValue(formData)
    } else {
      // Create new exception
      form.setFieldsValue({
        date: value,
        isEnabled: false,
        type: 'closed',
        timeRanges: [],
        description: '',
      })
    }
    
    setModalVisible(true)
  }

  const handleQuickBlock = async (date) => {
    if (!date || !date.format) return
    try {
      const dateStr = date.format('YYYY-MM-DD')
      const existingException = getDateData(date)

      if (existingException) {
        // Delete existing exception
        await ApiService.delete(`/availability/exceptions/${existingException._id}`)
        message.success('Date exception removed')
      } else {
        // Create new blocked date
        await ApiService.post('/availability/exceptions', {
          date: dateStr,
          isEnabled: false,
          type: 'closed',
          description: 'Blocked via calendar',
        })
        message.success('Date blocked successfully')
      }
      
      fetchDateExceptions()
    } catch (error) {
      console.error('Error toggling date block:', error)
      message.error('Failed to update date')
    }
  }

  const handleSubmit = async (values) => {
    if (!selectedDate || !selectedDate.format) return
    try {
      const existingException = getDateData(selectedDate)
      const dateStr = selectedDate.format('YYYY-MM-DD')
      
      const exceptionData = {
        date: dateStr,
        isEnabled: values.isEnabled,
        type: values.type,
        timeRanges: values.timeRanges?.map(range => ({
          start: range.start.format('HH:mm'),
          end: range.end.format('HH:mm'),
        })) || [],
        description: values.description || '',
      }

      if (existingException) {
        await ApiService.patch(`/availability/exceptions/${existingException._id}`, exceptionData)
        message.success('Date exception updated')
      } else {
        await ApiService.post('/availability/exceptions', exceptionData)
        message.success('Date exception created')
      }

      setModalVisible(false)
      form.resetFields()
      fetchDateExceptions()
    } catch (error) {
      console.error('Error saving date exception:', error)
      message.error('Failed to save date exception')
    }
  }

  const handleDelete = async () => {
    if (!selectedDate || !selectedDate.format) return
    try {
      const existingException = getDateData(selectedDate)
      if (existingException) {
        await ApiService.delete(`/availability/exceptions/${existingException._id}`)
        message.success('Date exception deleted')
        setModalVisible(false)
        fetchDateExceptions()
      }
    } catch (error) {
      console.error('Error deleting date exception:', error)
      message.error('Failed to delete date exception')
    }
  }

  return (
    <div>
      <Alert
        message="Calendar View"
        description="Click on any date to quickly block it or set custom hours. Red badges indicate closed dates, yellow badges show custom hours."
        type="info"
        showIcon
        className="tw-mb-4"
      />
      
      <Card>
        <Calendar 
          dateCellRender={dateCellRender}
          onSelect={onSelectDate}
          loading={loading}
        />
      </Card>

      <Modal
        title={`Manage Date: ${selectedDate?.format('MMMM DD, YYYY')}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <div className="tw-mb-4 tw-flex tw-gap-2">
          <Button 
            danger
            onClick={() => handleQuickBlock(selectedDate)}
            className="tw-flex-1"
          >
            {getDateData(selectedDate) ? 'Remove Exception' : 'Block This Date'}
          </Button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="type"
            label="Exception Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="closed">Closed (No bookings)</Option>
              <Option value="custom-hours">Custom Hours</Option>
            </Select>
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.type !== currentValues.type
            }
            noStyle
          >
            {({ getFieldValue }) => {
              const type = getFieldValue('type')
              return type === 'custom-hours' ? (
                <Form.Item
                  name="isEnabled"
                  valuePropName="checked"
                  label="Available for Booking"
                >
                  <Switch />
                </Form.Item>
              ) : null
            }}
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.type !== currentValues.type
            }
            noStyle
          >
            {({ getFieldValue }) => {
              const type = getFieldValue('type')
              return type === 'custom-hours' ? (
                <Form.List name="timeRanges">
                  {(fields, { add, remove }) => (
                    <div>
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                        <label className="tw-font-medium">Custom Time Ranges</label>
                        <Button
                          type="dashed"
                          onClick={() => add({ start: moment('09:00', 'HH:mm'), end: moment('17:00', 'HH:mm') })}
                          icon={<PlusOutlined />}
                        >
                          Add Time Range
                        </Button>
                      </div>
                      {fields.map((field) => (
                        <div key={field.key} className="tw-flex tw-gap-2 tw-mb-2 tw-items-center">
                          <Form.Item
                            {...field}
                            name={[field.name, 'start']}
                            className="tw-mb-0 tw-flex-1"
                          >
                            <TimePicker format="HH:mm" placeholder="Start time" />
                          </Form.Item>
                          <span>to</span>
                          <Form.Item
                            {...field}
                            name={[field.name, 'end']}
                            className="tw-mb-0 tw-flex-1"
                          >
                            <TimePicker format="HH:mm" placeholder="End time" />
                          </Form.Item>
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Form.List>
              ) : null
            }}
          </Form.Item>

          <Form.Item
            name="description"
            label="Description (Optional)"
          >
            <TextArea rows={3} placeholder="Add a note about this date exception" />
          </Form.Item>

          <div className="tw-flex tw-justify-between tw-pt-4">
            <div>
              {getDateData(selectedDate) && (
                <Button danger onClick={handleDelete}>
                  Delete Exception
                </Button>
              )}
            </div>
            <div className="tw-flex tw-gap-2">
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Exception
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default CalendarView