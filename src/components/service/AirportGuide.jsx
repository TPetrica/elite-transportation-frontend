import React from 'react';
import { Plane, Car, Bus, Info, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AirportGuide() {
  return (
    <section className="section pt-80 pb-80">
      <div className="container-sub">
        <div className="tw-text-center tw-mb-16 wow fadeInUp">
          <h2 className="heading-44-medium color-text tw-mb-4">
            Salt Lake City Airport Guide
          </h2>
          <p className="text-lg color-grey-500 tw-max-w-3xl tw-mx-auto">
            Essential information about Salt Lake City International Airport (SLC) and transportation options
          </p>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-16">
          {/* Flight Information */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 wow fadeInUp">
            <div className="tw-mb-5">
              <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center">
                <Plane className="tw-text-primary" size={28} />
              </div>
            </div>
            <h3 className="text-20-medium color-text tw-mb-3">
              Flights to Salt Lake City
            </h3>
            <p className="color-grey-500 tw-mb-4">
              Salt Lake City International Airport (SLC) is served by most major airlines with direct flights from numerous cities across the United States. Whether you're looking for flights to Salt Lake City Utah for business or leisure, multiple options are available.
            </p>
            <ul className="tw-mb-4 tw-space-y-2">
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Multiple daily flights from major hubs</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Direct international flights available</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Regular flights from SLC to other destinations</span>
              </li>
            </ul>
            <Link to="/services/slc-to-park-city-transfers" className="tw-text-primary tw-font-medium tw-flex tw-items-center">
              Book Airport Transportation
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          {/* SLC Car Service */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 wow fadeInUp">
            <div className="tw-mb-5">
              <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center">
                <Car className="tw-text-primary" size={28} />
              </div>
            </div>
            <h3 className="text-20-medium color-text tw-mb-3">
              Car Service Salt Lake City
            </h3>
            <p className="color-grey-500 tw-mb-4">
              Our professional car service Salt Lake City airport offering provides luxury transportation to and from SLC. Unlike a standard Salt Lake City cab or taxi service, we offer premium vehicles with professional chauffeurs and flight tracking.
            </p>
            <ul className="tw-mb-4 tw-space-y-2">
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Premium SLC car service with professional drivers</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>More reliable than standard taxi cabs in Salt Lake City</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Competitive rates compared to Salt Lake taxi services</span>
              </li>
            </ul>
            <Link to="/services/slc-to-park-city-transfers" className="tw-text-primary tw-font-medium tw-flex tw-items-center">
              View Car Service Options
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          {/* Getting Around */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 wow fadeInUp">
            <div className="tw-mb-5">
              <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center">
                <Bus className="tw-text-primary" size={28} />
              </div>
            </div>
            <h3 className="text-20-medium color-text tw-mb-3">
              Getting Around Salt Lake City
            </h3>
            <p className="color-grey-500 tw-mb-4">
              Once you've arrived at SLC, there are several options for getting around Salt Lake City and traveling to Park City. While public transportation options exist, our private shuttle service offers the most direct and comfortable experience.
            </p>
            <ul className="tw-mb-4 tw-space-y-2">
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>UTA public transportation with Park and Ride options</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Park City free bus system for local transportation</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">•</span>
                <span>Our direct shuttle service from SLC to Park City</span>
              </li>
            </ul>
            <Link to="/pages/about" className="tw-text-primary tw-font-medium tw-flex tw-items-center">
              Learn More About Transportation
              <svg className="tw-w-4 tw-h-4 tw-ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="wow fadeInUp">
          <div className="tw-bg-gray-50 tw-rounded-xl tw-p-8">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
              <div>
                <h3 className="text-24-medium color-text tw-mb-4">
                  Travel Tips: Salt Lake City to Park City
                </h3>
                <div className="tw-space-y-4">
                  <div className="tw-flex tw-gap-3">
                    <Info className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                    <div>
                      <h4 className="text-18-medium color-text tw-mb-1">Places to See in Salt Lake</h4>
                      <p className="color-grey-500">
                        If you have time before heading to Park City, consider visiting Temple Square, the Natural History Museum, or Liberty Park. Our hourly car service can help you explore Salt Lake City attractions efficiently.
                      </p>
                    </div>
                  </div>
                  
                  <div className="tw-flex tw-gap-3">
                    <AlertCircle className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                    <div>
                      <h4 className="text-18-medium color-text tw-mb-1">SLC Airport Delays</h4>
                      <p className="color-grey-500">
                        Salt Lake City departures and arrivals can occasionally experience delays, especially during winter storms. Our service includes flight tracking to adjust your pickup time based on your actual arrival.
                      </p>
                    </div>
                  </div>
                  
                  <div className="tw-flex tw-gap-3">
                    <Clock className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                    <div>
                      <h4 className="text-18-medium color-text tw-mb-1">Booking Timing</h4>
                      <p className="color-grey-500">
                        We recommend booking your transportation from Salt Lake City Airport to Park City Utah at least 48 hours in advance, especially during peak winter and summer seasons to ensure availability.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-24-medium color-text tw-mb-6">
                  Airports Near Salt Lake City Utah
                </h3>
                <p className="color-grey-500 tw-mb-4">
                  While Salt Lake City International Airport (SLC) is the primary gateway to Park City, there are other transportation options to consider:
                </p>
                <div className="tw-space-y-3 tw-mb-6">
                  <div className="tw-bg-white tw-p-3 tw-rounded tw-shadow-sm">
                    <h4 className="text-18-medium color-text">Salt Lake City International (SLC)</h4>
                    <p className="color-grey-500 tw-text-sm">Primary international airport, 37 miles from Park City</p>
                  </div>
                  
                  <div className="tw-bg-white tw-p-3 tw-rounded tw-shadow-sm">
                    <h4 className="text-18-medium color-text">Heber Valley Airport</h4>
                    <p className="color-grey-500 tw-text-sm">Small regional airport, serves private aircraft only</p>
                  </div>
                  
                  <div className="tw-bg-white tw-p-3 tw-rounded tw-shadow-sm">
                    <h4 className="text-18-medium color-text">Provo Municipal Airport</h4>
                    <p className="color-grey-500 tw-text-sm">Limited commercial service, 54 miles from Park City</p>
                  </div>
                </div>
                <p className="color-grey-500 tw-text-sm tw-italic">
                  Note: There is no commercial airport in Park City itself. SLC is the closest airport to Park City with regular commercial service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}