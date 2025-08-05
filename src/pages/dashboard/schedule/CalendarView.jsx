import React, { useState, useEffect } from 'react'
import { Calendar, Badge, Modal, Button, Form, Input, TimePicker, Switch, Select, Card, Alert } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useDateExceptions, useCreateDateException, useUpdateDateException, useDeleteDateException } from '@/hooks/useQueryHooks'

const { Option } = Select
const { TextArea } = Input

const CalendarView = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(moment())
  const [isChangingMonth, setIsChangingMonth] = useState(false)
  const [form] = Form.useForm()

  // Use the currently viewed month for date range
  const startDate = currentMonth.clone().startOf('month').format('YYYY-MM-DD')
  const endDate = currentMonth.clone().endOf('month').format('YYYY-MM-DD')

  // TanStack Query hooks
  const { data: dateExceptionsData, isLoading: loading } = useDateExceptions(startDate, endDate)
  const createDateExceptionMutation = useCreateDateException()
  const updateDateExceptionMutation = useUpdateDateException()
  const deleteExceptionMutation = useDeleteDateException()

  // Extract results from the query data
  const dateExceptions = dateExceptionsData?.results || []

  const handlePanelChange = (value, mode) => {
    if (mode === 'month') {
      setIsChangingMonth(true)
      const newMonth = moment(value)
      setCurrentMonth(newMonth)
      // Clear the flag after a short delay
      setTimeout(() => setIsChangingMonth(false), 100)
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
    
    // Always render a clickable area for all dates
    return (
      <div 
        className="tw-h-full tw-w-full tw-cursor-pointer" 
        onClick={(e) => {
          e.stopPropagation()
          onSelectDate(value)
        }}
      >
        {dateData && (
          <div className="tw-text-xs">
            {(() => {
              if (!dateData.isEnabled && dateData.type === 'closed') {
                return <Badge status="error" text="Closed" />
              }
              if (dateData.type === 'custom-hours') {
                return <Badge status="processing" text="Custom Hours" />
              }
              if (dateData.type === 'blocked-hours') {
                return <Badge status="warning" text="Blocked Hours" />
              }
              return <Badge status="success" text="Special" />
            })()}
          </div>
        )}
      </div>
    )
  }

  const onSelectDate = (value) => {
    if (!value || !value.format || isChangingMonth) return
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
      }
      form.setFieldsValue(formData)
    } else {
      // Create new exception
      form.setFieldsValue({
        date: value,
        isEnabled: false,
        type: 'closed',
        timeRanges: [],
      })
    }
    
    setModalVisible(true)
  }

  const handleQuickBlock = async (date) => {
    if (!date || !date.format) return
    
    const dateStr = date.format('YYYY-MM-DD')
    const existingException = getDateData(date)

    if (existingException) {
      // Delete existing exception
      deleteExceptionMutation.mutate(existingException.id)
    } else {
      // Create new blocked date
      createDateExceptionMutation.mutate({
        date: dateStr,
        isEnabled: false,
        type: 'closed',
      })
    }
  }

  const handleSubmit = async (values) => {
    if (!selectedDate || !selectedDate.format) return
    
    const existingException = getDateData(selectedDate)
    const dateStr = selectedDate.format('YYYY-MM-DD')
    
    const exceptionData = {
      date: dateStr,
      isEnabled: values.type === 'blocked-hours' ? true : values.isEnabled,
      type: values.type,
      timeRanges: values.timeRanges?.map(range => ({
        start: range.start.format('HH:mm'),
        end: range.end.format('HH:mm'),
      })) || [],
    }

    if (existingException) {
      updateDateExceptionMutation.mutate({
        exceptionId: existingException.id,
        data: exceptionData
      }, {
        onSuccess: () => {
          setModalVisible(false)
          form.resetFields()
        }
      })
    } else {
      createDateExceptionMutation.mutate(exceptionData, {
        onSuccess: () => {
          setModalVisible(false)
          form.resetFields()
        }
      })
    }
  }

  const handleDelete = async () => {
    if (!selectedDate || !selectedDate.format) return
    
    const existingException = getDateData(selectedDate)
    if (existingException) {
      deleteExceptionMutation.mutate(existingException.id, {
        onSuccess: () => {
          setModalVisible(false)
        }
      })
    }
  }

  return (
    <div>
      <Alert
        message="Calendar View"
        description="Click on any date to manage exceptions. Red badges indicate closed dates or blocked hours, yellow badges show custom available hours."
        type="info"
        showIcon
        className="tw-mb-4"
      />
      
      <Card>
        <Calendar 
          dateCellRender={dateCellRender}
          onPanelChange={handlePanelChange}
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
              <Option value="custom-hours">Custom Hours (Available)</Option>
              <Option value="blocked-hours">Block Specific Hours</Option>
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
              return (type === 'custom-hours' || type === 'blocked-hours') ? (
                <Form.List name="timeRanges">
                  {(fields, { add, remove }) => (
                    <div>
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                        <label className="tw-font-medium">
                          {type === 'custom-hours' ? 'Available Time Ranges' : 'Blocked Time Ranges'}
                        </label>
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