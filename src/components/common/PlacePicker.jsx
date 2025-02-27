import { useGooglePlacesAutocomplete } from '@/hooks/useGooglePlacesAutocomplete'
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'

const COTTONWOOD_LOCATIONS = ['Snowbird', 'Alta', 'Solitude', 'Brighton', 'Sundance']
const ALLOWED_REGIONS = ['Salt Lake City', 'Park City', 'Cottonwood', 'Utah', 'UT', 'SLC']

// Fixed locations for affiliate bookings
const AFFILIATE_LOCATIONS = [
  {
    value: 'slc-airport',
    address: 'Salt Lake City International Airport, Salt Lake City, UT, USA',
    label: 'Salt Lake City International Airport',
    mainText: 'Salt Lake City International Airport',
    secondaryText: 'Salt Lake City, UT, USA',
    isAirport: true,
    isCustom: false,
  },
  {
    value: 'park-city-hostel',
    address: 'Park City Hostel, Park City, UT, USA',
    label: 'Park City Hostel',
    mainText: 'Park City Hostel',
    secondaryText: 'Park City, UT, USA',
    isAirport: false,
    isCustom: false,
  },
]

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

const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google)
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default function PlacePicker({
  value,
  onChange,
  type,
  placeholder,
  selectedService,
  isAffiliate,
  disabled = false,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false)
  const [forceValue, setForceValue] = useState(null)

  useEffect(() => {
    let isMounted = true

    const initGoogle = async () => {
      try {
        await loadGoogleMapsScript()
        if (isMounted) {
          setIsGoogleLoaded(true)
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error)
      }
    }

    if (!window.google) {
      initGoogle()
    } else {
      setIsGoogleLoaded(true)
    }

    return () => {
      isMounted = false
    }
  }, [])

  const isInAllowedRegion = address => {
    if (!address) return false
    const addressLower = address.toLowerCase()
    return ALLOWED_REGIONS.some(region => addressLower.includes(region.toLowerCase()))
  }

  const { suggestions, loading, getDetails, setSearchInput } = useGooglePlacesAutocomplete(
    type,
    selectedService,
    isGoogleLoaded
  )

  // Filter suggestions to only show locations in allowed regions
  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(suggestion => isInAllowedRegion(suggestion.description))
  }, [suggestions])

  const isCottonwoodLocation = useMemo(
    () => address => {
      if (!address) return false
      return COTTONWOOD_LOCATIONS.some(location =>
        address.toLowerCase().includes(location.toLowerCase())
      )
    },
    []
  )

  const handleSearch = newValue => {
    if (!isGoogleLoaded || disabled) return

    setSearchTerm(newValue)
    setSearchInput(newValue)

    if (selectedService?.id === 'from-airport' && type === 'pickup') return
    if (selectedService?.id === 'to-airport' && type === 'dropoff') return

    onChange?.({
      address: newValue,
      coordinates: null,
      isCustom: true,
      isCottonwood: isCottonwoodLocation(newValue),
    })
  }

  // Modified to fix the deletion issue when clicking away from the select
  const handleFocus = () => {
    if (value) {
      setForceValue(value)
    }
  }

  const handleBlur = () => {
    // When the select loses focus and we have a forced value, reset the search term
    if (forceValue) {
      setSearchTerm(forceValue)
    }
  }

  const handleChange = async (placeId, option) => {
    if (!isGoogleLoaded || disabled) return

    try {
      if (!option) {
        onChange?.({
          address: '',
          coordinates: null,
          isCustom: false,
          isCottonwood: false,
        })
        setSearchTerm('')
        setForceValue(null)
        return
      }

      // For affiliate mode, handle special location objects
      if (isAffiliate && option.isAffiliateLocation) {
        const newValue = {
          address: option.address,
          coordinates: option.coordinates || null,
          isCustom: false,
          isCottonwood: false,
        }
        onChange?.(newValue)
        setSearchTerm(option.address)
        setForceValue(option.address)
        return
      }

      const isAirportPickup = selectedService?.id === 'from-airport' && type === 'pickup'
      const isAirportDropoff = selectedService?.id === 'to-airport' && type === 'dropoff'

      if (option.isCustom && !isAirportPickup && !isAirportDropoff) {
        const isCottonwood = isCottonwoodLocation(option.value)
        const newValue = {
          address: option.value,
          coordinates: null,
          isCustom: true,
          isCottonwood,
        }
        onChange?.(newValue)
        setSearchTerm(option.value)
        setForceValue(option.value)
        return
      }

      const details = await getDetails(placeId)
      if (details) {
        const formattedAddress = option.label
        const isCottonwood = isCottonwoodLocation(formattedAddress)
        const newValue = {
          address: formattedAddress,
          coordinates: {
            lat: details.geometry.location.lat(),
            lng: details.geometry.location.lng(),
          },
          isCustom: false,
          isCottonwood,
        }
        onChange?.(newValue)
        setSearchTerm(formattedAddress)
        setForceValue(formattedAddress)
      }
    } catch (error) {
      console.error('Error getting place details:', error)
      const isCottonwood = isCottonwoodLocation(searchTerm)
      const newValue = {
        address: searchTerm,
        coordinates: null,
        isCustom: true,
        isCottonwood,
      }
      onChange?.(newValue)
      setForceValue(searchTerm)
    }
  }

  // Update the search term when the value prop changes externally
  useEffect(() => {
    if (value) {
      setSearchTerm(value)
      setForceValue(value)
    } else {
      setSearchTerm('')
      setForceValue(null)
    }
  }, [value])

  const isAirportPickup = selectedService?.id === 'from-airport' && type === 'pickup'
  const isAirportDropoff = selectedService?.id === 'to-airport' && type === 'dropoff'
  const allowCustomAddresses = !isAirportPickup && !isAirportDropoff

  // For affiliate mode, use restricted options
  const affiliateOptions = useMemo(() => {
    return AFFILIATE_LOCATIONS.map(location => ({
      ...location,
      isAffiliateLocation: true,
      coordinates:
        location.value === 'slc-airport'
          ? { lat: 40.7899, lng: -111.9791 }
          : { lat: 40.6609, lng: -111.4988 },
    }))
  }, [])

  // Standard options based on search results
  const standardOptions = useMemo(
    () => [
      ...(allowCustomAddresses &&
      searchTerm &&
      isInAllowedRegion(searchTerm) &&
      !filteredSuggestions.some(s => s.description.toLowerCase() === searchTerm.toLowerCase())
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
      ...filteredSuggestions.map(suggestion => ({
        value: suggestion.place_id,
        label: suggestion.description,
        mainText: suggestion.structured_formatting.main_text,
        secondaryText: suggestion.structured_formatting.secondary_text,
        isAirport: suggestion.types.includes('airport'),
        isCustom: false,
      })),
    ],
    [allowCustomAddresses, searchTerm, filteredSuggestions]
  )

  const options = isAffiliate ? affiliateOptions : standardOptions

  let customPlaceholder = placeholder
  if (isAirportPickup) {
    customPlaceholder = 'Select an airport for pickup'
  } else if (isAirportDropoff) {
    customPlaceholder = 'Select an airport for dropoff'
  } else if (isAffiliate) {
    customPlaceholder = type === 'pickup' ? 'Select pickup location' : 'Select dropoff location'
  }

  if (!isGoogleLoaded) {
    return (
      <Container>
        <StyledSelect
          placeholder="Loading Google Maps..."
          disabled
          suffixIcon={<LoadingOutlined />}
        />
      </Container>
    )
  }

  return (
    <Container>
      <StyledSelect
        showSearch
        value={forceValue || searchTerm || undefined}
        placeholder={customPlaceholder}
        defaultActiveFirstOption={false}
        filterOption={isAffiliate}
        onSearch={handleSearch}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        notFoundContent={null}
        options={options}
        loading={loading}
        disabled={disabled}
        allowClear
        onClear={() => {
          setSearchTerm('')
          setForceValue(null)
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
