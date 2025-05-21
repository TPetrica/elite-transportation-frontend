import React from 'react';
import { ArrowRight, Car, Plane, ShieldCheck, Clock, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SLCToParkcityInfo() {
  return (
    <section className="section pt-80 pb-80 bg-grey-60">
      <div className="container-sub">
        <div className="row">
          <div className="col-lg-12 text-center wow fadeInUp">
            <h2 className="heading-44-medium color-text tw-mb-4">
              Transportation From Salt Lake City to Park City
            </h2>
            <p className="text-lg color-grey-500 tw-max-w-3xl tw-mx-auto tw-mb-16">
              Everything you need to know about getting from SLC Airport to Park City Utah
            </p>
          </div>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 tw-mb-16">
          <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-8 wow fadeInUp">
            <h3 className="text-24-medium color-text tw-mb-6">
              How to Get from SLC to Park City
            </h3>
            <p className="color-grey-500 tw-mb-6">
              When considering how to get from Salt Lake City to Park City, travelers have several options. Our premium shuttle service offers the most comfortable and convenient transportation from SLC to Park City UT.
            </p>
            <ul className="tw-space-y-4 tw-mb-6">
              <li className="tw-flex tw-gap-3">
                <Car className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">Private Shuttle Service:</span> Our door-to-door car service from Salt Lake City to Park City with professional drivers.
                </div>
              </li>
              <li className="tw-flex tw-gap-3">
                <Car className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">Shared Shuttle:</span> Cost-effective option with other passengers going to Park City.
                </div>
              </li>
              <li className="tw-flex tw-gap-3">
                <Car className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">Rental Car:</span> Available at the airport (winter driving experience recommended).
                </div>
              </li>
              <li className="tw-flex tw-gap-3">
                <Car className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">Public Transportation:</span> UTA bus service (requires transfers and has limited schedules).
                </div>
              </li>
            </ul>
            <p className="color-grey-500 tw-font-medium">
              For a stress-free journey, our Salt Lake City to Park City transportation service provides the best balance of comfort, convenience, and reliability.
            </p>
          </div>
          
          <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-8 wow fadeInUp">
            <h3 className="text-24-medium color-text tw-mb-6">
              Salt Lake City Airport Information
            </h3>
            <p className="color-grey-500 tw-mb-6">
              Salt Lake City International Airport (SLC) is the primary and closest airport to Park City. When planning your trip, here's what you need to know about airports near Salt Lake City Utah:
            </p>
            <ul className="tw-space-y-4 tw-mb-6">
              <li className="tw-flex tw-gap-3">
                <Plane className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">SLC Airport Code:</span> The official IATA code for Salt Lake City International Airport is SLC.
                </div>
              </li>
              <li className="tw-flex tw-gap-3">
                <Plane className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">Terminal Information:</span> SLC has a single terminal with two concourses (A and B) connected by a tunnel.
                </div>
              </li>
              <li className="tw-flex tw-gap-3">
                <Plane className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">SLC Departures & Arrivals:</span> Check flight status to coordinate your transportation timing.
                </div>
              </li>
              <li className="tw-flex tw-gap-3">
                <Plane className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} />
                <div>
                  <span className="tw-font-medium">Airport in Park City:</span> There is no commercial airport in Park City itself. SLC is the primary gateway.
                </div>
              </li>
            </ul>
            <p className="color-grey-500 tw-font-medium">
              Our service includes flight tracking, so we'll adjust your pickup time based on your actual arrival at Salt Lake City Airport.
            </p>
          </div>
        </div>
        
        <div className="wow fadeInUp">
          <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-8">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
              <div>
                <h3 className="text-24-medium color-text tw-mb-6">
                  Park City Transportation Details
                </h3>
                <p className="color-grey-500 tw-mb-4">
                  Our shuttle service from Salt Lake City airport to Park City provides a seamless journey between these two popular destinations.
                </p>
                <ul className="tw-space-y-3 tw-mb-6">
                  <li className="tw-flex tw-gap-2">
                    <ShieldCheck className="tw-text-primary tw-flex-shrink-0" size={18} />
                    <span>Professional mountain drivers</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <Clock className="tw-text-primary tw-flex-shrink-0" size={18} />
                    <span>24/7 service for all flight schedules</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <Map className="tw-text-primary tw-flex-shrink-0" size={18} />
                    <span>Door-to-door service to all Park City locations</span>
                  </li>
                </ul>
                <Link to="/booking-passenger" className="btn btn-brand-1 tw-w-full">
                  Book Your Shuttle Now
                </Link>
              </div>
              
              <div className="md:tw-col-span-2">
                <h3 className="text-24-medium color-text tw-mb-6">
                  Frequently Asked Questions
                </h3>
                
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-2">
                      What airport do you fly into for Park City Utah?
                    </h4>
                    <p className="color-grey-500 tw-mb-4">
                      Salt Lake City International Airport (SLC) is the primary airport serving Park City. There is no commercial airport in Park City itself.
                    </p>
                    
                    <h4 className="text-18-medium color-text tw-mb-2">
                      How far is Salt Lake City Airport from Park City?
                    </h4>
                    <p className="color-grey-500 tw-mb-4">
                      Salt Lake City International Airport is approximately 37 miles from Park City, with a typical drive time of 40-45 minutes under normal conditions.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-2">
                      Do I need a car in Park City?
                    </h4>
                    <p className="color-grey-500 tw-mb-4">
                      Most visitors find they don't need a car once in Park City due to the free city-wide bus system, walking-friendly downtown, and resort shuttle services.
                    </p>
                    
                    <h4 className="text-18-medium color-text tw-mb-2">
                      What is the cheapest shuttle from SLC to Park City?
                    </h4>
                    <p className="color-grey-500 tw-mb-4">
                      While shared shuttles typically offer the lowest rates, our private shuttle service provides the best balance of value and convenience with direct service to your destination.
                    </p>
                  </div>
                </div>
                
                <div className="tw-mt-4 tw-flex tw-justify-end">
                  <Link to="/faq" className="tw-flex tw-items-center tw-gap-1 tw-text-primary tw-font-medium">
                    View all FAQs <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}