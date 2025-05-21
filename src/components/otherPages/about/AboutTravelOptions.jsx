import React from 'react';
import { MapPin, Snowflake, Plane, Bus, Car, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutTravelOptions() {
  return (
    <section className="section pt-80 pb-80">
      <div className="container-sub">
        <div className="tw-text-center tw-mb-16 wow fadeInUp">
          <h2 className="heading-44-medium color-text tw-mb-4">
            Travel Guide for Salt Lake City & Park City
          </h2>
          <p className="text-lg color-grey-500 tw-max-w-3xl tw-mx-auto">
            Getting around and things to do in Salt Lake City and Park City
          </p>
        </div>
        
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8 tw-mb-16">
          <div className="wow fadeInUp">
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-8">
              <h3 className="text-24-medium color-text tw-mb-6">
                Getting Around Salt Lake City
              </h3>
              
              <p className="color-grey-500 tw-mb-6">
                While our main focus is transportation from SLC to Park City, many visitors spend time exploring Salt Lake City before or after their Park City stay. Here's what you need to know about getting around Salt Lake City:
              </p>
              
              <div className="tw-space-y-4 tw-mb-6">
                <div className="tw-flex tw-gap-3">
                  <Bus className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Public Transportation</h4>
                    <p className="color-grey-500">
                      The Utah Transit Authority (UTA) provides extensive bus and light rail service throughout Salt Lake City. Park and ride SLC options are available at various locations, making it convenient to use public transit.
                    </p>
                  </div>
                </div>
                
                <div className="tw-flex tw-gap-3">
                  <Car className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Car Service Options</h4>
                    <p className="color-grey-500">
                      Our car service Salt Lake City Utah offers hourly options for exploring the city. Unlike standard Salt Lake City cab services, we provide luxury vehicles with professional drivers familiar with the best routes and attractions.
                    </p>
                  </div>
                </div>
                
                <div className="tw-flex tw-gap-3">
                  <MapPin className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Park City Park and Ride</h4>
                    <p className="color-grey-500">
                      For those bringing their own vehicles to Park City, park and ride options are available, allowing you to park your car and use the free local bus system to access ski resorts and downtown.
                    </p>
                  </div>
                </div>
              </div>
              
              <h4 className="text-20-medium color-text tw-mb-3">
                Places to See in Salt Lake City
              </h4>
              <p className="color-grey-500 tw-mb-4">
                While planning your transportation, consider these popular attractions in Salt Lake City:
              </p>
              <ul className="tw-mb-6 tw-space-y-2">
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Temple Square and Salt Lake Temple</span>
                </li>
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Natural History Museum of Utah</span>
                </li>
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Utah State Capitol Building</span>
                </li>
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Liberty Park and Tracy Aviary</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="wow fadeInUp">
            <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-8">
              <h3 className="text-24-medium color-text tw-mb-6">
                Park City Transportation & Activities
              </h3>
              
              <p className="color-grey-500 tw-mb-6">
                Once you arrive in Park City using our SLC to Park City shuttle service, you'll find plenty of ways to get around and things to do:
              </p>
              
              <div className="tw-space-y-4 tw-mb-6">
                <div className="tw-flex tw-gap-3">
                  <Bus className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Free Bus System</h4>
                    <p className="color-grey-500">
                      Park City offers an excellent free bus system that connects all major destinations including downtown, ski resorts, and shopping areas. This answers the common question: "Do I need a car in Park City?" - for most visitors, the answer is no.
                    </p>
                  </div>
                </div>
                
                <div className="tw-flex tw-gap-3">
                  <Snowflake className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Ski Resort Shuttles</h4>
                    <p className="color-grey-500">
                      Many hotels and lodging properties offer complimentary shuttle service to nearby ski resorts. This adds another layer of convenience for winter visitors after their initial transportation from Salt Lake City to Park City.
                    </p>
                  </div>
                </div>
                
                <div className="tw-flex tw-gap-3">
                  <Compass className="tw-text-primary tw-flex-shrink-0 tw-mt-1" size={20} aria-hidden="true" />
                  <div>
                    <h4 className="text-18-medium color-text tw-mb-1">Walking-Friendly Downtown</h4>
                    <p className="color-grey-500">
                      Park City's Main Street and surrounding areas are very pedestrian-friendly, with shops, restaurants, and galleries all within easy walking distance of each other.
                    </p>
                  </div>
                </div>
              </div>
              
              <h4 className="text-20-medium color-text tw-mb-3">
                Must-Do Activities in Park City
              </h4>
              <p className="color-grey-500 tw-mb-4">
                After arriving via our transportation from Salt Lake City Airport to Park City, consider these popular activities:
              </p>
              <ul className="tw-mb-6 tw-space-y-2">
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>World-class skiing at Park City Mountain Resort</span>
                </li>
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Shopping and dining on historic Main Street</span>
                </li>
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Utah Olympic Park activities and museum</span>
                </li>
                <li className="tw-flex tw-gap-2">
                  <span className="tw-text-primary">•</span>
                  <span>Scenic chairlift rides during summer months</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="wow fadeInUp">
          <div className="tw-bg-gray-50 tw-rounded-xl tw-p-8 tw-text-center">
            <h3 className="text-24-medium color-text tw-mb-6">
              Ready to Book Your SLC to Park City Transportation?
            </h3>
            <p className="color-grey-500 tw-mb-8 tw-max-w-3xl tw-mx-auto">
              Let us take care of your transportation needs while you focus on enjoying all that Salt Lake City and Park City have to offer. Our professional service ensures a seamless transfer between SLC airport and your Park City destination.
            </p>
            <Link to="/booking-passenger" className="btn btn-brand-1 hover-up">
              Book Your Transportation Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}