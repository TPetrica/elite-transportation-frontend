import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete'
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

// Define Cottonwood locations
const COTTONWOOD_LOCATIONS = ['Snowbird', 'Alta', 'Solitude', 'Brighton', 'Sundance']

const Container = styled.div`
  width: 100%;
`

const StyledSelect = styled(Select)`
  &.ant-select {
    width: 100%;
  }

  .ant-select-selector {
    height: 48px !important;
    padding: 8px 12px !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    background: #fff !important;
    box-shadow: none !important;
    display: flex;
    align-items: center;
  }

  .ant-select-selection-search {
    display: flex;
    align-items: center;
  }

  .ant-select-selection-placeholder {
    color: #6b7280;
  }

  .ant-select-selection-item {
    line-height: 32px !important;
  }
`

export default function PlacePicker({ value, onChange, type, placeholder, selectedService }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { suggestions, loading, getDetails, setSearchInput } = useGooglePlacesAutocomplete(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    type,
    selectedService
  )

  // Function to check if a location is in Cottonwood Canyons
  const isCottonwoodLocation = address => {
    if (!address) return false
    return COTTONWOOD_LOCATIONS.some(location =>
      address.toLowerCase().includes(location.toLowerCase())
    )
  }

  const handleSearch = newValue => {
    setSearchTerm(newValue)
    setSearchInput(newValue)

    // If service is airport-related, don't allow custom addresses
    if (selectedService?.id === 'from-airport' && type === 'pickup') return
    if (selectedService?.id === 'to-airport' && type === 'dropoff') return

    // Update with custom address if user is typing
    onChange?.({
      address: newValue,
      coordinates: null,
      isCustom: true,
      isCottonwood: isCottonwoodLocation(newValue),
    })
  }

  const handleChange = async (placeId, option) => {
    try {
      if (!option) {
        onChange?.({
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
        setSearchTerm('')
        return
      }

      // If it's a custom input option and custom addresses are allowed for this service/type
      const isAirportPickup = selectedService?.id === 'from-airport' && type === 'pickup'
      const isAirportDropoff = selectedService?.id === 'to-airport' && type === 'dropoff'

      if (option.isCustom && !isAirportPickup && !isAirportDropoff) {
        const isCottonwood = isCottonwoodLocation(option.value)
        onChange?.({
          address: option.value,
          coordinates: null,
          isCustom: true,
          isCottonwood,
        })
        setSearchTerm(option.value)
        return
      }

      // If it's a Google Places suggestion
      const details = await getDetails(placeId)
      if (details) {
        const formattedAddress = option.label
        const isCottonwood = isCottonwoodLocation(formattedAddress)

        onChange?.({
          address: formattedAddress,
          coordinates: {
            lat: details.geometry.location.lat(),
            lng: details.geometry.location.lng(),
          },
          isCustom: false,
          isCottonwood,
        })
        setSearchTerm('')
      }
    } catch (error) {
      console.error('Error getting place details:', error)
      const isCottonwood = isCottonwoodLocation(searchTerm)
      onChange?.({
        address: searchTerm,
        coordinates: null,
        isCustom: true,
        isCottonwood,
      })
    }
  }

  useEffect(() => {
    if (value) {
      setSearchTerm(value)
    }
  }, [value])

  // Determine if custom addresses should be allowed
  const isAirportPickup = selectedService?.id === 'from-airport' && type === 'pickup'
  const isAirportDropoff = selectedService?.id === 'to-airport' && type === 'dropoff'
  const allowCustomAddresses = !isAirportPickup && !isAirportDropoff

  // Combine Google suggestions with custom input option
  const combinedOptions = [
    // Add custom option if allowed and if it doesn't match existing suggestions
    ...(allowCustomAddresses &&
    searchTerm &&
    !suggestions.some(s => s.description.toLowerCase() === searchTerm.toLowerCase())
      ? [
          {
            value: searchTerm,
            label: searchTerm,
            mainText: searchTerm,
            secondaryText: 'Custom Address',
            isCustom: true,
          },
        ]
      : []),
    ...suggestions.map(suggestion => ({
      value: suggestion.place_id,
      label: suggestion.description,
      mainText: suggestion.structured_formatting.main_text,
      secondaryText: suggestion.structured_formatting.secondary_text,
      isAirport: suggestion.types.includes('airport'),
      isCustom: false,
    })),
  ]

  // Customize placeholder based on service type
  let customPlaceholder = placeholder
  if (isAirportPickup) {
    customPlaceholder = 'Select an airport for pickup'
  } else if (isAirportDropoff) {
    customPlaceholder = 'Select an airport for dropoff'
  }

  return (
    <Container>
      <StyledSelect
        showSearch
        value={value || undefined}
        placeholder={customPlaceholder}
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={combinedOptions}
        searchValue={searchTerm}
        loading={loading}
        allowClear
        onClear={() => {
          setSearchTerm('')
          onChange?.({
            address: '',
            coordinates: null,
            isCustom: false,
            isCottonwood: false,
          })
        }}
        suffixIcon={loading ? <LoadingOutlined /> : <EnvironmentOutlined />}
        optionRender={option => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '12px' }}>
              {option.data.isAirport ? '✈️' : option.data.isCustom ? '📝' : '📍'}
            </span>
            <div>
              <div style={{ fontWeight: 500 }}>{option.data.mainText}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {option.data.secondaryText}
                {isCottonwoodLocation(option.data.mainText) && (
                  <span style={{ color: '#1890ff', marginLeft: '8px' }}>
                    (Cottonwood Canyons Area)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      />
    </Container>
  )
}
