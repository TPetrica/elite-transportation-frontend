import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'
import moment from 'moment'

// Extend dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)

// Salt Lake City timezone
export const SALT_LAKE_TIMEZONE = 'America/Denver'

// Get current time in Salt Lake City timezone
export const getSaltLakeTime = () => {
  return dayjs().tz(SALT_LAKE_TIMEZONE)
}

// Convert a date to Salt Lake City timezone
export const toSaltLakeTime = (date) => {
  if (!date) return null
  
  if (moment.isMoment(date)) {
    return dayjs(date.toDate()).tz(SALT_LAKE_TIMEZONE)
  }
  
  return dayjs(date).tz(SALT_LAKE_TIMEZONE)
}

// Format date for display in Salt Lake City timezone
export const formatSaltLakeDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return null
  
  const saltLakeDate = toSaltLakeTime(date)
  return saltLakeDate.format(format)
}

// Format time for display in Salt Lake City timezone
export const formatSaltLakeTime = (time, format = 'h:mm A') => {
  if (!time) return null
  
  // If time is just HH:mm format, parse it and format
  if (typeof time === 'string' && time.match(/^\d{2}:\d{2}$/)) {
    return dayjs(time, 'HH:mm').format(format)
  }
  
  const saltLakeTime = toSaltLakeTime(time)
  return saltLakeTime.format(format)
}

// Get start of day in Salt Lake City timezone
export const getSaltLakeStartOfDay = (date) => {
  return toSaltLakeTime(date).startOf('day')
}

// Get end of day in Salt Lake City timezone
export const getSaltLakeEndOfDay = (date) => {
  return toSaltLakeTime(date).endOf('day')
}

// Check if date is today in Salt Lake City timezone
export const isSaltLakeToday = (date) => {
  const saltLakeNow = getSaltLakeTime()
  const saltLakeDate = toSaltLakeTime(date)
  return saltLakeDate.isSame(saltLakeNow, 'day')
}

// Check if date is in the past in Salt Lake City timezone
export const isSaltLakePast = (date) => {
  const saltLakeNow = getSaltLakeTime()
  const saltLakeDate = toSaltLakeTime(date)
  return saltLakeDate.isBefore(saltLakeNow, 'day')
}

// Create a date object in Salt Lake City timezone
export const createSaltLakeDate = (year, month, day) => {
  return dayjs.tz({ year, month: month - 1, day }, SALT_LAKE_TIMEZONE)
}

// Parse date string in Salt Lake City timezone
export const parseSaltLakeDate = (dateString, format = 'YYYY-MM-DD') => {
  return dayjs.tz(dateString, format, SALT_LAKE_TIMEZONE)
}

// Convert moment date to dayjs with Salt Lake timezone
export const momentToSaltLake = (momentDate) => {
  if (!momentDate || !moment.isMoment(momentDate)) return null
  return dayjs(momentDate.toDate()).tz(SALT_LAKE_TIMEZONE)
}

// Convert dayjs date back to moment (for compatibility)
export const saltLakeToMoment = (dayjsDate) => {
  if (!dayjsDate) return null
  return moment(dayjsDate.toDate())
}