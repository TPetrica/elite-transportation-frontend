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
  Tabs,
  Modal,
  Input,
  Badge,
  Select,
  Empty,
  Tag,
  Radio,
} from 'antd'
import {
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import {
  Plus,
  Trash2,
  Clock,
  Calendar,
  CalendarClock,
  Info,
  AlertTriangle,
  Ban,
  Edit,
  Settings,
  Clock4,
  Calendar as CalendarIcon,
} from 'lucide-react'
import moment from 'moment'
import dayjs from 'dayjs'
import ApiService from '@/services/api.service'
import DatePicker from '@/components/dashboard/DatePicker'

const { Title, Text } = Typography
const { TabPane } = Tabs
const { Option } = Select
const { confirm } = Modal
const { TextArea } = Input

const SchedulePage = () => {
  const [form] = Form.useForm()
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)
  const [exceptionLoading, setExceptionLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [dateExceptions, setDateExceptions] = useState([])
  const [exceptionModalVisible, setExceptionModalVisible] = useState(false)
  const [editingException, setEditingException] = useState(null)
  const [exceptionForm] = Form.useForm()
  const [activeTab, setActiveTab] = useState('1')

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

  const fetchDateExceptions = async () => {
    setExceptionLoading(true)
    try {
      const today = moment().format('YYYY-MM-DD')
      const oneYearLater = moment().add(1, 'year').format('YYYY-MM-DD')

      const response = await ApiService.get(
        `/availability/exceptions?startDate=${today}&endDate=${oneYearLater}`
      )

      if (response.data && response.data.results) {
        setDateExceptions(response.data.results)
      } else {
        setDateExceptions([])
      }
    } catch (error) {
      console.error('Error fetching date exceptions:', error)
      message.error('Failed to fetch date exceptions')
    } finally {
      setExceptionLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedule()
    fetchDateExceptions()
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

  const handleCreateException = () => {
    exceptionForm.resetFields()
    exceptionForm.setFieldsValue({
      isEnabled: false,
      type: 'closed',
      date: moment(),
    })
    setEditingException(null)
    setExceptionModalVisible(true)
  }

  const handleEditException = record => {
    setEditingException(record)

    // Format date and time ranges for the form
    const formattedTimeRanges =
      record.timeRanges?.map(range => ({
        start: dayjs(range.start, 'HH:mm'),
        end: dayjs(range.end, 'HH:mm'),
      })) || []

    exceptionForm.setFieldsValue({
      date: moment(record.date),
      isEnabled: record.isEnabled,
      reason: record.reason || '',
      type: record.type || 'closed',
      timeRanges: formattedTimeRanges.length
        ? formattedTimeRanges
        : [
            {
              start: dayjs('09:00', 'HH:mm'),
              end: dayjs('17:00', 'HH:mm'),
            },
          ],
    })

    setExceptionModalVisible(true)
  }

  const handleDeleteException = exceptionId => {
    confirm({
      title: 'Are you sure you want to delete this date exception?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await ApiService.delete(`/availability/exceptions/${exceptionId}`)
          message.success('Date exception deleted successfully')
          fetchDateExceptions()
        } catch (error) {
          console.error('Error deleting date exception:', error)
          message.error('Failed to delete date exception')
        }
      },
    })
  }

  const handleExceptionSubmit = async values => {
    try {
      // Format date and time ranges
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        timeRanges:
          values.type === 'custom-hours'
            ? values.timeRanges.map(range => ({
                start: range.start.format('HH:mm'),
                end: range.end.format('HH:mm'),
              }))
            : [],
      }

      if (editingException) {
        await ApiService.patch(`/availability/exceptions/${editingException.id}`, formattedValues)
        message.success('Date exception updated successfully')
      } else {
        await ApiService.post('/availability/exceptions', formattedValues)
        message.success('Date exception created successfully')
      }

      setExceptionModalVisible(false)
      fetchDateExceptions()
    } catch (error) {
      console.error('Error saving date exception:', error)
      message.error('Failed to save date exception')
    }
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
                      changeOnBlur
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
                      changeOnBlur
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

  // Date exception columns for the table
  const exceptionColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: date => moment(date).format('MMMM D, YYYY'),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: 'Status',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (isEnabled, record) => (
        <Tag color={isEnabled ? 'success' : 'error'}>
          {isEnabled ? (
            <span>
              <Clock4 size={14} className="tw-mr-1" />
              {record.type === 'custom-hours' ? 'Custom Hours' : 'Open'}
            </span>
          ) : (
            <span>
              <Ban size={14} className="tw-mr-1" />
              Closed
            </span>
          )}
        </Tag>
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: reason => reason || <Text type="secondary">-</Text>,
    },
    {
      title: 'Hours',
      key: 'hours',
      render: (_, record) => {
        if (!record.isEnabled) {
          return <Text type="secondary">Closed</Text>
        }

        if (record.type === 'custom-hours' && record.timeRanges?.length) {
          return (
            <Space direction="vertical" size="small">
              {record.timeRanges.map((range, index) => (
                <Text key={index}>
                  {moment(range.start, 'HH:mm').format('h:mm A')} -{' '}
                  {moment(range.end, 'HH:mm').format('h:mm A')}
                </Text>
              ))}
            </Space>
          )
        }

        return <Text type="secondary">Default hours</Text>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEditException(record)}
            className="tw-text-blue-600 hover:tw-text-blue-700"
          />
          <Button
            type="text"
            icon={<Trash2 size={16} />}
            onClick={() => handleDeleteException(record.id)}
            className="tw-text-red-600 hover:tw-text-red-700"
          />
        </Space>
      ),
    },
  ]

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
          Configure your regular operating hours and special date exceptions
        </p>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span className="tw-flex tw-items-center">
              <Clock size={16} className="tw-mr-2" />
              Regular Weekly Schedule
            </span>
          }
          key="1"
        >
          <Alert
            message="Weekly Schedule Information"
            description={
              <span>
                Set your available hours for each day of the week. You can add multiple time ranges
                per day (e.g., morning and evening shifts). Bookings will only be allowed during
                these hours.
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
                              <div>
                                {renderTimeRangeFields(daysOfWeek[index], field.name, field)}
                              </div>
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
        </TabPane>

        <TabPane
          tab={
            <span className="tw-flex tw-items-center">
              <CalendarIcon size={16} className="tw-mr-2" />
              Date Exceptions
            </span>
          }
          key="2"
        >
          <Alert
            message="Date Exceptions Information"
            description={
              <span>
                Configure special dates like holidays, events, or maintenance days. You can mark
                dates as closed or set custom operating hours that override the regular weekly
                schedule.
              </span>
            }
            type="info"
            showIcon
            icon={<Info size={16} />}
            className="tw-mb-4"
          />

          <Card className="tw-shadow-sm">
            <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
              <Title level={5} className="tw-m-0">
                Date Exceptions
              </Title>
              <Button
                type="primary"
                icon={<Plus size={16} className="tw-mr-1" />}
                onClick={handleCreateException}
              >
                Add Date Exception
              </Button>
            </div>

            <Table
              columns={exceptionColumns}
              dataSource={dateExceptions}
              rowKey="_id"
              loading={exceptionLoading}
              pagination={{ pageSize: 10 }}
              locale={{
                emptyText: <Empty description="No date exceptions found" />,
              }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Date Exception Modal */}
      <Modal
        title={
          <div className="tw-flex tw-items-center">
            <CalendarIcon size={18} className="tw-mr-2" />
            <span>{editingException ? 'Edit Date Exception' : 'Add Date Exception'}</span>
          </div>
        }
        open={exceptionModalVisible}
        onCancel={() => setExceptionModalVisible(false)}
        footer={null}
        destroyOnClose
        width={650}
      >
        <Form
          form={exceptionForm}
          layout="vertical"
          onFinish={handleExceptionSubmit}
          initialValues={{
            isEnabled: false,
            type: 'closed',
            date: moment(),
          }}
        >
          <div className="tw-bg-gray-50 tw-p-4 tw-rounded-lg tw-mb-4">
            <Text>
              Date exceptions allow you to override the regular weekly schedule for specific dates
              like holidays or special events.
            </Text>
          </div>

          <div className="tw-flex tw-gap-4">
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please select a date' }]}
              className="tw-flex-1"
            >
              <DatePicker
                className="tw-w-full"
                format="YYYY-MM-DD"
                disabledDate={current => {
                  // Can't select days before today
                  return current && current < moment().startOf('day')
                }}
              />
            </Form.Item>

            <Form.Item
              name="isEnabled"
              label="Status"
              valuePropName="checked"
              className="tw-flex-1"
            >
              <Switch
                checkedChildren={
                  <span>
                    <Clock4 size={12} className="tw-mr-1" />
                    Open
                  </span>
                }
                unCheckedChildren={
                  <span>
                    <Ban size={12} className="tw-mr-1" />
                    Closed
                  </span>
                }
              />
            </Form.Item>
          </div>

          <Form.Item
            name="reason"
            label="Reason (Optional)"
            tooltip="Provide a reason for this exception (e.g. Holiday, Special Event, etc.)"
          >
            <Input placeholder="e.g. Christmas Day, Maintenance, etc." />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.isEnabled !== currentValues.isEnabled
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('isEnabled') ? (
                <div>
                  <Form.Item name="type" label="Schedule Type">
                    <Radio.Group>
                      <Radio value="custom-hours">Custom Hours</Radio>
                      <Radio value="regular">Use Regular Schedule</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.type !== currentValues.type ||
                      prevValues.isEnabled !== currentValues.isEnabled
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue('type') === 'custom-hours' && getFieldValue('isEnabled') ? (
                        <div className="tw-border tw-border-gray-200 tw-rounded-md tw-p-4 tw-mb-4">
                          <Form.List name="timeRanges" rules={[{ validator: validateTimeRanges }]}>
                            {(fields, { add, remove }) => (
                              <>
                                <div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
                                  <Title level={5} className="tw-m-0">
                                    Custom Time Ranges
                                  </Title>
                                </div>

                                {fields.map(field => (
                                  <Space
                                    key={field.key}
                                    align="baseline"
                                    className="tw-w-full tw-mb-2"
                                  >
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'start']}
                                      rules={[
                                        { required: true, message: 'Start time is required' },
                                      ]}
                                      className="tw-mb-0"
                                    >
                                      <TimePicker
                                        format="HH:mm"
                                        minuteStep={15}
                                        placeholder="Start Time"
                                        changeOnBlur
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
                                        changeOnBlur
                                      />
                                    </Form.Item>
                                    {fields.length > 1 && (
                                      <Button
                                        type="text"
                                        icon={<Trash2 size={16} />}
                                        onClick={() => remove(field.name)}
                                        className="tw-text-red-500 hover:tw-text-red-700"
                                      />
                                    )}
                                  </Space>
                                ))}
                                <Form.Item className="tw-mb-0">
                                  <Button
                                    type="dashed"
                                    onClick={() =>
                                      add({
                                        start: dayjs('09:00', 'HH:mm'),
                                        end: dayjs('17:00', 'HH:mm'),
                                      })
                                    }
                                    icon={<PlusOutlined />}
                                    className="tw-mt-2"
                                  >
                                    Add Time Range
                                  </Button>
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                        </div>
                      ) : null
                    }
                  </Form.Item>
                </div>
              ) : null
            }
          </Form.Item>

          <Divider />

          <div className="tw-flex tw-justify-end tw-space-x-2">
            <Button onClick={() => setExceptionModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingException ? 'Update Exception' : 'Create Exception'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default SchedulePage
