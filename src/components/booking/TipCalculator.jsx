import { useBooking } from '@/context/BookingContext'
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

const TipCalculator = ({ basePrice, onTipChange }) => {
  const { pricing, updateTipSettings } = useBooking()
  const [tipPercentage, setTipPercentage] = useState(pricing.selectedTipPercentage || null)
  const [customTip, setCustomTip] = useState(pricing.customTipAmount || '')
  const [isCustom, setIsCustom] = useState(pricing.isCustomTip || false)

  // Calculate total before tip
  const totalBeforeTip = basePrice || pricing.basePrice

  const tipAmount = isCustom
    ? Number(customTip)
    : tipPercentage
      ? totalBeforeTip * (tipPercentage / 100)
      : 0

  // Update the gratuity whenever tip changes
  useEffect(() => {
    updateTipSettings(tipAmount, tipPercentage, customTip, isCustom)

    if (onTipChange) {
      onTipChange(tipAmount)
    }
  }, [
    tipAmount,
    tipPercentage,
    customTip,
    isCustom,
    totalBeforeTip,
    updateTipSettings,
    onTipChange,
  ])

  const handleTipSelect = percentage => {
    setIsCustom(false)
    setTipPercentage(percentage)
    setCustomTip('')
  }

  const handleCustomTipChange = e => {
    const value = e.target.value
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomTip(value)
      setIsCustom(true)
      setTipPercentage(null)
    }
  }

  // Display amounts with 2 decimal places
  const formatAmount = amount => Number(amount).toFixed(2)

  return (
    <Card className="tip-calculator">
      <Title level={4}>Gratuity Calculator</Title>
      <Text>Subtotal: ${formatAmount(totalBeforeTip)}</Text>

      <Row gutter={8} className="mt-4">
        {[10, 15, 20].map(percent => (
          <Col span={8} key={percent}>
            <Button
              block
              type={!isCustom && tipPercentage === percent ? 'primary' : 'default'}
              onClick={() => handleTipSelect(percent)}
            >
              {percent}%
            </Button>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col span={24}>
          <Input
            placeholder="Custom amount"
            value={isCustom ? customTip : ''}
            onChange={handleCustomTipChange}
            addonBefore="$"
          />
        </Col>
      </Row>

      <div
        style={{
          marginTop: 24,
          borderTop: '1px solid #f0f0f0',
          paddingTop: 16,
        }}
      >
        <Space direction="vertical" size="small">
          <Text strong>Tip Amount: ${formatAmount(tipAmount)}</Text>
          <Text strong>Total with Tip: ${formatAmount(totalBeforeTip + tipAmount)}</Text>
        </Space>
      </div>
    </Card>
  )
}

export default TipCalculator
