export const services = [
	{
		id: 1,
		title: "Airport Transfers",
		description:
			"Reliable luxury transportation between Park City and Salt Lake International Airport (SLC). Professional chauffeurs track your flight and provide door-to-door service with complimentary wait time and luggage assistance.",
		image: "/assets/imgs/page/homepage1/service1.webp",
		longDescription:
			"Enjoy reliable and comfortable transportation with our professional airport transfer service. We track your flight and ensure timely pickups and dropoffs.",
		features: [
			"Flight tracking included",
			"Professional chauffeurs",
			"Complimentary wait time",
			"Door-to-door service",
			"Child seats available",
			"24/7 service",
		],
	},
	{
		id: 2,
		title: "Hourly Charter",
		description:
			"Flexible luxury vehicle service with a professional chauffeur at your disposal. Perfect for business meetings, shopping trips, local sightseeing, or special events in and around Park City. Minimum 2-hour booking.",
		image: "/assets/imgs/page/homepage1/service2.webp",
		longDescription:
			"Book our luxury vehicles by the hour for special events, sightseeing, or business meetings. Includes professional chauffeur and amenities.",
		features: [
			"2-hour minimum",
			"Professional chauffeur",
			"Luxury vehicles",
			"Flexible scheduling",
			"Local area expertise",
			"Complimentary water",
		],
	},
	{
		id: 3,
		title: "Group Transportation",
		description:
			"Premium group transportation in spacious luxury vans accommodating up to 14 passengers. Ideal for corporate events, wedding parties, family gatherings, and special occasions with ample luggage space and professional service.",
		image: "/assets/imgs/page/homepage1/service3.webp",
		longDescription:
			"Specialized group transportation services with luxury vans and professional drivers. Ideal for corporate groups, weddings, or special events.",
		features: [
			"Up to 7 passengers",
			"Luggage accommodation",
			"Professional chauffeur",
			"Group rates available",
			"Event coordination",
			"Multiple vehicle options",
		],
	},
	{
		id: 4,
		title: "Winter Sports Transport",
		description:
			"Specialized transportation to Park City's premier ski resorts including Park City Mountain and Deer Valley. Expert winter drivers, equipment accommodation, and early morning service available for the perfect ski day.",
		image: "/assets/imgs/page/homepage1/service4.webp",
		longDescription:
			"Specialized winter sports transportation to all major ski resorts. We accommodate ski and snowboard equipment with experienced winter drivers.",
		features: [
			"Ski equipment transport",
			"Resort knowledge",
			"Winter-ready vehicles",
			"Early morning service",
			"Multiple resort options",
			"Group rates available",
		],
	},
];

export const features7 = [
	"Door-to-door service",
	"Professional chauffeurs",
	"Flight tracking",
	"Modern luxury vehicles",
	"24/7 customer support",
	"Competitive rates",
	"Easy online booking",
];

// Keep original arrays for compatibility
export const services2 = services.map((service) => ({
	id: service.id,
	text: service.title,
}));

export const services4 = services.map((service) => ({
	...service,
	image: "/assets/imgs/page/homepage8/img2.png",
	alt: "luxride",
}));

export const services5 = services.map((service) => ({
	...service,
	image: "/assets/imgs/page/homepage10/service1.png",
}));

export const allServices = [...services, ...services4, ...services5];

