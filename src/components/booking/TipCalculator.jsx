import { useBooking } from '@/context/BookingContext'
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Title, Text } = Typography

const TipCalculator = ({ basePrice }) => {
  const { pricing, updateTipSettings } = useBooking()
  const [tipPercentage, setTipPercentage] = useState(pricing.selectedTipPercentage || null)
  const [customTip, setCustomTip] = useState(pricing.customTipAmount || '')
  const [isCustom, setIsCustom] = useState(pricing.isCustomTip || false)

  // Calculate total before tip
  const totalBeforeTip = basePrice || pricing.basePrice

  // Calculate tip amount based on either percentage or custom amount
  const tipAmount = isCustom
    ? Number(customTip) || 0
    : tipPercentage
      ? totalBeforeTip * (tipPercentage / 100) || 0
      : 0

  // Update the gratuity whenever relevant values change
  useEffect(() => {
    if (totalBeforeTip > 0) {
      updateTipSettings(tipAmount, tipPercentage, customTip, isCustom)
    }
  }, [tipAmount, tipPercentage, customTip, isCustom, totalBeforeTip, updateTipSettings])

  // Handle selecting a percentage tip
  const handleTipSelect = percentage => {
    setIsCustom(false)
    setTipPercentage(percentage)
    setCustomTip('')
  }

  // Handle custom tip input
  const handleCustomTipChange = e => {
    const value = e.target.value
    // Only allow valid number inputs with up to 2 decimal places
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomTip(value)
      setIsCustom(true)
      setTipPercentage(null)
    }
  }

  // Display amounts with 2 decimal places
  const formatAmount = amount => {
    const num = Number(amount) || 0
    return num.toFixed(2)
  }

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
          <Text strong>
            Total with Tip: ${formatAmount(Number(totalBeforeTip) + Number(tipAmount))}
          </Text>
        </Space>
      </div>
    </Card>
  )
}

export default TipCalculator
