import moment from 'moment'
import { useEffect, useRef, useState } from 'react'

const CustomTimePicker = ({ 
  value, 
  onChange, 
  availableTimeSlots = [], 
  disabled = false, 
  placeholder = "Select a time",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('AM')
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  // Get available times for the selected period (AM/PM)
  const getAvailableTimesForPeriod = (period) => {
    return availableTimeSlots.filter(slot => {
      const hour = parseInt(slot.time.split(':')[0])
      if (period === 'AM') {
        return hour < 12
      } else {
        return hour >= 12
      }
    })
  }

  // Format time for display in 12-hour format (e.g., "09:00" -> "9:00")
  const formatTimeDisplay = (time) => {
    return moment(time, 'HH:mm').format('h:mm')
  }

  // Format the selected value for the input
  const formatSelectedValue = () => {
    if (!value) return ''
    return moment(value, 'HH:mm').format('h:mm A')
  }

  // Handle time selection
  const handleTimeSelect = (timeSlot) => {
    onChange(timeSlot.time)
    setIsOpen(false)
  }

  // Handle period change (AM/PM)
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Set initial period based on available slots
  useEffect(() => {
    if (availableTimeSlots.length > 0) {
      const hasAM = availableTimeSlots.some(slot => parseInt(slot.time.split(':')[0]) < 12)
      const hasPM = availableTimeSlots.some(slot => parseInt(slot.time.split(':')[0]) >= 12)
      
      if (!hasAM && hasPM) {
        setSelectedPeriod('PM')
      } else {
        setSelectedPeriod('AM')
      }
    }
  }, [availableTimeSlots])

  const availableTimesForPeriod = getAvailableTimesForPeriod(selectedPeriod)

  return (
    <div className={`tw-relative tw-w-full ${className}`} ref={dropdownRef}>
      {/* Input Field */}
      <div
        ref={inputRef}
        className={`
          form-control tw-cursor-pointer tw-flex tw-items-center tw-justify-between
          ${disabled ? 'tw-opacity-60 tw-cursor-not-allowed' : ''}
        `}
        style={{
          width: '100%',
          height: '46px',
          padding: '8px 16px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          backgroundColor: disabled ? '#f9fafb' : '#ffffff',
          fontSize: '14px',
          transition: 'border-color 0.2s ease'
        }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.target.style.borderColor = '#9ca3af'
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.target.style.borderColor = '#d1d5db'
          }
        }}
      >
        <div className="tw-flex tw-items-center">
          <svg className="tw-w-4 tw-h-4 tw-text-gray-400 tw-mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`tw-text-sm ${value ? 'tw-text-gray-900' : 'tw-text-gray-500'}`}>
            {formatSelectedValue() || placeholder}
          </span>
        </div>
        <svg 
          className={`tw-w-4 tw-h-4 tw-text-gray-400 tw-transition-transform tw-duration-200 ${isOpen ? 'tw-rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="tw-absolute tw-top-full tw-right-0 tw-mt-1 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-shadow-xl tw-z-50 tw-overflow-hidden tw-flex tw-h-60 tw-w-30" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}>
          {/* Left Column - Time List with scroll */}
          <div className="tw-flex-1 tw-overflow-y-auto">
            {availableTimesForPeriod.length === 0 ? (
              <div className="tw-p-3 tw-text-xs tw-text-gray-500 tw-text-center">
                No available times for {selectedPeriod}
              </div>
            ) : (
              <div className="tw-p-2">
                {availableTimesForPeriod.map((slot, index) => {
                  const isSelected = value === slot.time
                  const timeDisplay = formatTimeDisplay(slot.time)
                  
                  return (
                    <div
                      key={index}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '500',
                        borderRadius: '4px',
                        marginBottom: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        color: isSelected ? '#374151' : '#6b7280',
                        backgroundColor: isSelected ? '#f3f4f6' : 'transparent'
                      }}
                      onClick={() => handleTimeSelect(slot)}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.target.style.backgroundColor = '#f9fafb'
                          e.target.style.color = '#374151'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.color = '#6b7280'
                        }
                      }}
                    >
                      {timeDisplay}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Column - AM/PM toggles (fixed) */}
          <div className="tw-w-16 tw-flex tw-flex-col tw-justify-start tw-p-2 tw-space-y-1">
            <div
              className={`
                tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-rounded tw-transition-colors tw-duration-200 tw-text-center
                ${selectedPeriod === 'AM' 
                  ? 'tw-bg-gray-500 tw-text-white' 
                  : 'tw-bg-gray-100 tw-text-gray-600 hover:tw-bg-gray-200'
                }
                ${getAvailableTimesForPeriod('AM').length === 0 
                  ? 'tw-opacity-50 tw-cursor-not-allowed' 
                  : 'tw-cursor-pointer'
                }
              `}
              onClick={() => getAvailableTimesForPeriod('AM').length > 0 && handlePeriodChange('AM')}
            >
              AM
            </div>
            <div
              className={`
                tw-px-2 tw-py-1.5 tw-text-xs tw-font-medium tw-rounded tw-transition-colors tw-duration-200 tw-text-center
                ${selectedPeriod === 'PM' 
                  ? 'tw-bg-gray-500 tw-text-white' 
                  : 'tw-bg-gray-100 tw-text-gray-600 hover:tw-bg-gray-200'
                }
                ${getAvailableTimesForPeriod('PM').length === 0 
                  ? 'tw-opacity-50 tw-cursor-not-allowed' 
                  : 'tw-cursor-pointer'
                }
              `}
              onClick={() => getAvailableTimesForPeriod('PM').length > 0 && handlePeriodChange('PM')}
            >
              PM
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomTimePicker