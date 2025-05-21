import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plane, Clock, Award, Shield, Headphones } from 'lucide-react';

export default function AboutSLCTransportation() {
  return (
    <div className="section pt-80 pb-50">
      <div className="container-sub">
        <div className="tw-max-w-7xl tw-mx-auto">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-16 tw-mb-16">
            <div className="wow fadeInUp">
              <h2 className="heading-44-medium color-text tw-mb-6">
                Premier SLC to Park City Transportation
              </h2>
              <p className="text-18 color-grey-500 tw-mb-6">
                Welcome to Luxride, your trusted provider of professional car service from Salt Lake City to Park City Utah. We specialize in seamless airport transportation, ensuring your journey from Salt Lake City International Airport (SLC) to your destination is comfortable and stress-free.
              </p>
              <p className="text-18 color-grey-500 tw-mb-6">
                With years of experience navigating the route between Salt Lake City and Park City, our drivers are experts at providing the best transportation service in any weather condition, especially during the winter months when travel can be challenging.
              </p>
              <div className="tw-flex tw-flex-col tw-gap-4 tw-mb-8">
                <div className="tw-flex tw-items-start tw-gap-3">
                  <MapPin className="tw-text-primary tw-mt-1 tw-flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Salt Lake City to Park City: 37 Miles of Expert Service</h4>
                    <p className="color-grey-500">
                      The journey from Salt Lake City International Airport to Park City spans approximately 37 miles and typically takes 40-45 minutes under normal conditions. Our drivers know the most efficient routes to get you to your destination quickly and safely.
                    </p>
                  </div>
                </div>
                <div className="tw-flex tw-items-start tw-gap-3">
                  <Plane className="tw-text-primary tw-mt-1 tw-flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">SLC Airport Code: Your Gateway to Utah</h4>
                    <p className="color-grey-500">
                      Salt Lake City International Airport (SLC) is the primary airport serving Park City, as there is no commercial airport in Park City itself. Our shuttle service tracks your flight to ensure timely pickups, regardless of any delays or schedule changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="wow fadeInUp">
              <div className="tw-relative tw-rounded-lg tw-overflow-hidden tw-h-full tw-min-h-[320px]">
                <img 
                  src="/assets/imgs/page/about/suv-winter.webp" 
                  alt="Luxury SUV transportation from Salt Lake City Airport to Park City in winter conditions" 
                  className="tw-object-cover tw-w-full tw-h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="tw-mb-16 wow fadeInUp">
            <h3 className="heading-44-medium color-text tw-mb-8 tw-text-center">
              Why Choose Our Salt Lake City Airport Shuttle Service
            </h3>
            
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <Clock className="tw-text-primary" size={48} />
                </div>
                <h4 className="text-20-medium color-text tw-mb-3 tw-text-center">
                  Flight Tracking & Punctuality
                </h4>
                <p className="text-16 color-grey-500 tw-text-center">
                  Our transportation service includes real-time flight tracking, ensuring we're there exactly when you need us, even if your flight to Salt Lake City experiences delays. We monitor all flights to SLC so you never have to worry about your pickup.
                </p>
              </div>
              
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <Award className="tw-text-primary" size={48} />
                </div>
                <h4 className="text-20-medium color-text tw-mb-3 tw-text-center">
                  Professional SLC Car Service
                </h4>
                <p className="text-16 color-grey-500 tw-text-center">
                  Our professionally trained chauffeurs provide expert car service from Salt Lake City Airport to Park City with a focus on safety and comfort. Each driver is thoroughly vetted and experienced in mountain driving conditions.
                </p>
              </div>
              
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6 tw-h-full">
                <div className="tw-mb-4 tw-flex tw-justify-center">
                  <Shield className="tw-text-primary" size={48} />
                </div>
                <h4 className="text-20-medium color-text tw-mb-3 tw-text-center">
                  Safe Winter Transportation
                </h4>
                <p className="text-16 color-grey-500 tw-text-center">
                  Our vehicles are equipped with winter tires and chains when necessary, ensuring safe transportation from Salt Lake City to Park City Utah even during heavy snowfall. Our drivers are experts in navigating winter road conditions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="tw-mb-16 wow fadeInUp">
            <div className="tw-bg-gray-50 tw-rounded-xl tw-p-8">
              <h3 className="heading-34-medium color-text tw-mb-6">
                How to Get from SLC to Park City with Luxride
              </h3>
              
              <div className="tw-mb-6 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
                <div>
                  <h4 className="text-18-medium color-text tw-mb-3">
                    Getting to Park City from Salt Lake City Airport
                  </h4>
                  <p className="color-grey-500 tw-mb-4">
                    When considering how to get from SLC to Park City, our premium shuttle service offers the perfect combination of convenience and comfort. Unlike public transportation or rideshare options, we provide door-to-door service directly to your accommodations.
                  </p>
                  <p className="color-grey-500">
                    For those wondering about the cheapest shuttle from SLC to Park City, we offer competitive rates with superior service quality, making us the best value for Park City Utah airport transportation.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-18-medium color-text tw-mb-3">
                    Salt Lake City Airport (SLC) Information
                  </h4>
                  <p className="color-grey-500 tw-mb-4">
                    As the closest airport to Salt Lake City and Park City, SLC serves as the primary gateway for visitors. With our knowledge of airports near Salt Lake City Utah, we can help coordinate your transportation needs from any regional airport.
                  </p>
                  <p className="color-grey-500">
                    The Salt Lake City Department of Airports manages SLC, which has undergone significant improvements to enhance the traveler experience before your journey to Park City begins.
                  </p>
                </div>
              </div>
              
              <div className="tw-text-center">
                <Link to="/services/slc-to-park-city-transfers" className="btn btn-brand-1 hover-up">
                  Book SLC to Park City Transportation
                </Link>
              </div>
            </div>
          </div>
          
          <div className="wow fadeInUp">
            <h3 className="heading-44-medium color-text tw-mb-8 tw-text-center">
              Comprehensive Transportation Services
            </h3>
            
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 tw-mb-8">
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
                <h4 className="text-20-medium color-text tw-mb-4">
                  Park City Transportation Options
                </h4>
                <ul className="tw-space-y-3">
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Door-to-door service from SLC to Park City accommodations</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Transportation to Park City Mountain Resort and Deer Valley</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Service to Canyons Village and other Park City destinations</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Transportation for Park City special events and festivals</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Salt Lake City to Park City bus service alternatives</span>
                  </li>
                </ul>
              </div>
              
              <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
                <h4 className="text-20-medium color-text tw-mb-4">
                  SLC Airport Transportation Services
                </h4>
                <ul className="tw-space-y-3">
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Salt Lake City Airport (SLC) meet and greet service</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Flight tracking for all SLC arrivals and departures</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Assistance with luggage and ski/snowboard equipment</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>Child seats available upon request for family travel</span>
                  </li>
                  <li className="tw-flex tw-gap-2">
                    <span className="tw-text-primary">✓</span>
                    <span>24/7 availability for early and late flights to Salt Lake City</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="tw-flex tw-justify-center tw-mb-16">
              <div className="tw-flex tw-items-center tw-gap-4 tw-bg-gray-50 tw-rounded-xl tw-p-6 tw-max-w-xl">
                <Headphones className="tw-text-primary tw-flex-shrink-0" size={40} />
                <div>
                  <h4 className="text-18-medium color-text tw-mb-1">
                    Need assistance with your transportation?
                  </h4>
                  <p className="color-grey-500 tw-mb-2">
                    Our customer service team is available 24/7 to answer any questions about our Salt Lake City car service.
                  </p>
                  <a href="tel:+14359019158" className="tw-text-primary tw-font-medium">
                    Call (435) 901-9158
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}