import React from 'react'
import { Code, Map, Clock, MapPin, Ruler, CircleHelp } from 'lucide-react'

export default function AirportInfo() {
  return (
    <section className="section tw-py-20 tw-bg-gray-50">
      <div className="container-sub">
        <div className="tw-text-center tw-mb-16">
          <h2 className="heading-44-medium color-text tw-mb-3 wow fadeInUp">
            Salt Lake City International Airport (SLC)
          </h2>
          <p className="tw-text-lg tw-text-gray-700 wow fadeInUp tw-max-w-3xl tw-mx-auto">
            Essential information about SLC Airport for your Park City journey
          </p>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
          {/* Airport Code Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-translate-y-[-5px] wow fadeInUp">
            <div className="tw-mb-5">
              <Code className="tw-w-14 tw-h-14 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Airport Code: SLC</h4>
            <p className="tw-text-gray-600 tw-mb-4">Salt Lake City International Airport is identified by the IATA code SLC.</p>
            <a href="/slc-airport-code" className="tw-text-blue-600 tw-font-medium tw-flex tw-items-center hover:tw-underline" aria-label="Learn more about SLC Airport code and facilities">
              More About SLC Airport Code
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Terminal Information Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-translate-y-[-5px] wow fadeInUp">
            <div className="tw-mb-5">
              <Map className="tw-w-14 tw-h-14 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Terminal Information</h4>
            <p className="tw-text-gray-600 tw-mb-4">SLC has a single terminal with two concourses (A and B) connected by a tunnel.</p>
            <a href="/salt-lake-city-airport-guide" className="tw-text-blue-600 tw-font-medium tw-flex tw-items-center hover:tw-underline" aria-label="View interactive terminal map of Salt Lake City International Airport">
              View Terminal Map
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Flight Status Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-translate-y-[-5px] wow fadeInUp">
            <div className="tw-mb-5">
              <Clock className="tw-w-14 tw-h-14 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Flight Status</h4>
            <p className="tw-text-gray-600 tw-mb-4">Check SLC departures and arrivals to coordinate your transportation.</p>
            <a href="/slc-departures" className="tw-text-blue-600 tw-font-medium tw-flex tw-items-center hover:tw-underline" aria-label="Check real-time flight status at Salt Lake City International Airport">
              Check Flight Status
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Pickup Locations Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-translate-y-[-5px] wow fadeInUp">
            <div className="tw-mb-5">
              <MapPin className="tw-w-14 tw-h-14 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Pickup Locations</h4>
            <p className="tw-text-gray-600 tw-mb-4">Transportation pickup areas are located outside each terminal on the ground level.</p>
            <a href="/slc-airport-pickup-locations" className="tw-text-blue-600 tw-font-medium tw-flex tw-items-center hover:tw-underline" aria-label="View map of transportation pickup locations at SLC Airport">
              View Pickup Map
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Distance to Park City Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-translate-y-[-5px] wow fadeInUp">
            <div className="tw-mb-5">
              <Ruler className="tw-w-14 tw-h-14 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Distance to Park City</h4>
            <p className="tw-text-gray-600 tw-mb-4">Park City is approximately 37 miles from SLC, with a travel time of 40-45 minutes.</p>
            <a href="/transportation-from-salt-lake-city-to-park-city" className="tw-text-blue-600 tw-font-medium tw-flex tw-items-center hover:tw-underline" aria-label="Explore transportation options from Salt Lake City to Park City">
              Transportation Options
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          
          {/* Nearby Airports Card */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-translate-y-[-5px] wow fadeInUp">
            <div className="tw-mb-5">
              <CircleHelp className="tw-w-14 tw-h-14 tw-text-[#3e97ff]" aria-hidden="true" />
            </div>
            <h4 className="tw-text-xl tw-font-semibold tw-mb-3">Nearby Airports</h4>
            <p className="tw-text-gray-600 tw-mb-4">SLC is the primary airport serving Park City. There is no commercial airport in Park City.</p>
            <a href="/airports-near-salt-lake-city-utah" className="tw-text-blue-600 tw-font-medium tw-flex tw-items-center hover:tw-underline" aria-label="Learn about other airports in the vicinity of Salt Lake City and Park City">
              Learn About Nearby Airports
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}