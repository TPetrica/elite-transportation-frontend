export const mainRates = [
	{
		title: "Private SUV",
		vehicle: "Private SUV",
		capacity: "1-2 passengers",
		summer: 175,
		winter: 185,
		description: "Perfect for couples or solo travelers",
		features: [
			"Door-to-door service",
			"Flight tracking included",
			"Professional chauffeur",
			"Complimentary wait time",
			"Free car seats upon request",
		],
		details: {
			basePrice: 175,
			winterSUV: 10,
			standardGratuity: 35,
			fuelSurcharge: 12.5,
			totalPrice: 237,
		},
	},
	{
		title: "Private SUV",
		vehicle: "Private SUV",
		capacity: "3-4 passengers",
		summer: 190,
		winter: 200,
		description: "Ideal for small groups and families",
		features: [
			"Door-to-door service",
			"Flight tracking included",
			"Professional chauffeur",
			"Complimentary wait time",
			"Free car seats upon request",
		],
		details: {
			basePrice: 190,
			winterSUV: 10,
			standardGratuity: 38,
			fuelSurcharge: 12.5,
			totalPrice: 255,
		},
	},
	{
		title: "Private Van",
		vehicle: "Private Van",
		capacity: "Up to 10 passengers",
		summer: 315,
		winter: 345,
		description: "Perfect for larger groups and events",
		features: [
			"Spacious interior",
			"Ample luggage space",
			"Professional chauffeur",
			"Flight tracking included",
			"Group rates available",
		],
	},
];

export const hourlyRates = [
	{
		vehicle: "Private SUV",
		capacity: "1-4 passengers",
		rate: "100",
		duration: "2 hour minimum",
		includes:
			"Includes luxury vehicle, professional driver, taxes, fees, and bottled water",
	},
];

export const additionalFees = [
	{
		service: "Night Service",
		fee: 20,
		note: "11:00 PM - 7:00 AM",
	},
	{
		service: "Meet & Greet",
		fee: 30,
		note: "Includes name sign",
	},
	{
		service: "Child Car Seat",
		fee: 0,
		note: "Free upon request",
	},
	{
		service: "Cottonwood Canyons",
		fee: 40,
		note: "Additional fee applies",
	},
];

export const serviceTypes = [
	{
		type: "From Airport",
		details: "Flight number and arrival time required",
	},
	{
		type: "To Airport",
		details: "Standard service",
	},
	{
		type: "Round Trip",
		details: "Double the one-way rate",
	},
	{
		type: "Hourly",
		details: "2 hour minimum - $100/h",
	},
];
