import { useBooking } from "@/context/BookingContext";
import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

const TipCalculator = () => {
	const { pricing, updateTipSettings } = useBooking();
	const [tipPercentage, setTipPercentage] = useState(
		pricing.selectedTipPercentage !== null ? pricing.selectedTipPercentage : 20
	);
	const [customTip, setCustomTip] = useState(pricing.customTipAmount || "");
	const [isCustom, setIsCustom] = useState(pricing.isCustomTip || false);

	// Calculate total before tip
	const totalBeforeTip =
		pricing.basePrice + pricing.extrasTotal + pricing.nightFee;

	const tipAmount = isCustom
		? Number(customTip)
		: tipPercentage
		? totalBeforeTip * (tipPercentage / 100)
		: 0;

	// Initial render effect to set 20% if no previous selection exists
	useEffect(() => {
		if (!pricing.selectedTipPercentage && !pricing.isCustomTip) {
			updateTipSettings({
				percentage: 20,
				customAmount: "",
				isCustom: false,
				gratuity: totalBeforeTip * 0.2,
			});
		}
	}, []);

	// Update pricing when values change
	useEffect(() => {
		updateTipSettings({
			percentage: tipPercentage,
			customAmount: customTip,
			isCustom,
			gratuity: tipAmount,
		});
	}, [tipAmount, tipPercentage, customTip, isCustom, totalBeforeTip]);

	const handleTipSelect = (percentage) => {
		setIsCustom(false);
		setTipPercentage(percentage);
		setCustomTip("");
	};

	const handleCustomTipChange = (e) => {
		const value = e.target.value;
		if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
			setCustomTip(value);
			setIsCustom(true);
			setTipPercentage(null);
		}
	};

	// Display amounts with 2 decimal places
	const formatAmount = (amount) => Number(amount).toFixed(2);

	return (
		<Card className="tip-calculator">
			<Title level={4}>Gratuity Calculator</Title>
			<Text>Subtotal: ${formatAmount(totalBeforeTip)}</Text>

			<Row gutter={8} className="mt-4">
				{[10, 15, 20].map((percent) => (
					<Col span={8} key={percent}>
						<Button
							block
							type={
								!isCustom && tipPercentage === percent ? "primary" : "default"
							}
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
						value={isCustom ? customTip : ""}
						onChange={handleCustomTipChange}
						addonBefore="$"
					/>
				</Col>
			</Row>

			<div
				style={{
					marginTop: 24,
					borderTop: "1px solid #f0f0f0",
					paddingTop: 16,
				}}
			>
				<Space direction="vertical" size="small">
					<Text strong>Tip Amount: ${formatAmount(tipAmount)}</Text>
					<Text strong>
						Total with Tip: ${formatAmount(totalBeforeTip + tipAmount)}
					</Text>
				</Space>
			</div>
		</Card>
	);
};

export default TipCalculator;

