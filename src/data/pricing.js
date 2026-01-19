// pricing.js
export const mainRates = [
  {
    title: 'Standard Airport Transfer',
    vehicle: 'Private SUV',
    capacity: '1-4 passengers',
    summer: 120,
    winter: 120,
    description:
      'Reliable airport transportation for up to 4 passengers with door-to-door service and flight tracking.',
    features: [
      'Door-to-door service',
      'Flight tracking included',
      'Professional chauffeur',
      'Complimentary wait time',
      'Free car seats upon request',
    ],
  },
  {
    title: 'Cottonwood Canyon Transfer',
    vehicle: 'Private SUV',
    capacity: '1-4 passengers',
    summer: 170,
    winter: 170,
    description:
      'Specialized transfer service in the Cottonwood Canyons area, offering scenic routes and expert local drivers.',
    features: [
      'Scenic routes',
      'Expert local drivers',
      'Comfortable ride',
      'Professional chauffeur',
    ],
  },
  {
    title: 'Group Rates',
    vehicle: 'Private SUV',
    capacity: 'Up to 14 people',
    summer: 'Please inquire for pricing and availability',
    winter: 'Please inquire for pricing and availability',
    description:
      'Ideal for larger groups and events. For groups over 7 passengers, please contact us directly for pricing and availability.',
    features: [
      'Spacious interior',
      'Second car for luggage included',
      'Professional chauffeur',
      'Flight tracking included',
      'Group rates available',
    ],
    note: 'The Group Rates service includes a second car for luggage. For groups over 7 passengers, please contact us for custom pricing.',
  },
]

export const hourlyRates = [
  {
    vehicle: 'Private SUV',
    capacity: '1-5 people',
    rate: 120,
    duration: '2 hour minimum',
    includes: 'Professional chauffeur and luxury vehicle',
    note: 'During the Christmas Holiday and the Sundance Film Festival, all as‐directed reservations require a 3‐hour minimum.',
  },
]

export const perPersonRates = {
  minimumPassengers: 2,
  ratePerPerson: 65,
}

export const additionalFees = [
  {
    service: 'Night Service',
    fee: 30,
    note: 'Applicable between 11:00 PM and 6:00 AM',
  },
  {
    service: 'Meet & Greet',
    fee: 45,
    note: 'Includes name sign',
  },
  {
    service: 'Child Car Seat',
    fee: 0,
    note: 'Free upon request',
  },
]

export const gratuityNote = 'Gratuity is completely optional, but always sincerely appreciated.'

export const serviceTypes = [
  {
    type: 'From Airport',
    details: 'Flight number and arrival time required',
  },
  {
    type: 'To Airport',
    details: 'Standard service',
  },
  {
    type: 'Round Trip',
    details: 'Double the one-way rate',
  },
  {
    type: 'Hourly',
    details: '2 hour minimum - $120/h',
  },
]
