import React from 'react'
import { Snowflake, Luggage, Mountain, Clock, Plane, Bus } from 'lucide-react'

export default function TravelTips() {
  return (
    <section className="section tw-py-20 tw-bg-gray-50">
      <div className="container-sub">
        <div className="tw-text-center tw-mb-16">
          <h2 className="heading-44-medium color-text tw-mb-3 wow fadeInUp">
            Park City Travel Tips
          </h2>
          <p className="tw-text-lg tw-text-gray-700 wow fadeInUp tw-max-w-3xl tw-mx-auto">
            Essential advice for your Park City visit
          </p>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
          {/* Winter Travel Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Snowflake className="tw-w-8 tw-h-8 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Winter Travel Considerations</h4>
            <p className="tw-text-gray-600">During winter months (November-April), allow extra time for your journey due to potential snow and increased traffic to ski resorts. Our vehicles are equipped with winter tires and chains when necessary.</p>
          </div>
          
          {/* Packing Tips Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Luggage className="tw-w-8 tw-h-8 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Packing for Park City</h4>
            <p className="tw-text-gray-600">Our vehicles can accommodate ski equipment and luggage. For groups larger than 4 with extensive gear, consider booking a larger vehicle or additional transportation for comfort.</p>
          </div>
          
          {/* Altitude Adjustment Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Mountain className="tw-w-8 tw-h-8 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Altitude Adjustment</h4>
            <p className="tw-text-gray-600">Park City sits at 7,000 feet above sea level. Stay hydrated during your transportation and throughout your stay to help adjust to the higher elevation.</p>
          </div>
          
          {/* Booking Timing Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Clock className="tw-w-8 tw-h-8 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Advance Booking</h4>
            <p className="tw-text-gray-600">We recommend booking your SLC to Park City transportation at least 48 hours in advance, especially during peak winter season (December-March) and special events.</p>
          </div>
          
          {/* Flight Information Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Plane className="tw-w-8 tw-h-8 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Providing Flight Details</h4>
            <p className="tw-text-gray-600">When booking, include your complete flight information (airline, flight number, arrival time) to enable our flight tracking service and ensure timely pickup.</p>
          </div>
          
          {/* Local Transportation Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Bus className="tw-w-8 tw-h-8 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Getting Around Park City</h4>
            <p className="tw-text-gray-600">Once in Park City, the free bus system connects major attractions and resorts. Many visitors find they don't need a car during their stay.</p>
          </div>
        </div>
        
        <div className="tw-text-center tw-mt-12 wow fadeInUp">
          <a className="btn btn-link hover-up tw-inline-flex tw-items-center" href="/places-to-see-in-salt-lake" aria-label="Discover attractions in Salt Lake City and Park City">
            Discover Things to Do in Salt Lake City and Park City
            <svg className="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}