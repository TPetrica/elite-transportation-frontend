import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Switch,
  TimePicker,
  Form,
  message,
  Popconfirm,
  Divider,
  Alert,
  Space,
  Typography,
  Tooltip,
} from 'antd'
import {
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { Plus, Trash2, Clock, Calendar, CalendarClock, Info } from 'lucide-react'
import moment from 'moment'
import dayjs from 'dayjs'
import ApiService from '@/services/api.service'

const { Title, Text } = Typography

const SchedulePage = () => {
  const [form] = Form.useForm()
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const daysOfWeek = [
    { name: 'Sunday', value: 0 },
    { name: 'Monday', value: 1 },
    { name: 'Tuesday', value: 2 },
    { name: 'Wednesday', value: 3 },
    { name: 'Thursday', value: 4 },
    { name: 'Friday', value: 5 },
    { name: 'Saturday', value: 6 },
  ]

  const fetchSchedule = async () => {
    setLoading(true)
    try {
      const response = await ApiService.get('/availability/schedule')

      // If no schedule exists, initialize with default values
      if (!response.data || response.data.length === 0) {
        const defaultSchedule = daysOfWeek.map(day => ({
          dayOfWeek: day.value,
          isEnabled: true,
          timeRanges: [{ start: '09:00', end: '17:00' }],
        }))
        setSchedule(defaultSchedule)
      } else {
        // Sort by day of week
        const sortedSchedule = [...response.data].sort((a, b) => a.dayOfWeek - b.dayOfWeek)
        setSchedule(sortedSchedule)
      }
    } catch (error) {
      console.error('Error fetching schedule:', error)
      message.error('Failed to fetch schedule')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedule()
  }, [])

  const handleSubmit = async values => {
    setSubmitting(true)
    try {
      const { days } = values
      const updatedSchedule = days.map((day, index) => {
        return {
          dayOfWeek: index,
          isEnabled: day.isEnabled,
          timeRanges: day.timeRanges.map(range => ({
            start: range.start.format('HH:mm'),
            end: range.end.format('HH:mm'),
          })),
        }
      })

      // Update each day individually
      await Promise.all(
        updatedSchedule.map(daySchedule => ApiService.put('/availability/schedule', daySchedule))
      )

      message.success('Schedule updated successfully')
      fetchSchedule()
    } catch (error) {
      console.error('Error updating schedule:', error)
      message.error('Failed to update schedule')
    } finally {
      setSubmitting(false)
    }
  }

  const validateTimeRanges = (_, timeRanges) => {
    for (let range of timeRanges) {
      // Skip empty entries
      if (!range.start || !range.end) continue

      // Check end time is after start time
      if (range.end && range.start && range.end.isBefore(range.start)) {
        return Promise.reject(new Error('End time must be after start time'))
      }
    }
    return Promise.resolve()
  }

  const formatScheduleForForm = () => {
    if (!schedule.length) return { days: [] }

    const days = daysOfWeek.map(day => {
      const daySchedule = schedule.find(s => s.dayOfWeek === day.value) || {
        isEnabled: false,
        timeRanges: [{ start: '09:00', end: '17:00' }],
      }

      return {
        isEnabled: daySchedule.isEnabled,
        timeRanges: daySchedule.timeRanges.map(range => ({
          start: dayjs(range.start, 'HH:mm'),
          end: dayjs(range.end, 'HH:mm'),
        })),
      }
    })

    return { days }
  }

  const renderTimeRangeFields = (day, dayIndex, field) => {
    return (
      <div>
        <Form.List name={[dayIndex, 'timeRanges']} rules={[{ validator: validateTimeRanges }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} align="baseline" className="tw-w-full tw-mb-2">
                  <Form.Item
                    {...field}
                    name={[field.name, 'start']}
                    rules={[{ required: true, message: 'Start time is required' }]}
                    className="tw-mb-0"
                  >
                    <TimePicker
                      format="HH:mm"
                      minuteStep={15}
                      placeholder="Start Time"
                      disabled={!form.getFieldValue(['days', dayIndex, 'isEnabled'])}
                    />
                  </Form.Item>
                  <span className="tw-mx-2">to</span>
                  <Form.Item
                    {...field}
                    name={[field.name, 'end']}
                    rules={[{ required: true, message: 'End time is required' }]}
                    className="tw-mb-0"
                  >
                    <TimePicker
                      format="HH:mm"
                      minuteStep={15}
                      placeholder="End Time"
                      disabled={!form.getFieldValue(['days', dayIndex, 'isEnabled'])}
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="text"
                      icon={<Trash2 size={16} />}
                      onClick={() => remove(field.name)}
                      disabled={!form.getFieldValue(['days', dayIndex, 'isEnabled'])}
                      className="tw-text-red-500 hover:tw-text-red-700"
                    />
                  )}
                </Space>
              ))}
              <Form.Item className="tw-mb-0">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  disabled={!form.getFieldValue(['days', dayIndex, 'isEnabled'])}
                  className="tw-mt-2"
                >
                  Add Time Range
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>
    )
  }

  // Check if form data is ready
  useEffect(() => {
    if (schedule.length) {
      form.setFieldsValue(formatScheduleForForm())
    }
  }, [schedule])

  return (
    <div className="tw-space-y-6">
      <div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">Availability Schedule</h1>
        <p className="tw-text-sm tw-text-gray-500">
          Configure your operating hours for each day of the week
        </p>
      </div>

      <Alert
        message="Schedule Information"
        description={
          <span>
            Set your available hours for each day of the week. You can add multiple time ranges per
            day (e.g., morning and evening shifts). Bookings will only be allowed during these
            hours.
          </span>
        }
        type="info"
        showIcon
        icon={<Info size={16} />}
        className="tw-mb-4"
      />

      <Card className="tw-shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formatScheduleForForm()}
        >
          <div className="tw-mb-4">
            <Form.List name="days">
              {fields => (
                <div className="tw-space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      className="tw-border tw-border-gray-200 tw-rounded-md tw-p-4"
                    >
                      <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                        <Title level={5} className="tw-m-0">
                          {daysOfWeek[index].name}
                        </Title>
                        <Form.Item
                          {...field}
                          name={[field.name, 'isEnabled']}
                          valuePropName="checked"
                          className="tw-mb-0"
                        >
                          <Switch checkedChildren="Open" unCheckedChildren="Closed" />
                        </Form.Item>
                      </div>

                      <Form.Item
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues.days?.[index]?.isEnabled !==
                          currentValues.days?.[index]?.isEnabled
                        }
                        noStyle
                      >
                        {() => (
                          <div>{renderTimeRangeFields(daysOfWeek[index], field.name, field)}</div>
                        )}
                      </Form.Item>
                    </div>
                  ))}
                </div>
              )}
            </Form.List>
          </div>

          <Divider />

          <div className="tw-flex tw-justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              icon={<CalendarClock size={16} className="tw-mr-1" />}
            >
              Save Schedule
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default SchedulePage
