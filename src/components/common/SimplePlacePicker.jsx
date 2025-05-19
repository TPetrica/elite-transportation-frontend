import { Select } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledSelect = styled(Select)`
  width: 100%;
  
  .ant-select-selector {
    height: 48px !important;
    padding: 8px 12px !important;
  }
`

export default function SimplePlacePicker({ 
  value, 
  onChange, 
  disabled = false, 
  placeholder = "Select location",
  options = []
}) {
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    if (value?.address) {
      setSelectedValue(value.address)
    } else {
      setSelectedValue('')
    }
  }, [value])

  const handleChange = (selectedAddress, option) => {
    if (!selectedAddress) {
      onChange?.(null)
      return
    }

    const selectedOption = options.find(opt => opt.address === selectedAddress)
    if (selectedOption) {
      onChange?.(selectedOption)
    }
  }

  const selectOptions = options.map(option => ({
    value: option.address,
    label: option.address,
  }))

  return (
    <StyledSelect
      value={selectedValue || undefined}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      options={selectOptions}
      allowClear
    />
  )
}