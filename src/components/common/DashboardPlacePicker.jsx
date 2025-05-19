import { Input, Row, Col, InputNumber, Switch } from 'antd'
import { useState, useEffect } from 'react'

export default function DashboardPlacePicker({ value, onChange, disabled = false }) {
  const [address, setAddress] = useState('')
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [isCottonwood, setIsCottonwood] = useState(false)

  useEffect(() => {
    if (value) {
      setAddress(value.address || '')
      setLat(value.coordinates?.lat || null)
      setLng(value.coordinates?.lng || null)
      setIsCottonwood(value.isCottonwood || false)
    }
  }, [value])

  const handleChange = () => {
    const locationData = {
      address,
      coordinates: lat && lng ? { lat, lng } : null,
      isCustom: true,
      isCottonwood
    }
    onChange?.(locationData)
  }

  return (
    <div>
      <Input
        placeholder="Enter address"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value)
          handleChange()
        }}
        disabled={disabled}
        style={{ marginBottom: 8 }}
      />
      <Row gutter={16}>
        <Col span={8}>
          <InputNumber
            placeholder="Latitude"
            value={lat}
            onChange={(val) => {
              setLat(val)
              handleChange()
            }}
            step={0.0001}
            min={-90}
            max={90}
            style={{ width: '100%' }}
            disabled={disabled}
          />
        </Col>
        <Col span={8}>
          <InputNumber
            placeholder="Longitude"
            value={lng}
            onChange={(val) => {
              setLng(val)
              handleChange()
            }}
            step={0.0001}
            min={-180}
            max={180}
            style={{ width: '100%' }}
            disabled={disabled}
          />
        </Col>
        <Col span={8}>
          <Switch
            checked={isCottonwood}
            onChange={(checked) => {
              setIsCottonwood(checked)
              handleChange()
            }}
            disabled={disabled}
          /> Cottonwood
        </Col>
      </Row>
    </div>
  )
}