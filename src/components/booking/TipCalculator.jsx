import { useBooking } from "@/context/BookingContext";
import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

const TipCalculator = ({ basePrice }) => {
	const { pricing, updatePricing } = useBooking();
	const [tipPercentage, setTipPercentage] = useState(20);
	const [customTip, setCustomTip] = useState("");
	const [isCustom, setIsCustom] = useState(false);

	const tipAmount = isCustom
		? Number(customTip)
		: basePrice * (tipPercentage / 100);

	useEffect(() => {
		// Update the context whenever tipAmount changes
		updatePricing({
			gratuity: tipAmount,
		});
	}, [tipAmount, updatePricing]);

	const handleTipSelect = (percentage) => {
		setIsCustom(false);
		setTipPercentage(percentage);
		setCustomTip("");
		const newTipAmount = basePrice * (percentage / 100);
		updatePricing({
			gratuity: newTipAmount,
		});
	};

	const handleCustomTipChange = (e) => {
		const value = e.target.value;
		if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
			setCustomTip(value);
			setIsCustom(true);
			const newTipAmount = value ? Number(value) : 0;
			updatePricing({
				gratuity: newTipAmount,
			});
		}
	};

	return (
		<Card className="tip-calculator">
			<Title level={4}>Gratuity Calculator</Title>
			<Text>Base Price: ${basePrice.toFixed(2)}</Text>

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
					<Text strong>Tip Amount: ${tipAmount.toFixed(2)}</Text>
					<Text strong>
						Total with Tip: ${(basePrice + tipAmount).toFixed(2)}
					</Text>
				</Space>
			</div>
		</Card>
	);
};

export default TipCalculator;

