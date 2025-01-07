export const mainRates = [
	{
		title: "Private SUV",
		vehicle: "Private SUV",
		capacity: "1-2 passengers",
		summer: 150,
		winter: 160,
		description: "Perfect for couples or solo travelers",
		features: [
			"Door-to-door service",
			"Flight tracking included",
			"Professional chauffeur",
			"Complimentary wait time",
			"Free car seats upon request",
		],
	},
	{
		title: "Private SUV",
		vehicle: "Private SUV",
		capacity: "3-5 passengers",
		summer: 180,
		winter: 190,
		description: "Ideal for small groups and families",
		features: [
			"Door-to-door service",
			"Flight tracking included",
			"Professional chauffeur",
			"Complimentary wait time",
			"Free car seats upon request",
		],
	},
	{
		title: "Group Rates",
		vehicle: "Private SUV",
		capacity: "Up to 7 people",
		summer: 365,
		winter: 385,
		description: "Perfect for larger groups and events",
		features: [
			"Spacious interior",
			"Second car for luggage included",
			"Professional chauffeur",
			"Flight tracking included",
			"Group rates available",
		],
		note: "The Group Rates service includes a second car that will take care of the luggage",
	},
];

export const hourlyRates = [
	{
		vehicle: "Private SUV",
		capacity: "1-5 people",
		rate: 100,
		duration: "2 hour minimum",
		includes: "Professional chauffeur and luxury vehicle",
		note: "During the Christmas Holiday and the Sundance Film Festival all as-directed reservations require a 3-hour minimum.",
	},
];

export const perPersonRates = {
	minimumPassengers: 3,
	ratePerPerson: 65,
};

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
	// {
	// 	service: "Cottonwood Canyons",
	// 	fee: 40,
	// 	note: "Additional fee applies",
	// },
];

export const gratuityNote =
	"Gratuity is completely optional, but always sincerely appreciated.";

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

