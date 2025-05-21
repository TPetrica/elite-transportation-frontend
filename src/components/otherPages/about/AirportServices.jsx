import React from 'react';
import { Plane, Car, Clock, MapPin, CreditCard, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AirportServices() {
  return (
    <section className="section pt-50 pb-80 bg-grey-60">
      <div className="container-sub">
        <div className="row">
          <div className="col-lg-12 text-center wow fadeInUp">
            <h2 className="heading-44-medium color-text tw-mb-4">
              Salt Lake City Airport Transportation Services
            </h2>
            <p className="text-lg color-grey-500 tw-max-w-3xl tw-mx-auto tw-mb-16">
              Professional car service from Salt Lake City Airport (SLC) to Park City and beyond
            </p>
          </div>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8 tw-mb-16">
          {/* Card 1 */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Plane className="tw-text-primary" size={28} aria-hidden="true" />
            </div>
            <h4 className="text-20-medium color-text tw-mb-3">
              SLC Airport Code & Information
            </h4>
            <p className="color-grey-500 tw-mb-4">
              Salt Lake City International Airport (SLC) is the primary gateway for visitors to Park City. Located approximately 37 miles from Park City, it serves as the closest airport to Salt Lake City's mountain resorts. Our service includes real-time tracking of all flights to Salt Lake City, ensuring timely pickups regardless of any SLC airport delays.
            </p>
            <ul className="tw-mb-4 tw-space-y-2">
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Flight tracking for all Salt Lake City flight arrivals</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Adjustments for SLC departures and arrivals</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Salt Lake City International Airport expertise</span>
              </li>
            </ul>
          </div>
          
          {/* Card 2 */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Car className="tw-text-primary" size={28} aria-hidden="true" />
            </div>
            <h4 className="text-20-medium color-text tw-mb-3">
              Salt Lake City Car Service
            </h4>
            <p className="color-grey-500 tw-mb-4">
              Unlike standard taxi cabs in Salt Lake City, our premium car service offers reliability, comfort, and professionalism. Our fleet of luxury SUVs provides a superior alternative to a basic Salt Lake City cab, with professional chauffeurs who know the best routes from SLC to Park City in any weather condition.
            </p>
            <ul className="tw-mb-4 tw-space-y-2">
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Professional car service Salt Lake City Utah</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>More comfortable than standard taxi cabs SLC</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Luxury vehicles with professional chauffeurs</span>
              </li>
            </ul>
          </div>
          
          {/* Card 3 */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full wow fadeInUp">
            <div className="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-blue-50 tw-flex tw-items-center tw-justify-center tw-mb-5">
              <Clock className="tw-text-primary" size={28} aria-hidden="true" />
            </div>
            <h4 className="text-20-medium color-text tw-mb-3">
              24/7 Airport Shuttle Service
            </h4>
            <p className="color-grey-500 tw-mb-4">
              Our transportation from Salt Lake City to Park City operates 24/7, accommodating even the earliest departures and latest arrivals. When searching for the cheapest shuttle from SLC to Park City, consider our value: we offer competitive rates with superior service quality, making us the best transportation option from SLC to Park City.
            </p>
            <ul className="tw-mb-4 tw-space-y-2">
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Early morning and late night service</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Transportation for all flight schedules</span>
              </li>
              <li className="tw-flex tw-gap-2">
                <span className="tw-text-primary">✓</span>
                <span>Competitive rates with premium service</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Service Features */}
        <div className="wow fadeInUp">
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-8">
            <h3 className="text-24-medium color-text tw-mb-8 tw-text-center">
              Why Choose Our SLC to Park City Transportation
            </h3>
            
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-mb-8">
              <div className="tw-text-center">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <MapPin className="tw-text-primary" size={36} aria-hidden="true" />
                </div>
                <h4 className="text-18-medium color-text tw-mb-2">
                  Door-to-Door Service
                </h4>
                <p className="color-grey-500 tw-text-sm">
                  Direct transportation from Salt Lake City to your Park City accommodation
                </p>
              </div>
              
              <div className="tw-text-center">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <Clock className="tw-text-primary" size={36} aria-hidden="true" />
                </div>
                <h4 className="text-18-medium color-text tw-mb-2">
                  Flight Monitoring
                </h4>
                <p className="color-grey-500 tw-text-sm">
                  We track all flights to Salt Lake City Utah to ensure on-time pickup
                </p>
              </div>
              
              <div className="tw-text-center">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <CreditCard className="tw-text-primary" size={36} aria-hidden="true" />
                </div>
                <h4 className="text-18-medium color-text tw-mb-2">
                  Easy Online Booking
                </h4>
                <p className="color-grey-500 tw-text-sm">
                  Simple reservation process for your SLC to Park City shuttle
                </p>
              </div>
              
              <div className="tw-text-center">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <Phone className="tw-text-primary" size={36} aria-hidden="true" />
                </div>
                <h4 className="text-18-medium color-text tw-mb-2">
                  24/7 Support
                </h4>
                <p className="color-grey-500 tw-text-sm">
                  Always available to assist with your transportation needs
                </p>
              </div>
            </div>
            
            <div className="tw-text-center tw-mt-8">
              <Link to="/booking-passenger" className="btn btn-brand-1 hover-up">
                Book Your SLC Airport Transportation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}