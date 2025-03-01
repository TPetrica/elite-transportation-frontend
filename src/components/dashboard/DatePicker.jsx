import { DatePicker as AntDatePicker } from 'antd'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'
import React from 'react'

const DatePicker = React.forwardRef((props, ref) => {
  const CustomDatePicker = AntDatePicker.generatePicker(momentGenerateConfig)

  return <CustomDatePicker {...props} ref={ref} />
})

DatePicker.displayName = 'DatePicker'

// Re-export all the pickers from DatePicker
const { WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker, RangePicker } =
  AntDatePicker.generatePicker(momentGenerateConfig)

export { WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker, RangePicker }
export default DatePicker
